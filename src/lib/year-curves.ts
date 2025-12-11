export interface YearCurveValues {
	year: number;
	age: number;
	income: number;
	expenses: number;
}

const YEAR_CURVE_FLAT: YearCurveValues[] = [
	{ year: 2026, age: 28, income: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income: 1.00, expenses: 1.00 },
	{ year: 2028, age: 30, income: 1.00, expenses: 1.00 },
	{ year: 2029, age: 31, income: 1.00, expenses: 1.00 },
	{ year: 2030, age: 32, income: 1.00, expenses: 1.00 },
	{ year: 2031, age: 33, income: 1.00, expenses: 1.00 },
	{ year: 2032, age: 34, income: 1.00, expenses: 1.00 },
	{ year: 2033, age: 35, income: 1.00, expenses: 1.00 },
	{ year: 2034, age: 36, income: 1.00, expenses: 1.00 },
	{ year: 2035, age: 37, income: 1.00, expenses: 1.00 },
	{ year: 2036, age: 38, income: 1.00, expenses: 1.00 },
	{ year: 2037, age: 39, income: 1.00, expenses: 1.00 },
	{ year: 2038, age: 40, income: 1.00, expenses: 1.00 },
	{ year: 2039, age: 41, income: 1.00, expenses: 1.00 },
	{ year: 2040, age: 42, income: 1.00, expenses: 1.00 },
	{ year: 2041, age: 43, income: 1.00, expenses: 1.00 },
	{ year: 2042, age: 44, income: 1.00, expenses: 1.00 },
	{ year: 2043, age: 45, income: 1.00, expenses: 1.00 },
	{ year: 2044, age: 46, income: 1.00, expenses: 1.00 },
	{ year: 2045, age: 47, income: 1.00, expenses: 1.00 },
	{ year: 2046, age: 48, income: 1.00, expenses: 1.00 },
	{ year: 2047, age: 49, income: 1.00, expenses: 1.00 },
	{ year: 2048, age: 50, income: 1.00, expenses: 1.00 },
	{ year: 2049, age: 51, income: 1.00, expenses: 1.00 },
	{ year: 2050, age: 52, income: 1.00, expenses: 1.00 },
	{ year: 2051, age: 53, income: 1.00, expenses: 1.00 },
	{ year: 2052, age: 54, income: 1.00, expenses: 1.00 },
	{ year: 2053, age: 55, income: 1.00, expenses: 1.00 },
	{ year: 2054, age: 56, income: 1.00, expenses: 1.00 },
	{ year: 2055, age: 57, income: 1.00, expenses: 1.00 },
	{ year: 2056, age: 58, income: 1.00, expenses: 1.00 },
	{ year: 2057, age: 59, income: 1.00, expenses: 1.00 },
	{ year: 2058, age: 60, income: 1.00, expenses: 1.00 },
	{ year: 2059, age: 61, income: 1.00, expenses: 1.00 },
	{ year: 2060, age: 62, income: 1.00, expenses: 1.00 },
	{ year: 2061, age: 63, income: 1.00, expenses: 1.00 },
	{ year: 2062, age: 64, income: 1.00, expenses: 1.00 },
	{ year: 2063, age: 65, income: 1.00, expenses: 1.00 },
	{ year: 2064, age: 66, income: 1.00, expenses: 1.00 },
	{ year: 2065, age: 67, income: 1.00, expenses: 1.00 },
	{ year: 2066, age: 68, income: 1.00, expenses: 1.00 },
	{ year: 2067, age: 69, income: 1.00, expenses: 1.00 },
	{ year: 2068, age: 70, income: 1.00, expenses: 1.00 },
	{ year: 2069, age: 71, income: 1.00, expenses: 1.00 },
	{ year: 2070, age: 72, income: 1.00, expenses: 1.00 },
	{ year: 2071, age: 73, income: 1.00, expenses: 1.00 },
	{ year: 2072, age: 74, income: 1.00, expenses: 1.00 },
	{ year: 2073, age: 75, income: 1.00, expenses: 1.00 },
	{ year: 2074, age: 76, income: 1.00, expenses: 1.00 },
	{ year: 2075, age: 77, income: 1.00, expenses: 1.00 },
	{ year: 2076, age: 78, income: 1.00, expenses: 1.00 },
	{ year: 2077, age: 79, income: 1.00, expenses: 1.00 },
	{ year: 2078, age: 80, income: 1.00, expenses: 1.00 },
	{ year: 2079, age: 81, income: 1.00, expenses: 1.00 },
	{ year: 2080, age: 82, income: 1.00, expenses: 1.00 },
	{ year: 2081, age: 83, income: 1.00, expenses: 1.00 },
	{ year: 2082, age: 84, income: 1.00, expenses: 1.00 },
	{ year: 2083, age: 85, income: 1.00, expenses: 1.00 },
	{ year: 2084, age: 86, income: 1.00, expenses: 1.00 },
	{ year: 2085, age: 87, income: 1.00, expenses: 1.00 },
	{ year: 2086, age: 88, income: 1.00, expenses: 1.00 },
	{ year: 2087, age: 89, income: 1.00, expenses: 1.00 },
	{ year: 2088, age: 90, income: 1.00, expenses: 1.00 },
	{ year: 2089, age: 91, income: 1.00, expenses: 1.00 },
	{ year: 2090, age: 92, income: 1.00, expenses: 1.00 },
	{ year: 2091, age: 93, income: 1.00, expenses: 1.00 },
	{ year: 2092, age: 94, income: 1.00, expenses: 1.00 },
	{ year: 2093, age: 95, income: 1.00, expenses: 1.00 },
	{ year: 2094, age: 96, income: 1.00, expenses: 1.00 },
	{ year: 2095, age: 97, income: 1.00, expenses: 1.00 },
	{ year: 2096, age: 98, income: 1.00, expenses: 1.00 },
	{ year: 2097, age: 99, income: 1.00, expenses: 1.00 },
];

const YEAR_CURVE_REALISTIC: YearCurveValues[] = [
	{ year: 2026, age: 28, income: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income: 1.02, expenses: 1.00 },
	{ year: 2028, age: 30, income: 1.04, expenses: 1.00 },
	{ year: 2029, age: 31, income: 0.80, expenses: 1.30 }, // children, expenses rise, maternity decreases income
	{ year: 2030, age: 32, income: 0.70, expenses: 1.60 }, // yr1
	{ year: 2031, age: 33, income: 0.50, expenses: 2.00 }, // yr2 assume 2nd child
	{ year: 2032, age: 34, income: 0.50, expenses: 2.20 }, // yr3
	{ year: 2033, age: 35, income: 0.50, expenses: 2.30 }, // yr4
	{ year: 2034, age: 36, income: 0.50, expenses: 2.30 }, // yr5
	{ year: 2035, age: 37, income: 0.50, expenses: 2.00 }, // yr6 - school starting child 1
	{ year: 2036, age: 38, income: 0.50, expenses: 2.00 }, // yr7
	{ year: 2037, age: 39, income: 0.80, expenses: 1.75 }, // yr8 - school starting child 2
	{ year: 2038, age: 40, income: 0.83, expenses: 1.60 }, // 9
	{ year: 2039, age: 41, income: 0.86, expenses: 1.60 }, // 10
	{ year: 2040, age: 42, income: 0.90, expenses: 1.60 }, // 11
	{ year: 2041, age: 43, income: 0.95, expenses: 1.60 }, // 12
	{ year: 2042, age: 44, income: 1.05, expenses: 1.60 }, // 13
	{ year: 2043, age: 45, income: 1.10, expenses: 1.60 }, // 14
	{ year: 2044, age: 46, income: 1.15, expenses: 1.60 }, // 15
	{ year: 2045, age: 47, income: 1.18, expenses: 1.60 }, // 16
	{ year: 2046, age: 48, income: 1.22, expenses: 1.60 }, // 17
	{ year: 2047, age: 49, income: 1.24, expenses: 1.60 }, // 18
	{ year: 2048, age: 50, income: 1.26, expenses: 1.60 }, // 19
	{ year: 2049, age: 51, income: 1.28, expenses: 1.60 }, // 20 - children leave home
	{ year: 2050, age: 52, income: 1.30, expenses: 1.00 },
	{ year: 2051, age: 53, income: 1.32, expenses: 1.00 },
	{ year: 2052, age: 54, income: 1.32, expenses: 1.00 },
	{ year: 2053, age: 55, income: 1.32, expenses: 1.00 },
	{ year: 2054, age: 56, income: 1.15, expenses: 1.00 }, // hours start to reduce
	{ year: 2055, age: 57, income: 1.15, expenses: 1.00 },
	{ year: 2056, age: 58, income: 1.00, expenses: 1.00 },
	{ year: 2057, age: 59, income: 1.00, expenses: 1.00 },
	{ year: 2058, age: 60, income: 1.00, expenses: 1.00 },
	{ year: 2059, age: 61, income: 0.50, expenses: 1.00 },
	{ year: 2060, age: 62, income: 0.50, expenses: 1.00 },
	{ year: 2061, age: 63, income: 0.50, expenses: 1.00 },
	{ year: 2062, age: 64, income: 0.00, expenses: 0.80 }, // retirement
	{ year: 2063, age: 65, income: 0.00, expenses: 0.80 },
	{ year: 2064, age: 66, income: 0.00, expenses: 0.80 },
	{ year: 2065, age: 67, income: 0.00, expenses: 0.80 },
	{ year: 2066, age: 68, income: 0.00, expenses: 0.80 },
	{ year: 2067, age: 69, income: 0.00, expenses: 0.80 },
	{ year: 2068, age: 70, income: 0.00, expenses: 0.80 },
	{ year: 2069, age: 71, income: 0.00, expenses: 0.80 },
	{ year: 2070, age: 72, income: 0.00, expenses: 0.80 },
	{ year: 2071, age: 73, income: 0.00, expenses: 0.80 },
	{ year: 2072, age: 74, income: 0.00, expenses: 0.80 },
	{ year: 2073, age: 75, income: 0.00, expenses: 0.80 },
	{ year: 2074, age: 76, income: 0.00, expenses: 1.50 }, // some care assistance
	{ year: 2075, age: 77, income: 0.00, expenses: 1.50 },
	{ year: 2076, age: 78, income: 0.00, expenses: 1.50 },
	{ year: 2077, age: 79, income: 0.00, expenses: 1.50 },
	{ year: 2078, age: 80, income: 0.00, expenses: 1.50 },
	{ year: 2079, age: 81, income: 0.00, expenses: 5.00 }, // assume care costs now...
	{ year: 2080, age: 82, income: 0.00, expenses: 5.00 },
	{ year: 2081, age: 83, income: 0.00, expenses: 5.00 },
	{ year: 2082, age: 84, income: 0.00, expenses: 5.00 },
	{ year: 2083, age: 85, income: 0.00, expenses: 5.00 },
	{ year: 2084, age: 86, income: 0.00, expenses: 5.00 },
	{ year: 2085, age: 87, income: 0.00, expenses: 5.00 },
	{ year: 2086, age: 88, income: 0.00, expenses: 5.00 },
	{ year: 2087, age: 89, income: 0.00, expenses: 5.00 },
	{ year: 2088, age: 90, income: 0.00, expenses: 5.00 },
	{ year: 2089, age: 91, income: 0.00, expenses: 5.00 },
	{ year: 2090, age: 92, income: 0.00, expenses: 5.00 },
	{ year: 2091, age: 93, income: 0.00, expenses: 5.00 },
	{ year: 2092, age: 94, income: 0.00, expenses: 5.00 },
	{ year: 2093, age: 95, income: 0.00, expenses: 5.00 },
	{ year: 2094, age: 96, income: 0.00, expenses: 5.00 },
	{ year: 2095, age: 97, income: 0.00, expenses: 5.00 },
	{ year: 2096, age: 98, income: 0.00, expenses: 5.00 },
	{ year: 2097, age: 99, income: 0.00, expenses: 5.00 },
];

export type YearCurveKind = 'flat' | 'realistic';

export const YEAR_CURVES: Record<YearCurveKind, YearCurveValues[]> = {
	flat: YEAR_CURVE_FLAT,
	realistic: YEAR_CURVE_REALISTIC,
};