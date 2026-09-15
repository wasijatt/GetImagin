/**
 * Pakistan Utility Bill Checker & Duplicate Bill Engine
 * Supports all electricity DISCOs (MEPCO, LESCO, FESCO, IESCO, K-Electric, GEPCO, PESCO, HESCO, QESCO)
 * and Sui Gas providers (SNGPL, SSGC).
 */

export interface UtilityCompany {
    id: string;
    name: string;
    shortName: string;
    type: 'electricity' | 'gas';
    refLength: number;
    refFormat: string;
    regions: string[];
    portalUrl: string;
    portalMethod: 'GET' | 'POST';
    queryParam: string;
    secondaryParam?: string;
    slabRates: { min: number; max: number; rate: number }[];
    fixedCharges: number;
    tvFee: number;
    gstRate: number; // e.g. 0.18 for 18%
}

export const UTILITY_COMPANIES: Record<string, UtilityCompany> = {
    mepco: {
        id: 'mepco',
        name: 'Multan Electric Power Company',
        shortName: 'MEPCO',
        type: 'electricity',
        refLength: 14,
        refFormat: '14-digit Reference No (e.g. 12345678901234)',
        regions: ['Multan', 'Bahawalpur', 'Rahim Yar Khan', 'Sahiwal', 'D.G. Khan', 'Muzaffargarh', 'Khanewal', 'Vehari', 'Lodhran'],
        portalUrl: 'https://bill.pitc.com.pk/mepcobill',
        portalMethod: 'GET',
        queryParam: 'refno',
        slabRates: [
            { min: 1, max: 100, rate: 16.48 },
            { min: 101, max: 200, rate: 22.95 },
            { min: 201, max: 300, rate: 27.14 },
            { min: 301, max: 400, rate: 32.03 },
            { min: 401, max: 700, rate: 35.24 },
            { min: 701, max: 99999, rate: 40.85 },
        ],
        fixedCharges: 200,
        tvFee: 35,
        gstRate: 0.18,
    },
    lesco: {
        id: 'lesco',
        name: 'Lahore Electric Supply Company',
        shortName: 'LESCO',
        type: 'electricity',
        refLength: 14,
        refFormat: '14-digit Reference No or 7-digit Consumer ID',
        regions: ['Lahore', 'Kasur', 'Okara', 'Sheikhupura', 'Nankana Sahib'],
        portalUrl: 'https://bill.pitc.com.pk/lescobill',
        portalMethod: 'GET',
        queryParam: 'refno',
        slabRates: [
            { min: 1, max: 100, rate: 16.48 },
            { min: 101, max: 200, rate: 22.95 },
            { min: 201, max: 300, rate: 27.14 },
            { min: 301, max: 400, rate: 32.03 },
            { min: 401, max: 700, rate: 35.24 },
            { min: 701, max: 99999, rate: 40.85 },
        ],
        fixedCharges: 200,
        tvFee: 35,
        gstRate: 0.18,
    },
    fesco: {
        id: 'fesco',
        name: 'Faisalabad Electric Supply Company',
        shortName: 'FESCO',
        type: 'electricity',
        refLength: 14,
        refFormat: '14-digit Reference Number',
        regions: ['Faisalabad', 'Sargodha', 'Jhang', 'Toba Tek Singh', 'Chiniot', 'Mianwali', 'Khushab', 'Bhakkar'],
        portalUrl: 'https://bill.pitc.com.pk/fescobill',
        portalMethod: 'GET',
        queryParam: 'refno',
        slabRates: [
            { min: 1, max: 100, rate: 16.48 },
            { min: 101, max: 200, rate: 22.95 },
            { min: 201, max: 300, rate: 27.14 },
            { min: 301, max: 400, rate: 32.03 },
            { min: 401, max: 700, rate: 35.24 },
            { min: 701, max: 99999, rate: 40.85 },
        ],
        fixedCharges: 200,
        tvFee: 35,
        gstRate: 0.18,
    },
    iesco: {
        id: 'iesco',
        name: 'Islamabad Electric Supply Company',
        shortName: 'IESCO',
        type: 'electricity',
        refLength: 14,
        refFormat: '14-digit Reference Number',
        regions: ['Islamabad', 'Rawalpindi', 'Attock', 'Jhelum', 'Chakwal'],
        portalUrl: 'https://bill.pitc.com.pk/iescobill',
        portalMethod: 'GET',
        queryParam: 'refno',
        slabRates: [
            { min: 1, max: 100, rate: 16.48 },
            { min: 101, max: 200, rate: 22.95 },
            { min: 201, max: 300, rate: 27.14 },
            { min: 301, max: 400, rate: 32.03 },
            { min: 401, max: 700, rate: 35.24 },
            { min: 701, max: 99999, rate: 40.85 },
        ],
        fixedCharges: 200,
        tvFee: 35,
        gstRate: 0.18,
    },
    kelectric: {
        id: 'kelectric',
        name: 'K-Electric Limited',
        shortName: 'K-Electric',
        type: 'electricity',
        refLength: 13,
        refFormat: '13-digit Account Number',
        regions: ['Karachi', 'Hub', 'Uthal', 'Bela', 'Gharo'],
        portalUrl: 'https://www.ke.com.pk/customer-services/bill-and-payment-options/',
        portalMethod: 'GET',
        queryParam: 'accno',
        slabRates: [
            { min: 1, max: 100, rate: 17.50 },
            { min: 101, max: 200, rate: 23.80 },
            { min: 201, max: 300, rate: 28.50 },
            { min: 301, max: 700, rate: 36.10 },
            { min: 701, max: 99999, rate: 42.00 },
        ],
        fixedCharges: 250,
        tvFee: 35,
        gstRate: 0.18,
    },
    gepco: {
        id: 'gepco',
        name: 'Gujranwala Electric Power Company',
        shortName: 'GEPCO',
        type: 'electricity',
        refLength: 14,
        refFormat: '14-digit Reference Number',
        regions: ['Gujranwala', 'Sialkot', 'Gujrat', 'Hafizabad', 'Narowal', 'Mandi Bahauddin'],
        portalUrl: 'https://bill.pitc.com.pk/gepcobill',
        portalMethod: 'GET',
        queryParam: 'refno',
        slabRates: [
            { min: 1, max: 100, rate: 16.48 },
            { min: 101, max: 200, rate: 22.95 },
            { min: 201, max: 300, rate: 27.14 },
            { min: 301, max: 700, rate: 35.24 },
            { min: 701, max: 99999, rate: 40.85 },
        ],
        fixedCharges: 200,
        tvFee: 35,
        gstRate: 0.18,
    },
    pesco: {
        id: 'pesco',
        name: 'Peshawar Electric Supply Company',
        shortName: 'PESCO',
        type: 'electricity',
        refLength: 14,
        refFormat: '14-digit Reference Number',
        regions: ['Peshawar', 'Mardan', 'Swat', 'Abbottabad', 'Bannu', 'Kohat', 'D.I. Khan'],
        portalUrl: 'https://bill.pitc.com.pk/pescobill',
        portalMethod: 'GET',
        queryParam: 'refno',
        slabRates: [
            { min: 1, max: 100, rate: 16.48 },
            { min: 101, max: 200, rate: 22.95 },
            { min: 201, max: 300, rate: 27.14 },
            { min: 301, max: 700, rate: 35.24 },
            { min: 701, max: 99999, rate: 40.85 },
        ],
        fixedCharges: 200,
        tvFee: 35,
        gstRate: 0.18,
    },
    sngpl: {
        id: 'sngpl',
        name: 'Sui Northern Gas Pipelines Limited',
        shortName: 'SNGPL',
        type: 'gas',
        refLength: 11,
        refFormat: '11-digit Consumer Number',
        regions: ['Punjab', 'Khyber Pakhtunkhwa', 'Islamabad Capital Territory', 'Azad Kashmir'],
        portalUrl: 'https://www.sngpl.com.pk/bill',
        portalMethod: 'GET',
        queryParam: 'consumerno',
        slabRates: [
            { min: 0.1, max: 0.5, rate: 200 },
            { min: 0.51, max: 1.0, rate: 300 },
            { min: 1.01, max: 2.0, rate: 550 },
            { min: 2.01, max: 3.0, rate: 1100 },
            { min: 3.01, max: 4.0, rate: 2000 },
            { min: 4.01, max: 999, rate: 3500 },
        ],
        fixedCharges: 500,
        tvFee: 0,
        gstRate: 0.18,
    },
    ssgc: {
        id: 'ssgc',
        name: 'Sui Southern Gas Company',
        shortName: 'SSGC',
        type: 'gas',
        refLength: 10,
        refFormat: '10-digit Customer Number',
        regions: ['Sindh', 'Balochistan', 'Karachi', 'Hyderabad', 'Sukkur', 'Quetta'],
        portalUrl: 'https://viewbill.ssgc.com.pk/web/',
        portalMethod: 'GET',
        queryParam: 'custno',
        slabRates: [
            { min: 0.1, max: 0.5, rate: 200 },
            { min: 0.51, max: 1.0, rate: 300 },
            { min: 1.01, max: 2.0, rate: 550 },
            { min: 2.01, max: 3.0, rate: 1100 },
            { min: 3.01, max: 4.0, rate: 2000 },
            { min: 4.01, max: 999, rate: 3500 },
        ],
        fixedCharges: 500,
        tvFee: 0,
        gstRate: 0.18,
    }
};

export interface SavedBillRef {
    id: string;
    companyId: string;
    companyName: string;
    refNumber: string;
    nickname?: string;
    lastChecked: string;
}

export interface BillEstimateResult {
    units: number;
    costOfElectricity: number;
    fpaEstimated: number; // Fuel Price Adjustment (~PKR 3.5/unit)
    fcSurcharge: number; // Financing Cost Surcharge (~PKR 3.23/unit)
    tvFee: number;
    gstAmount: number;
    totalEstimatedBill: number;
    effectiveUnitRate: number;
}

/**
 * Calculates estimated electricity bill based on consumed units according to NEPRA tariff slabs
 */
export function estimateElectricityBill(companyId: string, units: number): BillEstimateResult {
    const company = UTILITY_COMPANIES[companyId] || UTILITY_COMPANIES.mepco;
    let costOfElectricity = 0;

    let remainingUnits = units;

    // Slab tiered calculation
    for (const slab of company.slabRates) {
        if (remainingUnits <= 0) break;
        const slabCapacity = slab.max - slab.min + 1;
        const unitsInSlab = Math.min(remainingUnits, slabCapacity);
        costOfElectricity += unitsInSlab * slab.rate;
        remainingUnits -= unitsInSlab;
    }

    const fpaEstimated = units * 3.75;
    const fcSurcharge = units * 3.23;
    const subtotal = costOfElectricity + company.fixedCharges + fpaEstimated + fcSurcharge + company.tvFee;
    const gstAmount = Math.round(subtotal * company.gstRate);
    const totalEstimatedBill = Math.round(subtotal + gstAmount);
    const effectiveUnitRate = units > 0 ? parseFloat((totalEstimatedBill / units).toFixed(2)) : 0;

    return {
        units,
        costOfElectricity: Math.round(costOfElectricity),
        fpaEstimated: Math.round(fpaEstimated),
        fcSurcharge: Math.round(fcSurcharge),
        tvFee: company.tvFee,
        gstAmount,
        totalEstimatedBill,
        effectiveUnitRate,
    };
}

/**
 * Validates reference number for specific DISCO / Gas Company
 */
export function validateRefNumber(companyId: string, refNumber: string): { isValid: boolean; message: string; cleanRef: string } {
    const cleanRef = refNumber.replace(/[\s\-_]/g, '').toUpperCase();
    const company = UTILITY_COMPANIES[companyId];

    if (!company) {
        return { isValid: cleanRef.length >= 10, message: '', cleanRef };
    }

    // PITC electricity bills usually have 14 numeric digits (often followed by 'U' or 'R')
    const digitsOnly = cleanRef.replace(/[^0-9]/g, '');

    if (company.type === 'electricity') {
        if (digitsOnly.length === 14) {
            return { isValid: true, message: 'Valid 14-digit Reference Number', cleanRef: digitsOnly };
        }
        if (company.id === 'kelectric' && (digitsOnly.length === 13 || digitsOnly.length === 8)) {
            return { isValid: true, message: 'Valid K-Electric Account Number', cleanRef: digitsOnly };
        }
        return {
            isValid: false,
            message: `Please enter a valid 14-digit reference number (${digitsOnly.length}/14 digits entered).`,
            cleanRef,
        };
    } else {
        // Gas company
        if (company.id === 'sngpl' && digitsOnly.length >= 10 && digitsOnly.length <= 11) {
            return { isValid: true, message: 'Valid SNGPL Consumer Number', cleanRef: digitsOnly };
        }
        if (company.id === 'ssgc' && digitsOnly.length === 10) {
            return { isValid: true, message: 'Valid SSGC Customer Number', cleanRef: digitsOnly };
        }
        return {
            isValid: false,
            message: `Please enter a valid ${company.refLength}-digit consumer number.`,
            cleanRef,
        };
    }
}

/**
 * Builds the official direct online duplicate bill URL
 */
export function getOfficialBillUrl(companyId: string, refNumber: string): string {
    const company = UTILITY_COMPANIES[companyId] || UTILITY_COMPANIES.mepco;
    const cleanRef = refNumber.replace(/[\s\-_]/g, '');

    if (company.id === 'mepco') {
        return `https://bill.pitc.com.pk/mepcobill/general?refno=${cleanRef}`;
    }
    if (company.id === 'lesco') {
        return `https://bill.pitc.com.pk/lescobill/general?refno=${cleanRef}`;
    }
    if (company.id === 'fesco') {
        return `https://bill.pitc.com.pk/fescobill/general?refno=${cleanRef}`;
    }
    if (company.id === 'iesco') {
        return `https://bill.pitc.com.pk/iescobill/general?refno=${cleanRef}`;
    }
    if (company.id === 'gepco') {
        return `https://bill.pitc.com.pk/gepcobill/general?refno=${cleanRef}`;
    }
    if (company.id === 'pesco') {
        return `https://bill.pitc.com.pk/pescobill/general?refno=${cleanRef}`;
    }
    if (company.id === 'sngpl') {
        return `https://www.sngpl.com.pk/viewbill?consumerno=${cleanRef}`;
    }
    if (company.id === 'ssgc') {
        return `https://viewbill.ssgc.com.pk/web/?custno=${cleanRef}`;
    }
    if (company.id === 'kelectric') {
        return `https://www.ke.com.pk/customer-services/bill-and-payment-options/?accno=${cleanRef}`;
    }

    return `${company.portalUrl}?${company.queryParam}=${cleanRef}`;
}
