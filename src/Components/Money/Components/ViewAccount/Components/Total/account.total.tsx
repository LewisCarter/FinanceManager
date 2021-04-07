import { useState, useEffect } from 'react';
import { getLatestAccountTotal } from '../../../../../../DAOs/Money/transaction.totals.dao';
import { FormatCurrency } from '../../../../../Shared/Number/format.currency';

export const AccountTotal = (props: {
	accountId: string,
	dateFrom: string,
	dateTo: string,
	refresh: boolean
}) => {

	const [total, setTotal] = useState<number>(0);

	useEffect(() => {
		getLatestAccountTotal(props.accountId, props.dateFrom, props.dateTo).then((result: number) => {
			setTotal(result);
		});
	}, [props.accountId, props.dateFrom, props.dateTo, props.refresh])

	

	return <div className={(total >= 0 ? "bg-green-600" : "bg-red-600") + " p-10 mb-5 text-white rounded-xl shadow-lg border text-center"}>
		<p className="font-bold">Total</p>
		<p className="text-4xl font-bold"><FormatCurrency value={total} /></p>
	</div>
}