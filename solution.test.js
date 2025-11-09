const solution = require('./solution');

describe('Date Aggregation Function', () => {
    test('Example 1 - Complete week data', () => {
        const input = {
            "2020-01-01": 4,
            "2020-01-02": 4,
            "2020-01-03": 6,
            "2020-01-04": 8,
            "2020-01-05": 2,
            "2020-01-06": -6,
            "2020-01-07": 2,
            "2020-01-08": -2
        };

        const expected = {
            Sun: 2,
            Mon: -6,
            Tue: 2,
            Wed: 2,
            Thu: 4,
            Fri: 6,
            Sat: 8
        };

        expect(solution(input)).toEqual(expected);
    });

    test('Example 2 - Missing days interpolation', () => {
        const input = {
            "2020-01-01": 6,  // Wed
            "2020-01-04": 12, // Sat
            "2020-01-05": 14, // Sun
            "2020-01-06": 2,  // Mon
            "2020-01-07": 4   // Tue
        };

        const expected = {
            Sun: 14,
            Mon: 2,
            Tue: 4,
            Wed: 6,
            Thu: 8,
            Fri: 10,
            Sat: 12
        };

        const result = solution(input);
        console.log('Test 2 Result:', result); // Debug output
        expect(result).toEqual(expected);
    });

    test('Edge case - Only Monday and Sunday', () => {
        const input = {
            "2020-01-05": 10, // Sunday
            "2020-01-06": 5   // Monday
        };

        const result = solution(input);
        expect(result.Mon).toBe(5);
        expect(result.Sun).toBe(10);
    });

    test('Single day repeated multiple times', () => {
        const input = {
            "2020-01-06": 1, // Monday
            "2020-01-13": 2, // Monday
            "2020-01-20": 3  // Monday
        };

        const result = solution(input);
        expect(result.Mon).toBe(6); // 1 + 2 + 3
    });
});