import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null | undefined;

// Register a custom locale
numeral.register('locale', 'dot-locale', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal(number) {
    return number === 1 ? 'st' : 'th';
  },
  currency: {
    symbol: '€',
  },
});

numeral.locale('dot-locale');

export function fNumber(number: InputValue) {
  return numeral(number).format();
}

export function fCurrency(number: InputValue) {
  return number ? numeral(number).format('0,0') : '0';
}

export function fUnit(number: InputValue) {
  const format = number ? numeral(number).format('0,0') : '0';
  return format.replace(/,/g, '.');
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}

export function fDecimal(number: number) {
  return number / 10;
}
