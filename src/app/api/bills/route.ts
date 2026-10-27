import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';
import { JSDOM } from 'jsdom';
import querystring from 'querystring';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Disable TLS rejection for official Pakistani utility portals with self-signed or incomplete cert chains
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
});

interface ParsedBillData {
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

/**
 * Extract clean, accurate fields from official PITC HTML output
 */
function extractPitcData(html: string, refno: string, company: string): ParsedBillData {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Search all hidden textareas for the structured metadata embedded in official PITC bills
    const allTextareas = doc.querySelectorAll('textarea.gbn-is-hidden');
    let metaTextarea = '';
    for (const ta of Array.from(allTextareas)) {
        if (ta.textContent?.includes('CONSUMER DETAILS') || ta.textContent?.includes('ENERGY DETAILS')) {
            metaTextarea = ta.textContent;
            break;
        }
    }

    const metaUnits = metaTextarea.match(/UNITS:\s*([0-9]+)/i)?.[1]?.trim();
    const metaConsumerId = metaTextarea.match(/CONSUMER\s*ID:\s*([0-9]+)/i)?.[1]?.trim();
    const metaRefNo = metaTextarea.match(/REF\s*NO:\s*([0-9A-Za-z]+)/i)?.[1]?.trim();

    // Bill Month (e.g., "OCT 26")
    let billMonth = doc.querySelector('.right-main-val')?.textContent?.trim() || '';
    if (!billMonth || billMonth.length > 20 || billMonth.includes('Tax')) {
        const monthMatch = doc.querySelector('.barcode-caption')?.textContent?.match(/([A-Za-z]{3}\s+[0-9]{2})/);
        billMonth = monthMatch ? monthMatch[1] : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    // Due Date (e.g., "27 OCT 26")
    let dueDate = doc.querySelector('.right-main-val--due')?.textContent?.trim() || '';
    if (!dueDate || dueDate.length > 20 || dueDate.includes('Tax')) {
        const dueMatch = doc.body?.textContent?.match(/DUE\s*DATE[:\s]*([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{2,4})/i);
        dueDate = dueMatch ? dueMatch[1] : 'Check Official Slip';
    }

    // Issue Date
    let issueDate = doc.querySelector('.right-panel-date-val')?.textContent?.trim() || '';
    if (!issueDate || issueDate.includes('Tax')) {
        const issueMatch = doc.body?.textContent?.match(/ISSUE\s*DATE[:\s]*([0-9]{1,2}\s+[A-Za-z]{3}\s+[0-9]{2,4})/i);
        issueDate = issueMatch ? issueMatch[1] : '01-Current';
    }

    // Amount Within Due Date (e.g., "7,045")
    let amountWithinDue =
        doc.querySelector('.payable-card-amount')?.textContent?.trim() ||
        doc.querySelector('.slip-main-amount')?.textContent?.trim() ||
        '';
    if (!amountWithinDue || amountWithinDue.includes('Tax')) {
        const match = doc.body?.textContent?.match(/PAYABLE\s*WITHIN\s*DUE\s*DATE[:\s]*([0-9,]+)/i);
        amountWithinDue = match ? match[1] : 'Available on Slip';
    }

    // Amount After Due Date (e.g., "7,183")
    let amountAfterDue =
        doc.querySelector('.lp-surcharge-bottom-val')?.textContent?.trim() ||
        doc.querySelector('.slip-late-box:nth-of-type(2)')?.textContent?.trim() ||
        '';
    if (!amountAfterDue || amountAfterDue.includes('Tax')) {
        const match = doc.body?.textContent?.match(/PAYABLE\s*AFTER\s*DUE\s*DATE[:\s]*([0-9,]+)/i);
        amountAfterDue = match ? match[1] : amountWithinDue;
    }

    // Units Consumed
    let unitsConsumed = metaUnits || '';
    if (!unitsConsumed) {
        const unitEl = doc.querySelector('.val-space--units, [data-field="units"]');
        if (unitEl && unitEl.textContent) {
            unitsConsumed = unitEl.textContent.trim();
        } else {
            const match = doc.body?.textContent?.match(/UNITS\s*CONSUMED[:\s]*([0-9]+)/i);
            unitsConsumed = match ? match[1] : '';
        }
    }

    // Consumer Name
    let consumerName = '';
    const nameLabels = doc.querySelectorAll('.en-lbl, td, th');
    for (const label of Array.from(nameLabels)) {
        if (label.textContent?.toUpperCase().includes('NAME & ADDRESS') || label.textContent?.toUpperCase() === 'CONSUMER NAME') {
            const parent = label.parentElement;
            if (parent) {
                const textElements = Array.from(parent.querySelectorAll('span, div, p')).filter(
                    (el) =>
                        el !== label &&
                        !el.classList.contains('en-lbl') &&
                        !el.classList.contains('ur-lbl') &&
                        el.textContent &&
                        el.textContent.trim().length > 2 &&
                        !el.textContent.includes('نام و پتہ')
                );
                if (textElements.length > 0) {
                    consumerName = textElements[0].textContent?.trim() || '';
                    break;
                }
            }
        }
    }
    if (!consumerName || consumerName.includes('Tax Certificate')) {
        consumerName = 'Registered Consumer';
    }

    // Meter No
    let meterNo = '';
    const meterEl = doc.querySelectorAll('.val-space');
    for (const el of Array.from(meterEl)) {
        const prev = el.previousElementSibling;
        if (prev && prev.textContent?.includes('METER NO')) {
            meterNo = el.textContent?.trim() || '';
            break;
        }
    }

    // Tariff
    let tariff = '';
    for (const el of Array.from(meterEl)) {
        const prev = el.previousElementSibling;
        if (prev && prev.textContent?.includes('TARIFF')) {
            tariff = el.textContent?.trim() || '';
            break;
        }
    }
    if (!tariff || tariff.length > 30) {
        tariff = 'A-1(01) General Domestic';
    }

    // Inject base URL so relative images, styles, and barcodes render accurately inside iframe
    let processedHtml = html;
    if (!processedHtml.includes('<base ')) {
        const baseDomain = 'https://bill.pitc.com.pk/';
        if (processedHtml.includes('<head>')) {
            processedHtml = processedHtml.replace('<head>', `<head><base href="${baseDomain}" target="_blank">`);
        } else {
            processedHtml = `<base href="${baseDomain}" target="_blank">${processedHtml}`;
        }
    }

    return {
        companyId: company,
        companyName: company.toUpperCase(),
        consumerName: consumerName.replace(/<[^>]*>?/gm, '').trim(),
        referenceNo: metaRefNo || refno,
        consumerId: metaConsumerId || '',
        billMonth,
        issueDate,
        dueDate,
        amountWithinDue,
        amountAfterDue,
        unitsConsumed,
        tariff,
        meterNo,
        rawHtml: processedHtml,
        isOfficial: true,
    };
}

/**
 * Fetch official electricity bill from PITC ASP.NET WebForm portal
 * Supports all Pakistani DISCOs (MEPCO, LESCO, FESCO, IESCO, GEPCO, PESCO, HESCO, QESCO, SEPCO, TESCO)
 */
async function fetchOfficialPitcBill(company: string, refno: string, searchType: 'refno' | 'custid' = 'refno'): Promise<ParsedBillData | null> {
    const portalUrl = `https://bill.pitc.com.pk/${company}bill/`;
    const cleanRef = refno.replace(/[^0-9]/g, '');

    // Step 1: Fetch initial form to obtain ASP.NET state tokens & session cookies
    const getRes = await axios.get(portalUrl, {
        httpsAgent,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        timeout: 10000,
    });

    const cookies = getRes.headers['set-cookie'] ? getRes.headers['set-cookie'].map((c) => c.split(';')[0]).join('; ') : '';
    const dom = new JSDOM(getRes.data);
    const doc = dom.window.document;

    const vs = doc.querySelector('input[name="__VIEWSTATE"]')?.getAttribute('value') || '';
    const vsg = doc.querySelector('input[name="__VIEWSTATEGENERATOR"]')?.getAttribute('value') || '';
    const ev = doc.querySelector('input[name="__EVENTVALIDATION"]')?.getAttribute('value') || '';
    const rvt = doc.querySelector('input[name="__RequestVerificationToken"]')?.getAttribute('value') || '';

    // Step 2: POST form with exact reference number or customer ID
    const isSearchByApp = searchType === 'custid' || cleanRef.length <= 10;

    const postData = querystring.stringify({
        '__VIEWSTATE': vs,
        '__VIEWSTATEGENERATOR': vsg,
        '__EVENTVALIDATION': ev,
        '__RequestVerificationToken': rvt,
        'rbSearchByList': isSearchByApp ? 'appno' : 'refno',
        'searchTextBox': cleanRef,
        'btnSearch': 'Search',
    });

    const postRes = await axios.post(portalUrl, postData, {
        httpsAgent,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cookies,
            'Referer': portalUrl,
            'Origin': 'https://bill.pitc.com.pk',
        },
        timeout: 15000,
        maxRedirects: 5,
    });

    const responseText = postRes.data || '';

    const hasValidBill =
        responseText.length > 5000 &&
        !responseText.includes('bill-not-found') &&
        !responseText.includes('Bill Not Found!') &&
        !responseText.includes('Record Not Found') &&
        !responseText.includes('Invalid Reference') &&
        (responseText.includes('bill-canvas-viewport') ||
            responseText.includes('CONSUMER DETAIL') ||
            responseText.includes('ELECTRICITY CONSUMER BILL') ||
            responseText.includes('PAYABLE WITHIN'));

    if (hasValidBill) {
        return extractPitcData(responseText, refno, company);
    }

    return null;
}

/**
 * Extract clean data from official SNGPL government web bill HTML
 */
function extractSngplData(html: string, refno: string): ParsedBillData {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const bodyText = doc.body?.textContent || html;

    // Structured row: "84138176379 Sep 2026 16,220 04-11-2026 16,940"
    const rowMatch = bodyText.match(/([0-9]{10,11})\s+([A-Za-z]{3,9}\s+[0-9]{4})\s+([0-9,]+)\s+([0-9]{2}-[0-9]{2}-[0-9]{4})\s+([0-9,]+)/);

    const billMonth = rowMatch ? rowMatch[2].trim() : 'Current Month';
    const amountWithinDue = rowMatch ? rowMatch[3].trim() : 'Check Official Slip';
    const dueDate = rowMatch ? rowMatch[4].trim() : 'Check Official Slip';
    const amountAfterDue = rowMatch ? rowMatch[5].trim() : amountWithinDue;

    // Consumer Name & Address
    const nameMatch = bodyText.match(/Name:\s*(?:نام)?\s*([^\n\r\t]+?)(?:Address:|پتہ|$)/i);
    const consumerName = nameMatch ? nameMatch[1].trim() : 'Registered Gas Consumer';

    const addrMatch = bodyText.match(/Address:\s*(?:پتہ)?\s*([^\n\r\t]+?)(?:Consumer's CNIC|CNIC|$)/i);
    const consumerAddress = addrMatch ? addrMatch[1].trim() : '';

    // Issue Date
    const issueMatch = bodyText.match(/Issue Date:\s*([0-9]{2}-[0-9]{2}-[0-9]{4})/i);
    const issueDate = issueMatch ? issueMatch[1].trim() : '';

    // Meter No
    const meterMatch = bodyText.match(/([A-Z]{2}[0-9]{8})/i);
    const meterNo = meterMatch ? meterMatch[1].trim() : '';

    // Tariff
    const tariffMatch = bodyText.match(/Tariff:\s*([A-Za-z0-9\-]+)/i);
    const tariff = tariffMatch ? tariffMatch[1].trim() : 'Domestic (DOMU-G)';

    // Units / Gas Consumed
    const gasMatch = bodyText.match(/Gas Consumed HM3\s*([0-9.]+)/i);
    const mmbtuMatch = bodyText.match(/\*MMBTU\s*([0-9.]+)/i);
    const unitsConsumed = gasMatch
        ? `${gasMatch[1]} HM3${mmbtuMatch ? ` (${mmbtuMatch[1]} MMBTU)` : ''}`
        : '';

    // Inject base URL so official SNGPL normalize.css, paper.css, barcodes, and images load correctly
    let processedHtml = html;
    if (!processedHtml.includes('<base ')) {
        const baseDomain = 'https://www.sngpl.com.pk/';
        if (processedHtml.includes('<head>')) {
            processedHtml = processedHtml.replace('<head>', `<head><base href="${baseDomain}" target="_blank">`);
        } else {
            processedHtml = `<base href="${baseDomain}" target="_blank">${processedHtml}`;
        }
    }

    return {
        companyId: 'sngpl',
        companyName: 'SNGPL',
        consumerName,
        consumerAddress,
        referenceNo: refno,
        consumerId: refno,
        billMonth,
        issueDate,
        dueDate,
        amountWithinDue,
        amountAfterDue,
        unitsConsumed,
        tariff,
        meterNo,
        rawHtml: processedHtml,
        isOfficial: true,
    };
}

/**
 * Fetch official SNGPL captcha image and session cookie from sngpl.com.pk
 */
async function fetchSngplCaptchaSession(): Promise<{ captchaBase64: string; sessionCookie: string } | null> {
    try {
        const portalUrl = 'https://www.sngpl.com.pk/login.jsp?mdids=85';
        const getRes = await axios.get(portalUrl, {
            httpsAgent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            timeout: 10000,
        });

        const sessionCookie = getRes.headers['set-cookie'] ? getRes.headers['set-cookie'].map((c) => c.split(';')[0]).join('; ') : '';

        const imgRes = await axios.get('https://www.sngpl.com.pk/captcha-image.jpg', {
            httpsAgent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Cookie': sessionCookie,
                'Referer': portalUrl,
            },
            responseType: 'arraybuffer',
            timeout: 10000,
        });

        const base64 = Buffer.from(imgRes.data).toString('base64');
        return {
            captchaBase64: `data:image/jpeg;base64,${base64}`,
            sessionCookie,
        };
    } catch (err) {
        console.error('Failed to fetch SNGPL captcha:', err);
        return null;
    }
}

/**
 * Submit official SNGPL form to obtain the original government bill copy
 */
async function fetchOfficialSngplBill(refno: string, captcha: string, sessionCookie: string): Promise<{ success: boolean; billData?: ParsedBillData; error?: string }> {
    try {
        const postData = querystring.stringify({
            proc: 'viewbill',
            consumer: refno,
            contype: 'NewCon',
            txtCaptcha: captcha,
        });

        const res = await axios.post('https://www.sngpl.com.pk/viewbill', postData, {
            httpsAgent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': sessionCookie,
                'Referer': 'https://www.sngpl.com.pk/login.jsp?mdids=85',
                'Origin': 'https://www.sngpl.com.pk',
            },
            timeout: 15000,
        });

        const data: string = typeof res.data === 'string' ? res.data : '';

        if (data === 'Invalid Captcha') {
            return {
                success: false,
                error: 'Invalid security captcha code. Please enter the new code displayed.',
            };
        }

        if (data === 'Bill is not available for this consumer.' || data === 'Incorrect Consumer Number') {
            return {
                success: false,
                error: `No bill record found on the official SNGPL server for consumer ${refno}. Please verify your 11-digit reference number.`,
            };
        }

        if (data.length > 2000 && (data.includes('SNGPL - Web Bill') || data.includes('Gas Charges') || data.includes('Total Amount Due'))) {
            const parsed = extractSngplData(data, refno);
            return {
                success: true,
                billData: parsed,
            };
        }

        return {
            success: false,
            error: `Unable to retrieve official bill copy from SNGPL server. Please verify your reference number and try again.`,
        };
    } catch (err) {
        console.error('Error fetching official SNGPL bill:', err);
        const msg = err instanceof Error ? err.message : 'Unknown error';
        return {
            success: false,
            error: `Connection error to official SNGPL server (${msg}). Please retry.`,
        };
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const company = (searchParams.get('company') || 'mepco').toLowerCase().trim();
    const action = searchParams.get('action') || '';
    const rawRef = searchParams.get('refno') || '';
    const searchType = (searchParams.get('searchType') || 'refno') as 'refno' | 'custid';
    const captcha = (searchParams.get('captcha') || '').trim();
    const sessionCookie = searchParams.get('sessionCookie') || '';
    const refno = rawRef.replace(/[^0-9A-Za-z]/g, '').trim();

    // 1. Action: Return fresh SNGPL captcha image and session
    if (company === 'sngpl' && action === 'captcha') {
        const captchaData = await fetchSngplCaptchaSession();
        if (captchaData) {
            return NextResponse.json({
                success: true,
                captchaBase64: captchaData.captchaBase64,
                sessionCookie: captchaData.sessionCookie,
            });
        }
        return NextResponse.json(
            { success: false, error: 'Could not connect to SNGPL security service. Please retry.' },
            { status: 500 }
        );
    }

    if (!refno || refno.length < 6) {
        return NextResponse.json(
            { success: false, error: 'Please enter a valid reference or customer ID number (minimum 6 digits).' },
            { status: 400 }
        );
    }

    try {
        const pitcCompanies = ['mepco', 'lesco', 'fesco', 'iesco', 'gepco', 'pesco', 'hesco', 'qesco', 'sepco', 'tesco'];

        // 2. PITC Electricity DISCOs: Fetch genuine official ASP.NET duplicate bill
        if (pitcCompanies.includes(company)) {
            const officialData = await fetchOfficialPitcBill(company, refno, searchType);
            if (officialData) {
                return NextResponse.json({
                    success: true,
                    company,
                    refno,
                    billData: officialData,
                });
            }

            return NextResponse.json({
                success: false,
                error: `No bill record found on the official ${company.toUpperCase()} server for ${refno}. Please verify your 14-digit reference number.`,
            });
        }

        // 3. SNGPL Gas Bills: Fetch original official government web bill using security captcha
        if (company === 'sngpl') {
            const cleanDigits = refno.replace(/[^0-9]/g, '');
            if (cleanDigits.length < 10 || cleanDigits.length > 11) {
                return NextResponse.json({
                    success: false,
                    error: `Please enter a valid 11-digit SNGPL Consumer Number (e.g. 84138176379).`,
                });
            }

            if (!captcha) {
                return NextResponse.json({
                    success: false,
                    needsCaptcha: true,
                    error: 'Please enter the 6-character official security code displayed below.',
                });
            }

            const result = await fetchOfficialSngplBill(cleanDigits, captcha, sessionCookie);
            if (result.success && result.billData) {
                return NextResponse.json({
                    success: true,
                    company: 'sngpl',
                    refno: cleanDigits,
                    billData: result.billData,
                });
            }

            return NextResponse.json({
                success: false,
                needsCaptcha: true,
                error: result.error || `No bill record found on the official SNGPL server for ${cleanDigits}.`,
            });
        }

        // 4. SSGC & K-Electric: Direct official portals
        if (company === 'ssgc') {
            return NextResponse.json({
                success: false,
                error: `SSGC requires verification on their official web portal. Please use the Official Portal button below.`,
            });
        }

        return NextResponse.json({
            success: false,
            error: `No bill record found on the official ${company.toUpperCase()} server for ${refno}. Please verify your reference number.`,
        });
    } catch (err: unknown) {
        console.error('Official bill lookup error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';

        return NextResponse.json({
            success: false,
            error: `Unable to retrieve official bill from ${company.toUpperCase()} server (${errorMessage}). Please check your reference number.`,
        });
    }
}
