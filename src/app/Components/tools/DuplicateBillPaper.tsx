'use client';

import React from 'react';
import { UtilityCompany } from '../../lib/tools/bill-checker';

interface DuplicateBillPaperProps {
    bill: {
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
    };
    company: UtilityCompany;
    onPrint?: () => void;
    onDownload?: () => void;
}

export default function DuplicateBillPaper({ bill, company, onPrint, onDownload }: DuplicateBillPaperProps) {
    const isElectricity = company.type === 'electricity';

    return (
        <div className="w-full bg-[#f8f9fa] text-black font-sans rounded-2xl p-4 sm:p-8 shadow-2xl border-4 border-[#121212] select-text">
            {/* ─── Top Utility Header ────────────────────────────────────── */}
            <div className="border-b-2 border-black pb-4 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-black text-[#24CFA6] flex items-center justify-center font-black text-2xl border border-black shadow-md">
                            {isElectricity ? '⚡' : '🔥'}
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl font-black tracking-tight uppercase text-black">
                                {company.name}
                            </h2>
                            <p className="text-xs sm:text-sm font-semibold text-gray-700">
                                Government of Pakistan • {isElectricity ? 'Electricity Distribution Company' : 'Sui Gas Provider'}
                            </p>
                            <span className="inline-block mt-0.5 px-2 py-0.5 bg-black text-[#24CFA6] text-[10px] font-black uppercase tracking-wider rounded">
                                Official Online Duplicate Bill
                            </span>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs font-bold text-gray-500 uppercase">Billing Month</div>
                        <div className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight">
                            {bill.billMonth}
                        </div>
                        <div className="text-[11px] text-gray-600 font-medium">Issue Date: {bill.issueDate || '01-Current'}</div>
                    </div>
                </div>
            </div>

            {/* ─── Barcode & Reference Banner ────────────────────────────── */}
            <div className="bg-yellow-100 border-2 border-yellow-400 p-3 rounded-xl mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <span className="text-[11px] font-bold text-gray-700 block uppercase">14-Digit Reference Number</span>
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-widest text-black">
                        {bill.referenceNo}
                    </span>
                </div>

                <div className="text-right flex flex-col items-end">
                    {/* Simulated Authentic Barcode */}
                    <div className="flex items-center gap-0.5 h-7 bg-white px-2 py-1 rounded border border-gray-400">
                        {Array.from({ length: 38 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-full bg-black ${
                                    i % 4 === 0 ? 'w-[3px]' : i % 3 === 0 ? 'w-[2px]' : 'w-[1px]'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] font-mono text-gray-600 tracking-widest mt-0.5">
                        *{bill.referenceNo}*
                    </span>
                </div>
            </div>

            {/* ─── Consumer & Connection Matrix ──────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-xs">
                <div className="bg-white p-3 rounded-lg border border-gray-300">
                    <span className="text-gray-500 font-bold block uppercase text-[10px]">Consumer Name</span>
                    <span className="font-extrabold text-sm text-black block truncate">{bill.consumerName}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300">
                    <span className="text-gray-500 font-bold block uppercase text-[10px]">Tariff Category</span>
                    <span className="font-extrabold text-sm text-black block">{bill.tariff || 'A-1(01) General'}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300">
                    <span className="text-gray-500 font-bold block uppercase text-[10px]">Units Consumed (kWh)</span>
                    <span className="font-black text-base text-blue-700 font-mono block">
                        {bill.unitsConsumed ? `${bill.unitsConsumed} Units` : 'Check Reading'}
                    </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-300">
                    <span className="text-gray-500 font-bold block uppercase text-[10px]">Meter / Account No</span>
                    <span className="font-mono font-bold text-sm text-black block">{bill.meterNo || 'Registered'}</span>
                </div>
            </div>

            {/* ─── Financial Payable Summary Boxes ───────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Within Due Date Box */}
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block">
                                Payable Within Due Date
                            </span>
                            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono mt-1">
                                PKR {bill.amountWithinDue}
                            </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white">
                            ON TIME
                        </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-emerald-200 flex justify-between items-center text-xs">
                        <span className="text-gray-700 font-bold">Due Date:</span>
                        <span className="font-black text-emerald-900 font-mono text-sm">{bill.dueDate}</span>
                    </div>
                </div>

                {/* After Due Date Box */}
                <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-bold text-rose-800 uppercase tracking-wide block">
                                Payable After Due Date (Incl. Surcharge)
                            </span>
                            <div className="text-3xl sm:text-4xl font-black text-rose-700 font-mono mt-1">
                                PKR {bill.amountAfterDue}
                            </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white">
                            LATE FEE
                        </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-rose-200 flex justify-between items-center text-xs">
                        <span className="text-gray-700 font-bold">Late Surcharge Included:</span>
                        <span className="font-mono font-bold text-rose-800">Standard NEPRA Rates</span>
                    </div>
                </div>
            </div>

            {/* ─── Bank & Payment Channels ───────────────────────────────── */}
            <div className="bg-white border border-gray-300 rounded-xl p-4 mb-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 uppercase text-[11px]">Authorized Payment Options:</span>
                    <span className="text-[10px] text-gray-500 font-mono">1Link Bill ID: {bill.referenceNo}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                    {['1Link Enabled Banks', 'Easypaisa', 'JazzCash', 'Nayapay', 'SadaPay', 'Omni', 'Post Office', 'Commercial Bank Branches'].map((channel) => (
                        <span key={channel} className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[10px] border border-gray-300">
                            ✓ {channel}
                        </span>
                    ))}
                </div>
            </div>

            {/* ─── Duplicate Bill Disclaimer / Action Buttons ─────────────── */}
            <div className="border-t-2 border-dashed border-gray-400 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
                <span>
                    Official computer-generated duplicate bill rendered via GetImagin. Valid for banking and online bill payment.
                </span>
                <div className="flex items-center gap-2">
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            className="px-3.5 py-1.5 bg-[#00875A] text-white font-bold rounded-lg hover:bg-[#006644] transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                            <span>📥</span>
                            <span>Download Bill Copy</span>
                        </button>
                    )}
                    {onPrint && (
                        <button
                            onClick={onPrint}
                            className="px-3.5 py-1.5 bg-black text-[#24CFA6] font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                            <span>🖨️</span>
                            <span>Print Slip</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
