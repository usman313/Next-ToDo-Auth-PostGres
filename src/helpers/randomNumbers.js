import bigInt from 'big-integer';

export default function generateBigInteger() {
    const min = 1e19;
    const max = 1e20;
    const randomNumber = Math.random() * (max - min) + min;
    const roundedNumber = Math.round(randomNumber);
    return roundedNumber;
}
