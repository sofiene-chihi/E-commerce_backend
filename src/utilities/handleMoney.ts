import { Money } from 'bigint-money';
import Numeral from 'numeral';

export const BASE_CURRENCY = 'DT';
export const OUTPUT_PRECISION = 10;

export const formatMoney = ({
  amount,
  format = '0,0.00',
  precision = 2,
}: {
  amount: number | string;
  format?: string;
  precision?: number;
}) => {
  if (amount != null) {
    const value = Number(
      new Money(String(amount), BASE_CURRENCY).toFixed(precision),
    );

    return `DT ${Numeral(value).format(format)}`;
  }

  return '';
};

export default Money;
