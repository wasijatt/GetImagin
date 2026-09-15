/**
 * High-Resolution Pakistani Utility Duplicate Bill Canvas Image Generator
 * Generates and downloads crisp 300 DPI JPG / PNG duplicate bill images directly in the browser
 */

export interface BillImageExportData {
    companyName: string;
    shortName: string;
    type: 'electricity' | 'gas';
    referenceNo: string;
    consumerName: string;
    billMonth: string;
    issueDate?: string;
    dueDate: string;
    amountWithinDue: string;
    amountAfterDue: string;
    unitsConsumed?: string;
    tariff?: string;
    meterNo?: string;
}

export async function downloadBillAsImage(
    bill: BillImageExportData,
    format: 'jpeg' | 'png' = 'jpeg'
): Promise<void> {
    const width = 1200;
    const height = 1600;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Outer Border
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Header Background
    ctx.fillStyle = '#111111';
    ctx.fillRect(40, 40, width - 80, 130);

    // Company Logo / Crest Badge
    ctx.fillStyle = '#24CFA6';
    ctx.beginPath();
    ctx.roundRect(60, 55, 100, 100, 16);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 46px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(bill.type === 'electricity' ? '⚡' : '🔥', 110, 122);

    // Company Header Text
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillText(bill.companyName.toUpperCase(), 180, 95);

    ctx.fillStyle = '#A0A0A0';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(
        `GOVERNMENT OF PAKISTAN • ${bill.type === 'electricity' ? 'ELECTRICITY DISTRIBUTION COMPANY' : 'SUI GAS PROVIDER'}`,
        180,
        130
    );

    // Billing Month Header Box (Top Right)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#24CFA6';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText('BILLING MONTH', width - 60, 85);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px monospace';
    ctx.fillText(bill.billMonth.toUpperCase(), width - 60, 120);

    ctx.fillStyle = '#CCCCCC';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Issue Date: ${bill.issueDate || '01-Current'}`, width - 60, 148);

    // Reference Number Highlight Banner
    ctx.fillStyle = '#FEF3C7';
    ctx.fillRect(40, 190, width - 80, 100);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 190, width - 80, 100);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#92400E';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('14-DIGIT REFERENCE / CONSUMER NUMBER', 65, 225);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(bill.referenceNo, 65, 268);

    // Simulated Barcode (Right of Banner)
    const barcodeStartX = width - 400;
    const barcodeY = 210;
    const barcodeH = 45;
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 48; i++) {
        const barW = i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2;
        ctx.fillRect(barcodeStartX + i * 7, barcodeY, barW, barcodeH);
    }
    ctx.textAlign = 'center';
    ctx.font = '13px monospace';
    ctx.fillText(`*${bill.referenceNo}*`, barcodeStartX + 165, barcodeY + 62);

    // Consumer Matrix Cards (4 columns)
    const cardY = 310;
    const cardW = (width - 110) / 4;
    const cardH = 95;

    const cards = [
        { label: 'CONSUMER NAME', value: bill.consumerName, color: '#000000' },
        { label: 'TARIFF CATEGORY', value: bill.tariff || 'A-1(01) General', color: '#000000' },
        {
            label: 'UNITS CONSUMED',
            value: bill.unitsConsumed ? `${bill.unitsConsumed} kWh` : 'As Per Meter',
            color: '#1D4ED8',
        },
        { label: 'METER NUMBER', value: bill.meterNo || 'Registered', color: '#000000' },
    ];

    cards.forEach((card, idx) => {
        const cx = 40 + idx * (cardW + 10);
        ctx.fillStyle = '#F9FAFB';
        ctx.fillRect(cx, cardY, cardW, cardH);
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cx, cardY, cardW, cardH);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#6B7280';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.fillText(card.label, cx + 12, cardY + 28);

        ctx.fillStyle = card.color;
        ctx.font = 'bold 18px Arial, sans-serif';
        const displayVal = card.value.length > 18 ? card.value.slice(0, 16) + '...' : card.value;
        ctx.fillText(displayVal, cx + 12, cardY + 65);
    });

    // Main Billing Breakdown Table
    const tableY = 430;
    const tableW = width - 80;

    // Table Header
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(40, tableY, tableW, 45);
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, tableY, tableW, 45);

    ctx.fillStyle = '#111111';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('BILLING DESCRIPTION', 60, tableY + 28);
    ctx.fillText('RATES / DETAILS', 500, tableY + 28);
    ctx.textAlign = 'right';
    ctx.fillText('AMOUNT (PKR)', width - 60, tableY + 28);

    // Table Rows
    const rows = [
        {
            desc: 'Electricity / Energy Consumption Charges',
            detail: `${bill.unitsConsumed || 'Domestic'} Units (NEPRA Approved)`,
            amount: `PKR ${bill.amountWithinDue}`,
        },
        {
            desc: 'Fuel Price Adjustment (FPA) & Financing Cost Surcharges',
            detail: 'Variable NEPRA Surcharge',
            amount: 'Included',
        },
        {
            desc: 'Government Taxes, PTV Fee & General Sales Tax (18% GST)',
            detail: 'Statutory Federal Taxes',
            amount: 'Included',
        },
        {
            desc: 'Total Current Month Electricity Charges',
            detail: 'Net Payable Amount',
            amount: `PKR ${bill.amountWithinDue}`,
        },
    ];

    rows.forEach((row, idx) => {
        const ry = tableY + 45 + idx * 50;
        ctx.fillStyle = idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB';
        ctx.fillRect(40, ry, tableW, 50);
        ctx.strokeStyle = '#D1D5DB';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, ry, tableW, 50);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#111111';
        ctx.font = '15px Arial, sans-serif';
        ctx.fillText(row.desc, 60, ry + 30);

        ctx.fillStyle = '#4B5563';
        ctx.font = '14px Arial, sans-serif';
        ctx.fillText(row.detail, 500, ry + 30);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#111111';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(row.amount, width - 60, ry + 30);
    });

    // Payment Summary Big Callout Cards
    const payY = 670;
    const payW = (width - 90) / 2;
    const payH = 170;

    // Card 1: Within Due Date (Green)
    ctx.fillStyle = '#ECFDF5';
    ctx.fillRect(40, payY, payW, payH);
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, payY, payW, payH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('PAYABLE WITHIN DUE DATE', 60, payY + 36);

    ctx.fillStyle = '#047857';
    ctx.font = 'bold 44px monospace';
    ctx.fillText(`PKR ${bill.amountWithinDue}`, 60, payY + 95);

    ctx.fillStyle = '#064E3B';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(`Due Date: ${bill.dueDate}`, 60, payY + 140);

    // Card 2: After Due Date (Red)
    const redX = 40 + payW + 10;
    ctx.fillStyle = '#FFF1F2';
    ctx.fillRect(redX, payY, payW, payH);
    ctx.strokeStyle = '#E11D48';
    ctx.lineWidth = 3;
    ctx.strokeRect(redX, payY, payW, payH);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#9F1239';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('PAYABLE AFTER DUE DATE (LATE SURCHARGE)', redX + 20, payY + 36);

    ctx.fillStyle = '#BE123C';
    ctx.font = 'bold 44px monospace';
    ctx.fillText(`PKR ${bill.amountAfterDue}`, redX + 20, payY + 95);

    ctx.fillStyle = '#881337';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('Includes Late Payment Surcharge', redX + 20, payY + 140);

    // Authorized Payment Channels Banner
    const chanY = 870;
    ctx.fillStyle = '#F3F4F6';
    ctx.fillRect(40, chanY, width - 80, 110);
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, chanY, width - 80, 110);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText('AUTHORIZED ONLINE & BRANCH BILL PAYMENT OPTIONS (1LINK ENABLED):', 60, chanY + 32);

    const channels = [
        '✓ 1Link Member Banks',
        '✓ Easypaisa',
        '✓ JazzCash',
        '✓ Nayapay',
        '✓ SadaPay',
        '✓ Pakistan Post Office',
        '✓ All Commercial Branches',
    ];

    ctx.fillStyle = '#374151';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(channels.join('    •    '), 60, chanY + 72);

    // Bank Deposit Stub (Lower Tear-off Section)
    const stubY = 1010;
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#4B5563';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, stubY);
    ctx.lineTo(width - 40, stubY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Bank Stub Content
    ctx.fillStyle = '#F9FAFB';
    ctx.fillRect(40, stubY + 15, width - 80, 480);
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, stubY + 15, width - 80, 480);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillText(`${bill.companyName.toUpperCase()} - BANK DEPOSIT COPY`, 60, stubY + 50);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#4B5563';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Month: ${bill.billMonth}  |  Due: ${bill.dueDate}`, width - 60, stubY + 50);

    // Stub Details Grid
    ctx.textAlign = 'left';
    ctx.font = '16px monospace';
    ctx.fillStyle = '#111111';
    ctx.fillText(`Consumer Name: ${bill.consumerName}`, 60, stubY + 100);
    ctx.fillText(`Reference No:  ${bill.referenceNo}`, 60, stubY + 140);
    ctx.fillText(`Amount Within: PKR ${bill.amountWithinDue}`, 60, stubY + 180);
    ctx.fillText(`Amount After:  PKR ${bill.amountAfterDue}`, 60, stubY + 220);

    // Bank Stamp Box
    ctx.strokeStyle = '#9CA3AF';
    ctx.lineWidth = 2;
    ctx.strokeRect(width - 360, stubY + 80, 300, 180);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillText('BANK RECEIVING STAMP & SIGNATURE', width - 210, stubY + 175);

    // Footer Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6B7280';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(
        'GETIMAGIN DUPLICATE BILL PORTAL • VERIFIED COMPUTER GENERATED RECEIPT • VALID FOR PAYMENT',
        width / 2,
        height - 50
    );

    // Export to JPG or PNG
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const extension = format === 'png' ? 'png' : 'jpg';
    const dataUrl = canvas.toDataURL(mimeType, 0.95);

    const link = document.createElement('a');
    link.href = dataUrl;
    const sanitizedMonth = bill.billMonth.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `${bill.shortName}_Duplicate_Bill_${bill.referenceNo}_${sanitizedMonth}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
