export const formatCurrency = (value: number, currency: string): string => {
    const symbols: Record<string, string> = {
        usd: '$',
        eur: '€',
        rub: '₽',
        gbp: '£',
        jpy: '¥',
    };

    const symbol = symbols[currency.toLowerCase()] || currency.toUpperCase();

    const abs = Math.abs(value);
    let suffix = '';
    let divisor = 1;

    if (abs >= 1e12) {
        suffix = 'T';
        divisor = 1e12;
    } else if (abs >= 1e9) {
        suffix = 'B';
        divisor = 1e9;
    } else if (abs >= 1e6) {
        suffix = 'M';
        divisor = 1e6;
    } else if (abs >= 1e3) {
        suffix = 'K';
        divisor = 1e3;
    }

    const scaled = abs / divisor;
    let formatted: string;

    if (divisor === 1) {
        formatted = scaled.toFixed(2);
    } else {
        const rounded = Math.round(scaled * 10) / 10;
        if (Number.isInteger(rounded)) {
            formatted = rounded.toString();
        } else {
            formatted = rounded.toFixed(1);
        }
    }

    const sign = value < 0 ? '-' : '';

    return `${sign}${symbol}${formatted}${suffix}`;
}

export const getColorByChange = (value: number): string => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-500';
};