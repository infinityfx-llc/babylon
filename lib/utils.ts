const countFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

export const formatCount = (val: any) => countFormatter.format(typeof val === 'number' ? val : 0);