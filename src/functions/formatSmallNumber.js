export function formatSmallNumber(number, decimal = null) {
    if (Number(number) === 0 || number === undefined) {
        return 0
    }
    else if (Math.abs(Number(number)) < 1e-3) { // برای اعداد بسیار کوچک
        if (decimal === null) {
            return Number(number).toExponential();
        } else {
            return (Number(number).toExponential(decimal));
        }
    }
    return Number(number).toLocaleString(); // برای اعداد معمولی
}