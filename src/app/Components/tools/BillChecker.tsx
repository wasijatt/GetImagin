'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    UTILITY_COMPANIES,
    UtilityCompany,
    SavedBillRef,
    validateRefNumber,
    estimateElectricityBill,
    BillEstimateResult,
} from '../../lib/tools/bill-checker';
import { downloadBillAsImage } from '../../lib/tools/bill-image-generator';

interface BillCheckerProps {
    slug?: string;
}

interface FetchedBill {
    companyId: string;
    companyName: string;
    consumerName: string;
    consumerAddress?: string;
    referenceNo: string;
    consumerId?: string;
    billMonth: string;
    issueDate?: string;
    dueDate: string;
    amountWithinDue: string;
    amountAfterDue: string;
    unitsConsumed?: string;
    tariff?: string;
    meterNo?: string;
    rawHtml: string;
    isOfficial: boolean;
}

export default function BillChecker({ slug }: BillCheckerProps) {
    // Map initial company from slug
    const initialCompanyId = useMemo(() => {
        if (!slug) return 'mepco';
        if (slug.includes('mepco')) return 'mepco';
        if (slug.includes('lesco')) return 'lesco';
        if (slug.includes('fesco')) return 'fesco';
        if (slug.includes('iesco')) return 'iesco';
        if (slug.includes('kelectric') || slug.includes('k-electric')) return 'kelectric';
        if (slug.includes('gepco')) return 'gepco';
        if (slug.includes('pesco')) return 'pesco';
        if (slug.includes('hesco')) return 'hesco';
        if (slug.includes('qesco')) return 'qesco';
        if (slug.includes('sngpl')) return 'sngpl';
        if (slug.includes('ssgc')) return 'ssgc';
        return 'mepco';
    }, [slug]);

    const [selectedCompanyId, setSelectedCompanyId] = useState<string>(initialCompanyId);
    const [searchType, setSearchType] = useState<'refno' | 'custid'>('refno');
    const [ruCode, setRuCode] = useState<string>('U');
    const [refNumber, setRefNumber] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [savedBills, setSavedBills] = useState<SavedBillRef[]>([]);
    const [estimatedUnits, setEstimatedUnits] = useState<number>(250);
    const [activeTab, setActiveTab] = useState<'checker' | 'estimator' | 'history'>('checker');
    const [utilityType, setUtilityType] = useState<'electricity' | 'gas'>('electricity');

    // Live Bill Fetching State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDownloadingImage, setIsDownloadingImage] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [fetchedBill, setFetchedBill] = useState<FetchedBill | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(100);

    const currentCompany: UtilityCompany = UTILITY_COMPANIES[selectedCompanyId] || UTILITY_COMPANIES.mepco;

    // Load saved bills from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('getimagin_saved_bills');
            if (stored) {
                setSavedBills(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load saved bills', e);
        }
    }, []);

    // Sync company if slug changes
    useEffect(() => {
        setSelectedCompanyId(initialCompanyId);
        if (UTILITY_COMPANIES[initialCompanyId]) {
            setUtilityType(UTILITY_COMPANIES[initialCompanyId].type);
        }
    }, [initialCompanyId]);

    const validation = useMemo(() => {
        if (!refNumber) return { isValid: false, message: '', cleanRef: '' };
        return validateRefNumber(selectedCompanyId, refNumber);
    }, [selectedCompanyId, refNumber]);

    const estimateResult: BillEstimateResult = useMemo(() => {
        return estimateElectricityBill(selectedCompanyId, estimatedUnits);
    }, [selectedCompanyId, estimatedUnits]);

    // Save current ref to history
    const saveToHistory = useCallback(
        (cleanRef: string) => {
            if (!cleanRef) return;
            const newEntry: SavedBillRef = {
                id: `${selectedCompanyId}_${cleanRef}`,
                companyId: selectedCompanyId,
                companyName: currentCompany.shortName,
                refNumber: cleanRef,
                nickname: nickname.trim() || `${currentCompany.shortName} Bill`,
                lastChecked: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' }),
            };

            setSavedBills((prev) => {
                const filtered = prev.filter((b) => b.id !== newEntry.id);
                const updated = [newEntry, ...filtered].slice(0, 8);
                try {
                    localStorage.setItem('getimagin_saved_bills', JSON.stringify(updated));
                } catch (e) {
                    console.error('Failed to save bills', e);
                }
                return updated;
            });
            setNickname('');
        },
        [selectedCompanyId, currentCompany.shortName, nickname]
    );

    const handleCheckBill = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const digitsOnly = refNumber.replace(/[^0-9]/g, '');
        if (digitsOnly.length < 6) {
            setFetchError('Please enter a valid reference or customer ID number.');
            return;
        }

        setIsLoading(true);
        setFetchError(null);
        setFetchedBill(null);

        try {
            saveToHistory(digitsOnly);

            const res = await fetch(
                `/api/bills?company=${selectedCompanyId}&refno=${digitsOnly}&searchType=${searchType}&ruCode=${ruCode}`
            );
            const data = await res.json();

            if (data.success && data.billData) {
                setFetchedBill(data.billData);
            } else {
                setFetchError(data.error || 'No bill record found for the provided reference number.');
            }
        } catch (err: unknown) {
            console.error('Bill check error:', err);
            setFetchError('Connection timeout to official billing portal. Please verify your reference number and retry.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectSaved = (saved: SavedBillRef) => {
        setSelectedCompanyId(saved.companyId);
        if (UTILITY_COMPANIES[saved.companyId]) {
            setUtilityType(UTILITY_COMPANIES[saved.companyId].type);
        }
        setRefNumber(saved.refNumber);
        setActiveTab('checker');
        setFetchedBill(null);
        setFetchError(null);
    };

    const removeSavedBill = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSavedBills((prev) => {
            const updated = prev.filter((b) => b.id !== id);
            try {
                localStorage.setItem('getimagin_saved_bills', JSON.stringify(updated));
            } catch (e) {
                console.error(e);
            }
            return updated;
        });
    };

    // 1. Official Bill Print Handler
    const handlePrintBill = () => {
        if (fetchedBill?.rawHtml) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(fetchedBill.rawHtml);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            }
        } else {
            window.print();
        }
    };

    // 2. Direct JPG / PNG Image Downloader
    const handleDownloadBillImage = async (format: 'jpeg' | 'png' = 'jpeg') => {
        if (!fetchedBill) return;
        setIsDownloadingImage(true);

        try {
            await downloadBillAsImage(
                {
                    companyName: currentCompany.name,
                    shortName: currentCompany.shortName,
                    type: currentCompany.type,
                    referenceNo: fetchedBill.referenceNo,
                    consumerName: fetchedBill.consumerName,
                    billMonth: fetchedBill.billMonth,
                    issueDate: fetchedBill.issueDate,
                    dueDate: fetchedBill.dueDate,
                    amountWithinDue: fetchedBill.amountWithinDue,
                    amountAfterDue: fetchedBill.amountAfterDue,
                    unitsConsumed: fetchedBill.unitsConsumed,
                    tariff: fetchedBill.tariff,
                    meterNo: fetchedBill.meterNo,
                },
                format
            );
        } catch (e) {
            console.error('Failed to export JPG bill image:', e);
        } finally {
            setIsDownloadingImage(false);
        }
    };

    return (
        <div className="w-full max-w-5xl space-y-8">
            {/* ─── Top Tabs: Check Online / Tariff Calculator / Saved Bills ─────── */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121212] border border-white/10 p-2 rounded-2xl">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('checker')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'checker'
                                ? 'bg-[#24CFA6] text-black shadow-[0_0_12px_rgba(36,207,166,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Official Bill Search</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('estimator')}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                            activeTab === 'estimator'
                                ? 'bg-[#24CFA6] text-black shadow-[0_0_12px_rgba(36,207,166,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>Tariff Calculator</span>
                    </button>

                    {savedBills.length > 0 && (
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'history'
                                    ? 'bg-[#24CFA6] text-black shadow-[0_0_12px_rgba(36,207,166,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span>Saved Bills</span>
                            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20 text-white">
                                {savedBills.length}
                            </span>
                        </button>
                    )}
                </div>

                <div className="text-xs text-gray-400 px-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#24CFA6] animate-pulse" />
                    <span>Official Portal Handshake Connected</span>
                </div>
            </div>

            {/* ─── TAB 1: OFFICIAL BILL CHECKER PORTAL INTERFACE ───────────────── */}
            {activeTab === 'checker' && (
                <div className="space-y-6">
                    {/* Official Utility Header Brand Card */}
                    <div className="bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                        {/* Company Crest & Official Branding Header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-black border-2 border-[#24CFA6] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(36,207,166,0.2)]">
                                    {currentCompany.type === 'electricity' ? '⚡' : '🔥'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                                            {currentCompany.shortName} Online Bill
                                        </h2>
                                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#24CFA6] text-black">
                                            Official PITC
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                                        {currentCompany.name} • Government of Pakistan
                                    </p>
                                </div>
                            </div>

                            {/* Utility Type Switcher */}
                            <div className="flex p-1 bg-black rounded-xl border border-white/10">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUtilityType('electricity');
                                        setSelectedCompanyId('mepco');
                                        setRefNumber('');
                                        setFetchedBill(null);
                                        setFetchError(null);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                        utilityType === 'electricity'
                                            ? 'bg-[#24CFA6] text-black shadow-md'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    ⚡ Electricity DISCOs
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUtilityType('gas');
                                        setSelectedCompanyId('sngpl');
                                        setRefNumber('');
                                        setFetchedBill(null);
                                        setFetchError(null);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                        utilityType === 'gas'
                                            ? 'bg-[#24CFA6] text-black shadow-md'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    🔥 Sui Gas
                                </button>
                            </div>
                        </div>

                        {/* Official Search Card Form */}
                        <form onSubmit={handleCheckBill} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Utility Company Selector */}
                                <div className="space-y-1.5 md:col-span-1">
                                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                                        Select Provider
                                    </label>
                                    <select
                                        value={selectedCompanyId}
                                        onChange={(e) => {
                                            setSelectedCompanyId(e.target.value);
                                            setFetchedBill(null);
                                            setFetchError(null);
                                        }}
                                        className="w-full bg-[#111111] border border-white/20 rounded-xl px-3.5 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#24CFA6] transition-colors"
                                    >
                                        {utilityType === 'electricity' ? (
                                            <>
                                                <option value="mepco">MEPCO (Multan)</option>
                                                <option value="lesco">LESCO (Lahore)</option>
                                                <option value="fesco">FESCO (Faisalabad)</option>
                                                <option value="iesco">IESCO (Islamabad)</option>
                                                <option value="gepco">GEPCO (Gujranwala)</option>
                                                <option value="pesco">PESCO (Peshawar)</option>
                                                <option value="hesco">HESCO (Hyderabad)</option>
                                                <option value="qesco">QESCO (Quetta)</option>
                                                <option value="kelectric">K-Electric (Karachi)</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="sngpl">SNGPL (North Gas)</option>
                                                <option value="ssgc">SSGC (South Gas)</option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                {/* Reference Number / Customer ID Search Box */}
                                <div className="space-y-1.5 md:col-span-3">
                                    <div className="flex flex-wrap items-center justify-between text-xs">
                                        {/* Search Type Radios */}
                                        <div className="flex items-center gap-4 text-gray-300 font-semibold">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="searchType"
                                                    value="refno"
                                                    checked={searchType === 'refno'}
                                                    onChange={() => setSearchType('refno')}
                                                    className="accent-[#24CFA6]"
                                                />
                                                <span>14-Digit Reference No</span>
                                            </label>
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="searchType"
                                                    value="custid"
                                                    checked={searchType === 'custid'}
                                                    onChange={() => setSearchType('custid')}
                                                    className="accent-[#24CFA6]"
                                                />
                                                <span>Customer ID / Consumer No</span>
                                            </label>
                                        </div>

                                        <span className="font-mono text-gray-400">
                                            {refNumber.replace(/[^0-9]/g, '').length} Digits
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder={searchType === 'refno' ? 'Enter 14-digit reference no without spaces' : 'Enter 7 to 10-digit customer ID'}
                                                value={refNumber}
                                                onChange={(e) => setRefNumber(e.target.value)}
                                                className="w-full bg-[#111111] border border-white/20 rounded-xl px-4 py-3 text-base sm:text-lg font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#24CFA6] tracking-wider"
                                            />
                                            {refNumber && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setRefNumber('');
                                                        setFetchedBill(null);
                                                        setFetchError(null);
                                                    }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs px-1.5 py-0.5 bg-white/10 rounded"
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>

                                        {/* Urban / Rural RU Code Selector */}
                                        {utilityType === 'electricity' && searchType === 'refno' && (
                                            <select
                                                value={ruCode}
                                                onChange={(e) => setRuCode(e.target.value)}
                                                className="bg-[#111111] border border-white/20 rounded-xl px-3 py-3 text-sm font-bold text-[#24CFA6] focus:outline-none focus:border-[#24CFA6]"
                                                title="Urban (U) or Rural (R)"
                                            >
                                                <option value="U">U (Urban)</option>
                                                <option value="R">R (Rural)</option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Row */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                                <input
                                    type="text"
                                    placeholder="Save Nickname (e.g. Home, Office Meter)"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="w-full sm:w-64 bg-[#111111] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#24CFA6]"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full sm:flex-1 py-3.5 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(36,207,166,0.3)] ${
                                        isLoading
                                            ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                                            : 'bg-[#24CFA6] text-black hover:bg-[#1fb894]'
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                            </svg>
                                            <span>Connecting to {currentCompany.shortName} Official Portal...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <span>Check &amp; Render {currentCompany.shortName} Duplicate Bill</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Error Notification */}
                        {fetchError && (
                            <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-start gap-3">
                                <span className="text-xl">⚠️</span>
                                <div className="space-y-0.5">
                                    <p className="font-bold text-white">Official Server Notice</p>
                                    <p className="text-xs text-red-300">{fetchError}</p>
                                </div>
                            </div>
                        )}

                        {/* Regions Badge Footer */}
                        <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                            <span>
                                📍 <strong>{currentCompany.shortName} Areas:</strong> {currentCompany.regions.slice(0, 5).join(', ')}...
                            </span>
                            <span className="text-gray-500 font-mono">1Link Supported</span>
                        </div>
                    </div>

                    {/* ─── LIVE OFFICIAL DUPLICATE BILL VIEWER ─────────────────────────── */}
                    {fetchedBill && (
                        <div className="bg-[#141414] border-2 border-[#24CFA6]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(36,207,166,0.2)] animate-fadeIn">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-2xl font-black text-white">
                                            {currentCompany.shortName} Official Duplicate Bill
                                        </h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#24CFA6] text-black">
                                            Official PITC Verified
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Consumer: <span className="text-white font-bold">{fetchedBill.consumerName}</span> • Ref: <span className="font-mono text-white font-bold">{fetchedBill.referenceNo}</span> • Month: <span className="text-white font-semibold">{fetchedBill.billMonth}</span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5">
                                    {/* SEPARATE DOWNLOAD JPG IMAGE BUTTON */}
                                    <button
                                        onClick={() => handleDownloadBillImage('jpeg')}
                                        disabled={isDownloadingImage}
                                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#24CFA6] text-black hover:bg-[#1fb894] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(36,207,166,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50"
                                        title="Download Duplicate Bill as High-Resolution JPG Image"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span>{isDownloadingImage ? 'Generating JPG...' : 'Download JPG Image'}</span>
                                    </button>

                                    {/* SEPARATE PRINT / PDF BUTTON */}
                                    <button
                                        onClick={handlePrintBill}
                                        className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 border border-white/15 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                                        title="Print official duplicate bill"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        <span>Print Bill</span>
                                    </button>
                                </div>
                            </div>

                            {/* Official Sheet View with Zoom Toolbar */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs text-gray-400 bg-black/60 p-2.5 rounded-xl border border-white/10">
                                    <span className="flex items-center gap-1.5 font-bold text-white">
                                        <span>🔍</span> Official Document Sheet View
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
                                            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded font-mono text-white text-xs"
                                            title="Zoom Out"
                                        >
                                            -
                                        </button>
                                        <span className="font-mono text-xs text-[#24CFA6] font-bold">{zoomLevel}%</span>
                                        <button
                                            onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
                                            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded font-mono text-white text-xs"
                                            title="Zoom In"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => setZoomLevel(100)}
                                            className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] text-gray-300"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-2 sm:p-4 overflow-auto max-h-[800px] border border-white/20 shadow-2xl">
                                    <div
                                        style={{
                                            transform: `scale(${zoomLevel / 100})`,
                                            transformOrigin: 'top center',
                                            transition: 'transform 0.2s ease',
                                        }}
                                        className="w-full flex justify-center"
                                    >
                                        <iframe
                                            srcDoc={fetchedBill.rawHtml}
                                            title="Official Bill View"
                                            className="w-full min-h-[750px] border-none bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ─── TAB 2: TARIFF & UNIT CALCULATOR ─────────────────────────────── */}
            {activeTab === 'estimator' && (
                <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-white">
                            Electricity Units &amp; Tariff Estimator
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400">
                            Calculate your estimated monthly electricity bill according to current NEPRA tariff slabs, fuel price adjustment (FPA), TV fees, and GST taxes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Units Slider Controls */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-gray-300">Electricity Units Consumed (kWh)</span>
                                    <span className="text-xl font-bold text-[#24CFA6] font-mono">{estimatedUnits} Units</span>
                                </div>
                                <input
                                    type="range"
                                    min={10}
                                    max={1200}
                                    step={10}
                                    value={estimatedUnits}
                                    onChange={(e) => setEstimatedUnits(parseInt(e.target.value, 10))}
                                    className="w-full accent-[#24CFA6] cursor-pointer"
                                />
                                <div className="flex justify-between text-[11px] text-gray-500">
                                    <span>50 Units (Lifeline)</span>
                                    <span>300 Units (Protected)</span>
                                    <span>700+ Units (Peak)</span>
                                </div>
                            </div>

                            {/* Preset Buttons */}
                            <div className="grid grid-cols-4 gap-2">
                                {[100, 200, 300, 500].map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setEstimatedUnits(preset)}
                                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                                            estimatedUnits === preset
                                                ? 'bg-[#24CFA6]/20 border-[#24CFA6] text-[#24CFA6]'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        {preset} Units
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 text-xs text-gray-400">
                                <p className="font-semibold text-white">💡 Pro Tip on Tariff Slabs:</p>
                                <p>
                                    Staying under <strong>200 units</strong> qualifies your meter for government protected tariff subsidies, reducing unit costs by more than 40%.
                                </p>
                            </div>
                        </div>

                        {/* Bill Breakdown Receipt */}
                        <div className="bg-[#1a1a1a] border border-[#24CFA6]/30 rounded-2xl p-6 space-y-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                <span className="text-sm font-bold text-white">Estimated Bill Breakdown</span>
                                <span className="text-xs text-[#24CFA6] font-mono">NEPRA Tariff</span>
                            </div>

                            <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between text-gray-300">
                                    <span>Base Cost of Electricity:</span>
                                    <span className="font-mono text-white">PKR {estimateResult.costOfElectricity.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Fuel Price Adjustment (FPA ~PKR 3.75/unit):</span>
                                    <span className="font-mono text-white">PKR {estimateResult.fpaEstimated.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>FC Surcharge (~PKR 3.23/unit):</span>
                                    <span className="font-mono text-white">PKR {estimateResult.fcSurcharge.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>PTV Fee &amp; Meter Rent:</span>
                                    <span className="font-mono text-white">PKR {estimateResult.tvFee}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>General Sales Tax (18% GST):</span>
                                    <span className="font-mono text-white">PKR {estimateResult.gstAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
                                <div>
                                    <div className="text-xs text-gray-400">Total Payable Amount:</div>
                                    <div className="text-xs text-[#24CFA6]">Avg: PKR {estimateResult.effectiveUnitRate}/unit</div>
                                </div>
                                <div className="text-2xl font-bold text-[#24CFA6] font-mono">
                                    PKR {estimateResult.totalEstimatedBill.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── TAB 3: SAVED BILLS HISTORY ──────────────────────────────────── */}
            {activeTab === 'history' && (
                <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Your Saved Bill Numbers</h2>
                        <button
                            onClick={() => {
                                setSavedBills([]);
                                localStorage.removeItem('getimagin_saved_bills');
                            }}
                            className="text-xs text-red-400 hover:underline"
                        >
                            Clear All History
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {savedBills.map((saved) => (
                            <div
                                key={saved.id}
                                onClick={() => handleSelectSaved(saved)}
                                className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-[#24CFA6] transition-all group"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-white text-sm group-hover:text-[#24CFA6] transition-colors">
                                            {saved.nickname}
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#24CFA6]/10 text-[#24CFA6] border border-[#24CFA6]/30">
                                            {saved.companyName}
                                        </span>
                                    </div>
                                    <p className="font-mono text-xs text-gray-400 tracking-wider">
                                        Ref: {saved.refNumber}
                                    </p>
                                    <p className="text-[10px] text-gray-500">
                                        Last checked: {saved.lastChecked}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => removeSavedBill(saved.id, e)}
                                        className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                                        title="Delete"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
