import { NumericFormat } from 'react-number-format';

interface CurrencyFormatProps {
  value: number;
  className?: string;
  currency?: string;
}

export default function CurrencyFormat({ value, currency = '$', className }: CurrencyFormatProps) {
  return (
    <NumericFormat
      value={value}
      className={className ?? ''}
      displayType="text"
      thousandSeparator
      prefix={currency}
      fixedDecimalScale
      decimalScale={2}
    />
  );
}
