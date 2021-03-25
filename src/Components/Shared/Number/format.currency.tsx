// @ts-ignore
import * as CurrencyFormat from 'react-currency-format';

export function FormatCurrency(props: {value: number}) {
    return <CurrencyFormat value={props.value|0} displayType={'text'} isNumericString={true} thousandSeparator={true} prefix={'£'} decimalScale={2} fixedDecimalScale={true} />
}