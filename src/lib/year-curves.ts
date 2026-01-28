export interface YearCurveValues {
	year: number;
	age: number;
	income1: number;
	income2: number;
	expenses: number;
}

const YEAR_CURVE_FLAT: YearCurveValues[] = [
	{ year: 2026, age: 28, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2028, age: 30, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2029, age: 31, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2030, age: 32, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2031, age: 33, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2032, age: 34, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2033, age: 35, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2034, age: 36, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2035, age: 37, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2036, age: 38, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2037, age: 39, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2038, age: 40, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2039, age: 41, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2040, age: 42, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2041, age: 43, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2042, age: 44, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2043, age: 45, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2044, age: 46, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2045, age: 47, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2046, age: 48, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2047, age: 49, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2048, age: 50, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2049, age: 51, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2050, age: 52, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2051, age: 53, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2052, age: 54, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2053, age: 55, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2054, age: 56, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2055, age: 57, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2056, age: 58, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2057, age: 59, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2058, age: 60, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2059, age: 61, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2060, age: 62, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2061, age: 63, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2062, age: 64, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2063, age: 65, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2064, age: 66, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2065, age: 67, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2066, age: 68, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2067, age: 69, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2068, age: 70, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2069, age: 71, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2070, age: 72, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2071, age: 73, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2072, age: 74, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2073, age: 75, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2074, age: 76, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2075, age: 77, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2076, age: 78, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2077, age: 79, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2078, age: 80, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2079, age: 81, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2080, age: 82, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2081, age: 83, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2082, age: 84, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2083, age: 85, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2084, age: 86, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2085, age: 87, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2086, age: 88, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2087, age: 89, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2088, age: 90, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2089, age: 91, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2090, age: 92, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2091, age: 93, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2092, age: 94, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2093, age: 95, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2094, age: 96, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2095, age: 97, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2096, age: 98, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2097, age: 99, income1: 1.00, income2: 1.00, expenses: 1.00 },
];

// Swast maternity pay:
// - 8 weeks full pay               100%
// - 17 weeks half pay + smp        (3500/2 + 748)/3500 = 70%
// - 13 week statutory maternity    748/3500 = 21%
// - 13 week unpaid                 0%
// Weighted for year is 100% * 8/26 + 70% * 17/26 + 21% * 1/26 + 0% * 1/26 = 43.5%


// Simulates Jamie at flat income ~20hr/week
// Emily taking 4 years maternity leave while kids born, then back to full time
const YEAR_CURVE_J_FLAT_E_4_MATERNITY: YearCurveValues[] = [
	{ year: 2026, age: 28, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income1: 1.01, income2: 1.02, expenses: 1.00 },
	{ year: 2028, age: 30, income1: 1.02, income2: 1.04, expenses: 1.00 },
	{ year: 2029, age: 31, income1: 1.03, income2: 0.43, expenses: 1.40 }, // kid 0 - children, expenses rise, maternity decreases income
	{ year: 2030, age: 32, income1: 1.04, income2: 0.50, expenses: 1.40 }, // kid 1 - assume part
	{ year: 2031, age: 33, income1: 1.05, income2: 0.25, expenses: 1.60 }, // kid 2,0 - assumme 2nd child, qualifying earnings lower, so maternity even lower
	{ year: 2032, age: 34, income1: 1.06, income2: 0.50, expenses: 1.60 }, // kid 3,1 - assume part time kids 3,1
	{ year: 2033, age: 35, income1: 1.07, income2: 0.50, expenses: 1.60 }, // kid 4,2 - assume part time kids 4,2
	{ year: 2034, age: 36, income1: 1.08, income2: 0.50, expenses: 1.60 }, // kid 5,3 - assume part time kids 5,3
	{ year: 2035, age: 37, income1: 1.09, income2: 0.50, expenses: 1.60 }, // kid 6,4 - assume part time kids 6,4
	{ year: 2036, age: 38, income1: 1.10, income2: 1.00, expenses: 1.60 }, // kid 7,5 - back to full time
	{ year: 2037, age: 39, income1: 1.11, income2: 1.01, expenses: 1.60 }, // kid 8,6 - school starting child 2
	{ year: 2038, age: 40, income1: 1.12, income2: 1.02, expenses: 1.60 }, // kid 9
	{ year: 2039, age: 41, income1: 1.13, income2: 1.03, expenses: 1.60 }, // kid 10
	{ year: 2040, age: 42, income1: 1.14, income2: 1.04, expenses: 1.60 }, // kid 11
	{ year: 2041, age: 43, income1: 1.15, income2: 1.05, expenses: 1.60 }, // kid 12
	{ year: 2042, age: 44, income1: 1.16, income2: 1.06, expenses: 1.60 }, // kid 13
	{ year: 2043, age: 45, income1: 1.17, income2: 1.07, expenses: 1.60 }, // kid 14
	{ year: 2044, age: 46, income1: 1.18, income2: 1.08, expenses: 1.60 }, // kid 15
	{ year: 2045, age: 47, income1: 1.19, income2: 1.09, expenses: 1.60 }, // kid 16
	{ year: 2046, age: 48, income1: 1.20, income2: 1.10, expenses: 1.60 }, // kid 17
	{ year: 2047, age: 49, income1: 1.21, income2: 1.11, expenses: 1.60 }, // kid 18
	{ year: 2048, age: 50, income1: 1.22, income2: 1.12, expenses: 1.60 }, // kid 19
	{ year: 2049, age: 51, income1: 1.23, income2: 1.13, expenses: 1.60 }, // kid 20 - both children left home, expenses down
	{ year: 2050, age: 52, income1: 1.24, income2: 1.14, expenses: 1.00 },
	{ year: 2051, age: 53, income1: 1.25, income2: 1.15, expenses: 1.00 },
	{ year: 2052, age: 54, income1: 1.26, income2: 1.16, expenses: 1.00 },
	{ year: 2053, age: 55, income1: 1.27, income2: 1.17, expenses: 1.00 },
	{ year: 2054, age: 56, income1: 1.00, income2: 1.18, expenses: 1.00 }, // hours start to reduce and/or working easier jobs
	{ year: 2055, age: 57, income1: 0.80, income2: 0.80, expenses: 1.00 },
	{ year: 2056, age: 58, income1: 0.80, income2: 0.80, expenses: 1.00 },
	{ year: 2057, age: 59, income1: 0.80, income2: 0.80, expenses: 1.00 },
	{ year: 2058, age: 60, income1: 0.80, income2: 0.80, expenses: 1.00 },
	{ year: 2059, age: 61, income1: 0.50, income2: 0.50, expenses: 1.00 },
	{ year: 2060, age: 62, income1: 0.50, income2: 0.50, expenses: 1.00 },
	{ year: 2061, age: 63, income1: 0.50, income2: 0.50, expenses: 1.00 },
	{ year: 2062, age: 64, income1: 0.00, income2: 0.00, expenses: 0.80 }, // retirement
	{ year: 2063, age: 65, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2064, age: 66, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2065, age: 67, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2066, age: 68, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2067, age: 69, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2068, age: 70, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2069, age: 71, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2070, age: 72, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2071, age: 73, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2072, age: 74, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2073, age: 75, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2074, age: 76, income1: 0.00, income2: 0.00, expenses: 1.50 }, // some care assistance
	{ year: 2075, age: 77, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2076, age: 78, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2077, age: 79, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2078, age: 80, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2079, age: 81, income1: 0.00, income2: 0.00, expenses: 5.00 }, // assume care costs now...
	{ year: 2080, age: 82, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2081, age: 83, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2082, age: 84, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2083, age: 85, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2084, age: 86, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2085, age: 87, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2086, age: 88, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2087, age: 89, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2088, age: 90, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2089, age: 91, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2090, age: 92, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2091, age: 93, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2092, age: 94, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2093, age: 95, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2094, age: 96, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2095, age: 97, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2096, age: 98, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2097, age: 99, income1: 0.00, income2: 0.00, expenses: 5.00 },
];

// Simulates Jamie at flat income ~20hr/week
// Emily taking 4 years maternity leave while kids born, then working 50% time
const YEAR_CURVE_J_FLAT_E_PART: YearCurveValues[] = [
	{ year: 2026, age: 28, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income1: 1.01, income2: 1.02, expenses: 1.00 },
	{ year: 2028, age: 30, income1: 1.02, income2: 1.04, expenses: 1.00 },
	{ year: 2029, age: 31, income1: 1.03, income2: 0.43, expenses: 1.30 }, // kid 0 - children, expenses rise, maternity decreases income
	{ year: 2030, age: 32, income1: 1.04, income2: 0.50, expenses: 1.30 }, // kid 1 - assume part
	{ year: 2031, age: 33, income1: 1.05, income2: 0.25, expenses: 1.60 }, // kid 2,0 - assumme 2nd child, qualifying earnings lower, so maternity even lower
	{ year: 2032, age: 34, income1: 1.06, income2: 0.50, expenses: 1.60 }, // kid 3,1 - assume part time kids 3,1
	{ year: 2033, age: 35, income1: 1.07, income2: 0.50, expenses: 1.60 }, // kid 4,2 - assume part time kids 4,2
	{ year: 2034, age: 36, income1: 1.08, income2: 0.50, expenses: 1.60 }, // kid 5,3 - assume part time kids 5,3
	{ year: 2035, age: 37, income1: 1.09, income2: 0.50, expenses: 1.60 }, // kid 6,4 - assume part time kids 6,4
	{ year: 2036, age: 38, income1: 1.10, income2: 0.51, expenses: 1.60 }, // kid 7,5 - stay part time...
	{ year: 2037, age: 39, income1: 1.11, income2: 0.52, expenses: 1.60 }, // kid 8,6 - school starting child 2
	{ year: 2038, age: 40, income1: 1.12, income2: 0.53, expenses: 1.60 }, // kid 9
	{ year: 2039, age: 41, income1: 1.13, income2: 0.54, expenses: 1.60 }, // kid 10
	{ year: 2040, age: 42, income1: 1.14, income2: 0.56, expenses: 1.60 }, // kid 11
	{ year: 2041, age: 43, income1: 1.15, income2: 0.57, expenses: 1.60 }, // kid 12
	{ year: 2042, age: 44, income1: 1.16, income2: 0.58, expenses: 1.60 }, // kid 13
	{ year: 2043, age: 45, income1: 1.17, income2: 0.59, expenses: 1.60 }, // kid 14
	{ year: 2044, age: 46, income1: 1.18, income2: 0.60, expenses: 1.60 }, // kid 15
	{ year: 2045, age: 47, income1: 1.19, income2: 0.60, expenses: 1.60 }, // kid 16
	{ year: 2046, age: 48, income1: 1.20, income2: 0.60, expenses: 1.60 }, // kid 17
	{ year: 2047, age: 49, income1: 1.21, income2: 0.60, expenses: 1.60 }, // kid 18
	{ year: 2048, age: 50, income1: 1.22, income2: 0.60, expenses: 1.60 }, // kid 19
	{ year: 2049, age: 51, income1: 1.22, income2: 0.60, expenses: 1.60 }, // kid 20 - both children left home, expenses down
	{ year: 2050, age: 52, income1: 1.22, income2: 0.60, expenses: 1.00 },
	{ year: 2051, age: 53, income1: 1.22, income2: 0.60, expenses: 1.00 },
	{ year: 2052, age: 54, income1: 1.22, income2: 0.60, expenses: 1.00 },
	{ year: 2053, age: 55, income1: 1.22, income2: 0.60, expenses: 1.00 },
	{ year: 2054, age: 56, income1: 1.22, income2: 0.60, expenses: 1.00 }, // hours start to reduce and/or working easier jobs
	{ year: 2055, age: 57, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2056, age: 58, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2057, age: 59, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2058, age: 60, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2059, age: 61, income1: 0.50, income2: 0.40, expenses: 1.00 },
	{ year: 2060, age: 62, income1: 0.50, income2: 0.40, expenses: 1.00 },
	{ year: 2061, age: 63, income1: 0.50, income2: 0.40, expenses: 1.00 },
	{ year: 2062, age: 64, income1: 0.00, income2: 0.00, expenses: 0.80 }, // retirement
	{ year: 2063, age: 65, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2064, age: 66, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2065, age: 67, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2066, age: 68, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2067, age: 69, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2068, age: 70, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2069, age: 71, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2070, age: 72, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2071, age: 73, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2072, age: 74, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2073, age: 75, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2074, age: 76, income1: 0.00, income2: 0.00, expenses: 1.50 }, // some care assistance
	{ year: 2075, age: 77, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2076, age: 78, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2077, age: 79, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2078, age: 80, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2079, age: 81, income1: 0.00, income2: 0.00, expenses: 5.00 }, // assume care costs now...
	{ year: 2080, age: 82, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2081, age: 83, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2082, age: 84, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2083, age: 85, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2084, age: 86, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2085, age: 87, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2086, age: 88, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2087, age: 89, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2088, age: 90, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2089, age: 91, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2090, age: 92, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2091, age: 93, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2092, age: 94, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2093, age: 95, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2094, age: 96, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2095, age: 97, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2096, age: 98, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2097, age: 99, income1: 0.00, income2: 0.00, expenses: 5.00 },
];

// Simulates Jamie increasing hours by 50% to 30hr/week once kids born
// Emily taking 4 years maternity leave while kids born, then working 50% time
const YEAR_CURVE_J_UP_E_PART: YearCurveValues[] = [
	{ year: 2026, age: 28, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income1: 1.00, income2: 1.02, expenses: 1.00 },
	{ year: 2028, age: 30, income1: 1.00, income2: 1.04, expenses: 1.00 },
	{ year: 2029, age: 31, income1: 1.50, income2: 0.43, expenses: 1.35 }, // kid 0 - children, expenses rise, maternity decreases income
	{ year: 2030, age: 32, income1: 1.50, income2: 0.50, expenses: 1.35 }, // kid 1 - assume part
	{ year: 2031, age: 33, income1: 1.50, income2: 0.25, expenses: 1.65 }, // kid 2,0 - assumme 2nd child, qualifying earnings lower, so maternity even lower
	{ year: 2032, age: 34, income1: 1.50, income2: 0.50, expenses: 1.65 }, // kid 3,1 - assume part time kids 3,1
	{ year: 2033, age: 35, income1: 1.50, income2: 0.50, expenses: 1.65 }, // kid 4,2 - assume part time kids 4,2
	{ year: 2034, age: 36, income1: 1.50, income2: 0.50, expenses: 1.65 }, // kid 5,3 - assume part time kids 5,3
	{ year: 2035, age: 37, income1: 1.50, income2: 0.50, expenses: 1.65 }, // kid 6,4 - assume part time kids 6,4
	{ year: 2036, age: 38, income1: 1.50, income2: 0.51, expenses: 1.65 }, // kid 7,5 - stay part time...
	{ year: 2037, age: 39, income1: 1.80, income2: 0.52, expenses: 1.65 }, // kid 8,6 - school starting child 2, Jamie more hours paid
	{ year: 2038, age: 40, income1: 1.80, income2: 0.53, expenses: 1.65 }, // kid 9,7
	{ year: 2039, age: 41, income1: 1.80, income2: 0.54, expenses: 1.65 }, // kid 10,8
	{ year: 2040, age: 42, income1: 1.80, income2: 0.56, expenses: 1.65 }, // kid 11,9
	{ year: 2041, age: 43, income1: 1.80, income2: 0.57, expenses: 1.65 }, // kid 12,10
	{ year: 2042, age: 44, income1: 1.80, income2: 0.58, expenses: 1.65 }, // kid 13,11
	{ year: 2043, age: 45, income1: 1.80, income2: 0.59, expenses: 1.65 }, // kid 14,12
	{ year: 2044, age: 46, income1: 1.80, income2: 0.60, expenses: 1.65 }, // kid 15,13
	{ year: 2045, age: 47, income1: 1.80, income2: 0.60, expenses: 1.65 }, // kid 16,14
	{ year: 2046, age: 48, income1: 1.80, income2: 0.60, expenses: 1.65 }, // kid 17,15
	{ year: 2047, age: 49, income1: 1.80, income2: 0.60, expenses: 1.65 }, // kid 18,16
	{ year: 2048, age: 50, income1: 1.80, income2: 0.60, expenses: 1.35 }, // kid 19,17
	{ year: 2049, age: 51, income1: 1.80, income2: 0.60, expenses: 1.35 }, // kid 20,18 - both children left home, expenses down
	{ year: 2050, age: 52, income1: 1.80, income2: 0.60, expenses: 1.00 },
	{ year: 2051, age: 53, income1: 1.80, income2: 0.60, expenses: 1.00 },
	{ year: 2052, age: 54, income1: 1.80, income2: 0.60, expenses: 1.00 },
	{ year: 2053, age: 55, income1: 1.80, income2: 0.60, expenses: 1.00 },
	{ year: 2054, age: 56, income1: 1.80, income2: 0.60, expenses: 1.00 }, // hours start to reduce and/or working easier jobs
	{ year: 2055, age: 57, income1: 1.00, income2: 0.40, expenses: 1.00 },
	{ year: 2056, age: 58, income1: 1.00, income2: 0.40, expenses: 1.00 },
	{ year: 2057, age: 59, income1: 1.00, income2: 0.40, expenses: 1.00 },
	{ year: 2058, age: 60, income1: 1.00, income2: 0.40, expenses: 1.00 },
	{ year: 2059, age: 61, income1: 0.00, income2: 0.00, expenses: 1.00 }, // retirement
	{ year: 2060, age: 62, income1: 0.00, income2: 0.00, expenses: 0.95 },
	{ year: 2061, age: 63, income1: 0.00, income2: 0.00, expenses: 0.90 },
	{ year: 2062, age: 64, income1: 0.00, income2: 0.00, expenses: 0.90 },
	{ year: 2063, age: 65, income1: 0.00, income2: 0.00, expenses: 0.90 },
	{ year: 2064, age: 66, income1: 0.00, income2: 0.00, expenses: 0.90 },
	{ year: 2065, age: 67, income1: 0.00, income2: 0.00, expenses: 0.90 },

	// emily nhs pension starts -> assuming 6 years full time then 25 yers part time so 6*1/54 + 25*1/54*0.5 = 0.34 of pay
	// Also state pension 12k, which is further 43% of Emily's current income
	// And 0.36% of Jamie's current income
  // This therefore should be 0.36 of Jamie's income plus 0.34+0.43=0.77 of Emily's income
	// But I'm going to be pessimistic and assume state pension is only half as generous by the time we retire
	// So 0.18 of Jamie's income plus 0.34+0.21=0.55 of Emily's income
	{ year: 2066, age: 68, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2067, age: 69, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2068, age: 70, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2069, age: 71, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2070, age: 72, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2071, age: 73, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2072, age: 74, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2073, age: 75, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2074, age: 76, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2075, age: 77, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2076, age: 78, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2077, age: 79, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2078, age: 80, income1: 0.18, income2: 0.55, expenses: 0.90 },
	{ year: 2079, age: 81, income1: 0.18, income2: 0.55, expenses: 5.00 }, // assume care costs now...
	{ year: 2080, age: 82, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2081, age: 83, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2082, age: 84, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2083, age: 85, income1: 0.18, income2: 0.55, expenses: 5.00 }, // care costs rise...
	{ year: 2084, age: 86, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2085, age: 87, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2086, age: 88, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2087, age: 89, income1: 0.18, income2: 0.55, expenses: 5.00 }, // full time residential care
	{ year: 2088, age: 90, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2089, age: 91, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2090, age: 92, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2091, age: 93, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2092, age: 94, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2093, age: 95, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2094, age: 96, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2095, age: 97, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2096, age: 98, income1: 0.18, income2: 0.55, expenses: 5.00 },
	{ year: 2097, age: 99, income1: 0.18, income2: 0.55, expenses: 5.00 },
];


// Simulates Jamie increasing to full time once kids born
// Emily taking longer unpaid maternity, then return to work part time
const YEAR_CURVE_J_FULL_E_PART: YearCurveValues[] = [
	{ year: 2026, age: 28, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income1: 1.01, income2: 1.02, expenses: 1.00 },
	{ year: 2028, age: 30, income1: 1.02, income2: 1.04, expenses: 1.00 },
	{ year: 2029, age: 31, income1: 2.12, income2: 0.43, expenses: 1.30 }, // kid 0 - children, expenses rise, maternity decreases income
	{ year: 2030, age: 32, income1: 2.14, income2: 0.50, expenses: 1.30 }, // kid 1 - assume part
	{ year: 2031, age: 33, income1: 2.16, income2: 0.00, expenses: 1.60 }, // kid 2,0 - assumme 2nd child, qualifying earnings lower, so maternity even lower
	{ year: 2032, age: 34, income1: 2.18, income2: 0.00, expenses: 1.60 }, // kid 3,1 - assume part time kids 3,1
	{ year: 2033, age: 35, income1: 2.20, income2: 0.00, expenses: 1.60 }, // kid 4,2 - assume part time kids 4,2
	{ year: 2034, age: 36, income1: 2.24, income2: 0.00, expenses: 1.60 }, // kid 5,3 - assume part time kids 5,3
	{ year: 2035, age: 37, income1: 2.26, income2: 0.00, expenses: 1.60 }, // kid 6,4 - assume part time kids 6,4
	{ year: 2036, age: 38, income1: 2.30, income2: 0.50, expenses: 1.60 }, // kid 7,5 - stay part time...
	{ year: 2037, age: 39, income1: 2.31, income2: 0.50, expenses: 1.60 }, // kid 8,6 - school starting child 2
	{ year: 2038, age: 40, income1: 2.32, income2: 0.51, expenses: 1.60 }, // kid 9
	{ year: 2039, age: 41, income1: 2.32, income2: 0.52, expenses: 1.60 }, // kid 10
	{ year: 2040, age: 42, income1: 2.32, income2: 0.53, expenses: 1.60 }, // kid 11
	{ year: 2041, age: 43, income1: 2.33, income2: 0.54, expenses: 1.60 }, // kid 12
	{ year: 2042, age: 44, income1: 2.33, income2: 0.55, expenses: 1.60 }, // kid 13
	{ year: 2043, age: 45, income1: 2.33, income2: 0.56, expenses: 1.60 }, // kid 14
	{ year: 2044, age: 46, income1: 2.34, income2: 0.57, expenses: 1.60 }, // kid 15
	{ year: 2045, age: 47, income1: 2.34, income2: 0.58, expenses: 1.60 }, // kid 16
	{ year: 2046, age: 48, income1: 2.34, income2: 0.59, expenses: 1.60 }, // kid 17
	{ year: 2047, age: 49, income1: 2.35, income2: 0.60, expenses: 1.60 }, // kid 18
	{ year: 2048, age: 50, income1: 2.35, income2: 0.60, expenses: 1.60 }, // kid 19
	{ year: 2049, age: 51, income1: 2.35, income2: 0.60, expenses: 1.60 }, // kid 20 - both children left home, expenses down
	{ year: 2050, age: 52, income1: 2.35, income2: 0.60, expenses: 1.00 },
	{ year: 2051, age: 53, income1: 2.35, income2: 0.60, expenses: 1.00 },
	{ year: 2052, age: 54, income1: 2.35, income2: 0.60, expenses: 1.00 },
	{ year: 2053, age: 55, income1: 2.35, income2: 0.60, expenses: 1.00 },
	{ year: 2054, age: 56, income1: 2.45, income2: 0.60, expenses: 1.00 }, // hours start to reduce and/or working easier jobs
	{ year: 2055, age: 57, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2056, age: 58, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2057, age: 59, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2058, age: 60, income1: 0.80, income2: 0.40, expenses: 1.00 },
	{ year: 2059, age: 61, income1: 0.50, income2: 0.40, expenses: 1.00 },
	{ year: 2060, age: 62, income1: 0.50, income2: 0.40, expenses: 1.00 },
	{ year: 2061, age: 63, income1: 0.50, income2: 0.40, expenses: 1.00 },
	{ year: 2062, age: 64, income1: 0.00, income2: 0.00, expenses: 0.80 }, // retirement
	{ year: 2063, age: 65, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2064, age: 66, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2065, age: 67, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2066, age: 68, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2067, age: 69, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2068, age: 70, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2069, age: 71, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2070, age: 72, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2071, age: 73, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2072, age: 74, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2073, age: 75, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2074, age: 76, income1: 0.00, income2: 0.00, expenses: 1.50 }, // some care assistance
	{ year: 2075, age: 77, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2076, age: 78, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2077, age: 79, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2078, age: 80, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2079, age: 81, income1: 0.00, income2: 0.00, expenses: 5.00 }, // assume care costs now...
	{ year: 2080, age: 82, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2081, age: 83, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2082, age: 84, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2083, age: 85, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2084, age: 86, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2085, age: 87, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2086, age: 88, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2087, age: 89, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2088, age: 90, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2089, age: 91, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2090, age: 92, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2091, age: 93, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2092, age: 94, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2093, age: 95, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2094, age: 96, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2095, age: 97, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2096, age: 98, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2097, age: 99, income1: 0.00, income2: 0.00, expenses: 5.00 },
];


// Simulates Jamie increasing hours by 50% to 30hr/week once kids born
// Emily working part time post kids
// Then both retiring early
const YEAR_CURVE_EARLY_RETIREMENT: YearCurveValues[] = [
	{ year: 2026, age: 28, income1: 1.00, income2: 1.00, expenses: 1.00 },
	{ year: 2027, age: 29, income1: 1.01, income2: 1.02, expenses: 1.00 },
	{ year: 2028, age: 30, income1: 1.02, income2: 1.04, expenses: 1.00 },
	{ year: 2029, age: 31, income1: 1.50, income2: 0.43, expenses: 1.30 }, // kid 0 - children, expenses rise, maternity decreases income
	{ year: 2030, age: 32, income1: 1.51, income2: 0.50, expenses: 1.30 }, // kid 1 - assume part
	{ year: 2031, age: 33, income1: 1.52, income2: 0.25, expenses: 1.60 }, // kid 2,0 - assumme 2nd child, qualifying earnings lower, so maternity even lower
	{ year: 2032, age: 34, income1: 1.53, income2: 0.50, expenses: 1.60 }, // kid 3,1 - assume part time kids 3,1
	{ year: 2033, age: 35, income1: 1.54, income2: 0.50, expenses: 1.60 }, // kid 4,2 - assume part time kids 4,2
	{ year: 2034, age: 36, income1: 1.55, income2: 0.50, expenses: 1.60 }, // kid 5,3 - assume part time kids 5,3
	{ year: 2035, age: 37, income1: 1.56, income2: 0.50, expenses: 1.60 }, // kid 6,4 - assume part time kids 6,4
	{ year: 2036, age: 38, income1: 1.57, income2: 0.51, expenses: 1.60 }, // kid 7,5 - stay part time...
	{ year: 2037, age: 39, income1: 1.58, income2: 0.52, expenses: 1.60 }, // kid 8,6 - school starting child 2
	{ year: 2038, age: 40, income1: 1.59, income2: 0.53, expenses: 1.60 }, // kid 9
	{ year: 2039, age: 41, income1: 1.60, income2: 0.54, expenses: 1.60 }, // kid 10
	{ year: 2040, age: 42, income1: 1.61, income2: 0.56, expenses: 1.60 }, // kid 11
	{ year: 2041, age: 43, income1: 1.62, income2: 0.57, expenses: 1.60 }, // kid 12
	{ year: 2042, age: 44, income1: 1.63, income2: 0.58, expenses: 1.60 }, // kid 13
	{ year: 2043, age: 45, income1: 1.64, income2: 0.59, expenses: 1.60 }, // kid 14
	{ year: 2044, age: 46, income1: 1.65, income2: 0.60, expenses: 1.60 }, // kid 15
	{ year: 2045, age: 47, income1: 1.66, income2: 1.10, expenses: 1.60 }, // kid 16 - emily full time
	{ year: 2046, age: 48, income1: 1.67, income2: 1.10, expenses: 1.60 }, // kid 17
	{ year: 2047, age: 49, income1: 1.68, income2: 1.10, expenses: 1.60 }, // kid 18
	{ year: 2048, age: 50, income1: 1.69, income2: 1.10, expenses: 1.60 }, // kid 19
	{ year: 2049, age: 51, income1: 1.70, income2: 1.10, expenses: 1.60 }, // kid 20 - both children left home, expenses down
	{ year: 2050, age: 52, income1: 1.70, income2: 0.60, expenses: 1.00 },
	{ year: 2051, age: 53, income1: 1.70, income2: 0.60, expenses: 1.00 },
	{ year: 2052, age: 54, income1: 1.70, income2: 0.60, expenses: 1.00 },
	{ year: 2053, age: 55, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2054, age: 56, income1: 0.00, income2: 0.00, expenses: 1.00 }, // hours start to reduce and/or working easier jobs
	{ year: 2055, age: 57, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2056, age: 58, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2057, age: 59, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2058, age: 60, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2059, age: 61, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2060, age: 62, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2061, age: 63, income1: 0.00, income2: 0.00, expenses: 1.00 },
	{ year: 2062, age: 64, income1: 0.00, income2: 0.00, expenses: 0.80 }, // retirement
	{ year: 2063, age: 65, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2064, age: 66, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2065, age: 67, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2066, age: 68, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2067, age: 69, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2068, age: 70, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2069, age: 71, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2070, age: 72, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2071, age: 73, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2072, age: 74, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2073, age: 75, income1: 0.00, income2: 0.00, expenses: 0.80 },
	{ year: 2074, age: 76, income1: 0.00, income2: 0.00, expenses: 1.50 }, // some care assistance
	{ year: 2075, age: 77, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2076, age: 78, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2077, age: 79, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2078, age: 80, income1: 0.00, income2: 0.00, expenses: 1.50 },
	{ year: 2079, age: 81, income1: 0.00, income2: 0.00, expenses: 5.00 }, // assume care costs now...
	{ year: 2080, age: 82, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2081, age: 83, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2082, age: 84, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2083, age: 85, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2084, age: 86, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2085, age: 87, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2086, age: 88, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2087, age: 89, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2088, age: 90, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2089, age: 91, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2090, age: 92, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2091, age: 93, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2092, age: 94, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2093, age: 95, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2094, age: 96, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2095, age: 97, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2096, age: 98, income1: 0.00, income2: 0.00, expenses: 5.00 },
	{ year: 2097, age: 99, income1: 0.00, income2: 0.00, expenses: 5.00 },
];


export const YEAR_CURVES: { name: string, key: string, values: YearCurveValues[] }[] = [
	{ name: 'Flat', key: 'flat', values: YEAR_CURVE_FLAT },
	{ name: 'Jamie 20hr, Emily maternity then full', key: 'jamie-flat-emily-4-maternity', values: YEAR_CURVE_J_FLAT_E_4_MATERNITY },
	{ name: 'Jamie 20hr, Emily part time after kids', key: 'jamie-flat-emily-part', values: YEAR_CURVE_J_FLAT_E_PART },
	{ name: 'Jamie 30hr, Emily part time after kids', key: 'jamie-30hr-emily-part', values: YEAR_CURVE_J_UP_E_PART },
	{ name: 'Jamie 40hr, Emily part time after kids', key: 'jamie-40hr-emily-part', values: YEAR_CURVE_J_FULL_E_PART },
	{ name: 'Early retirement', key: 'early-retirement', values: YEAR_CURVE_EARLY_RETIREMENT },
];

