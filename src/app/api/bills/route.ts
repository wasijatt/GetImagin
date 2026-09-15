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

function extractPitcData(html: string, refno: string, company: string): ParsedBillData {
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const getTextByLabel = (labels: string[]): string => {
        const allElements = doc.querySelectorAll('td, th, span, div, b, strong, font, p');
        for (const el of Array.from(allElements) as Element[]) {
            const text = (el.textContent || '').trim().toUpperCase();
            for (const label of labels) {
                if (text === label || text.includes(label)) {
                    const nextCell = el.nextElementSibling;
                    if (nextCell && nextCell.textContent && nextCell.textContent.trim()) {
                        const val = nextCell.textContent.trim();
                        if (val !== text && !labels.some((l) => val.toUpperCase().includes(l))) {
                            return val;
                        }
                    }
                    const parent = el.parentElement;
                    if (parent && parent.nextElementSibling) {
                        const val = parent.nextElementSibling.textContent?.trim();
                        if (val && !labels.some((l) => val.toUpperCase().includes(l))) {
                            return val;
                        }
                    }
                }
            }
        }
        return '';
    };

    const bodyText = doc.body?.textContent || html;

    // Due Date
    const dueDateMatch =
        bodyText.match(/DUE\s*DATE[:\s]*([0-9]{1,2}[\s\-\/][A-Za-z0-9]{2,4}[\s\-\/][0-9]{2,4})/i) ||
        bodyText.match(/PAYABLE\s*BY[:\s]*([0-9]{1,2}[\s\-\/][A-Za-z0-9]{2,4}[\s\-\/][0-9]{2,4})/i);
    const dueDate = dueDateMatch ? dueDateMatch[1].trim() : getTextByLabel(['DUE DATE', 'PAYABLE BY']) || 'Check Official Sheet';

    // Amount Within Due Date
    const amountWithinMatch =
        bodyText.match(/PAYABLE\s*WITHIN\s*DUE\s*DATE[:\s]*([0-9,]+)/i) ||
        bodyText.match(/AMOUNT\s*WITHIN\s*DUE\s*DATE[:\s]*([0-9,]+)/i) ||
        bodyText.match(/TOTAL\s*PAYABLE[:\s]*([0-9,]+)/i);
    const amountWithinDue = amountWithinMatch ? amountWithinMatch[1].trim() : getTextByLabel(['PAYABLE WITHIN DUE DATE', 'PAYABLE WITHIN DUE']) || 'Available on Sheet';

    // Amount After Due Date
    const amountAfterMatch =
        bodyText.match(/PAYABLE\s*AFTER\s*DUE\s*DATE[:\s]*([0-9,]+)/i) ||
        bodyText.match(/AMOUNT\s*AFTER\s*DUE\s*DATE[:\s]*([0-9,]+)/i);
    const amountAfterDue = amountAfterMatch ? amountAfterMatch[1].trim() : getTextByLabel(['PAYABLE AFTER DUE DATE', 'PAYABLE AFTER DUE']) || 'Available on Sheet';

    // Bill Month
    const billMonthMatch =
        bodyText.match(/BILL\s*MONTH[:\s]*([A-Za-z]{3,9}[\s\-]*(?:20)?[0-9]{2})/i) ||
        bodyText.match(/MONTH[:\s]*([A-Za-z]{3,9}[\s\-]*(?:20)?[0-9]{2})/i);
    const billMonth = billMonthMatch ? billMonthMatch[1].trim() : getTextByLabel(['BILL MONTH', 'MONTH']) || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Units Consumed
    const unitsMatch =
        bodyText.match(/UNITS\s*CONSUMED[:\s]*([0-9]+)/i) ||
        bodyText.match(/TOTAL\s*UNITS[:\s]*([0-9]+)/i) ||
        bodyText.match(/UNITS[:\s]*([0-9]+)/i);
    const unitsConsumed = unitsMatch ? unitsMatch[1].trim() : getTextByLabel(['UNITS CONSUMED', 'TOTAL UNITS', 'UNITS']) || '';

    // Consumer Name
    const nameMatch =
        bodyText.match(/NAME\s*&\s*ADDRESS[:\s]*([^\n\r\t]+)/i) ||
        bodyText.match(/CONSUMER\s*NAME[:\s]*([^\n\r\t]+)/i);
    const consumerName = nameMatch ? nameMatch[1].trim() : getTextByLabel(['NAME & ADDRESS', 'CONSUMER NAME', 'NAME']) || 'Registered Consumer';

    // Tariff
    const tariffMatch = bodyText.match(/TARIFF[:\s]*([A-Za-z0-9\-\/]+)/i);
    const tariff = tariffMatch ? tariffMatch[1].trim() : getTextByLabel(['TARIFF']) || 'A-1(01) General Domestic';

    // Consumer ID / Meter
    const meterMatch = bodyText.match(/METER\s*NO[:\s]*([A-Za-z0-9]+)/i);
    const meterNo = meterMatch ? meterMatch[1].trim() : getTextByLabel(['METER NO', 'METER #']) || '';

    // Prepare processed HTML with injected base URL so stylesheets, logos, barcodes and print layouts render accurately
    let processedHtml = html;
    if (!processedHtml.includes('<base ')) {
        const baseDomain = company === 'sngpl' ? 'https://www.sngpl.com.pk/' : company === 'ssgc' ? 'https://viewbill.ssgc.com.pk/' : 'https://bill.pitc.com.pk/';
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
        referenceNo: refno,
        billMonth,
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
async function fetchOfficialPitcBill(company: string, refno: string, searchType: 'refno' | 'custid' = 'refno', ruCode = ''): Promise<ParsedBillData | null> {
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
        'ruCodeTextBox': ruCode === 'R' ? 'R' : '',
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

    if (postRes.data && postRes.data.length > 3000 && !postRes.data.includes('Record Not Found') && !postRes.data.includes('Invalid Reference')) {
        return extractPitcData(postRes.data, refno, company);
    }

    return null;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const company = (searchParams.get('company') || 'mepco').toLowerCase().trim();
    const rawRef = searchParams.get('refno') || '';
    const searchType = (searchParams.get('searchType') || 'refno') as 'refno' | 'custid';
    const ruCode = (searchParams.get('ruCode') || '').toUpperCase().trim();
    const refno = rawRef.replace(/[^0-9A-Za-z]/g, '').trim();

    if (!refno || refno.length < 6) {
        return NextResponse.json(
            { success: false, error: 'Please enter a valid reference or customer ID number.' },
            { status: 400 }
        );
    }

    try {
        const pitcCompanies = ['mepco', 'lesco', 'fesco', 'iesco', 'gepco', 'pesco', 'heesco', 'hesco', 'qesco', 'sepco', 'tesco'];
        if (pitcCompanies.includes(company)) {
            // First attempt with user-selected RU code or blank
            let officialData = await fetchOfficialPitcBill(company, refno, searchType, ruCode);

            // If not found and searchType is refno, try the opposite RU code ('R' or '')
            if (!officialData && searchType === 'refno' && refno.length >= 14) {
                officialData = await fetchOfficialPitcBill(company, refno, searchType, ruCode === 'R' ? '' : 'R');
            }

            if (officialData) {
                return NextResponse.json({
                    success: true,
                    company,
                    refno,
                    billData: officialData,
                });
            }
        }

        // Direct GET fallback for Gas and other providers
        let targetUrl = '';
        if (company === 'sngpl') {
            targetUrl = `https://www.sngpl.com.pk/viewbill?consumerno=${refno}`;
        } else if (company === 'ssgc') {
            targetUrl = `https://viewbill.ssgc.com.pk/web/?custno=${refno}`;
        } else if (company === 'kelectric') {
            targetUrl = `https://www.ke.com.pk/customer-services/bill-and-payment-options/?accno=${refno}`;
        } else {
            targetUrl = `https://bill.pitc.com.pk/${company}bill/general?refno=${refno}`;
        }

        const res = await axios.get(targetUrl, {
            httpsAgent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            },
            timeout: 10000,
        });

        if (res.data && res.data.length > 1000) {
            const parsed = extractPitcData(res.data, refno, company);
            return NextResponse.json({
                success: true,
                company,
                refno,
                billData: parsed,
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
