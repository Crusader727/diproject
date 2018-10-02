export function getMinMax(input) {
    const arr = input.split(' ').filter(el => parseFloat(el));
    arr.forEach((el, i) => arr[i] = parseFloat(el));
    return { max: Math.max(...arr), min: Math.min(...arr) };
}