import { useState, useEffect } from 'react';
import { getPlannedTransactionsTotal } from '../../../../DAOs/Money/planned.transaction.dao';
import { getLatestAccountTotal } from '../../../../DAOs/Money/transaction.totals.dao';
import { FormatCurrency } from '../../../Shared/Number/format.currency';
import { getSavingsPotTotalsForAccount } from '../../../../DAOs/Money/savings.pots.dao';

export const AccountTotalMinusBills = (props: {
	accountId: string,
	dateFrom: string,
	dateTo: string,
	refresh: boolean
}) => {

	const [loading, setLoading] = useState<boolean>(false);
	const [accountTotal, setAccountTotal] = useState<number>(0);
	const [plannedTransactionsTotal, setPlannedTransactionsTotal] = useState<number>(0);
	const [savingsTotal, setSavingsTotal] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {
		setLoading(true);
		getLatestAccountTotal(props.accountId, props.dateFrom, props.dateTo).then((accountTotalResult: number) => {
			setAccountTotal(accountTotalResult);

			getPlannedTransactionsTotal(props.accountId, props.dateTo).then((plannedTransactionsTotalResult: number) => {
				setPlannedTransactionsTotal(plannedTransactionsTotalResult);

				getSavingsPotTotalsForAccount(props.accountId, props.dateTo).then((savingsTotalResults: Map<string, number>) => {
					
					let savingsTotalSum = 0;

					savingsTotalResults.forEach((amount, id) => {
						savingsTotalSum += amount;
					});

					setSavingsTotal(savingsTotalSum);
					setTotal(accountTotal + plannedTransactionsTotal - savingsTotal);
					setLoading(false);
				});
				
			});
		});
		
	}, [accountTotal, plannedTransactionsTotal, props.accountId, props.dateFrom, props.dateTo, props.refresh, savingsTotal])

	return <div className={(loading ? "bg-gray-700" : (total >= 0 ? "bg-green-600" : "bg-red-600")) + " p-10 mb-5 text-white rounded-xl shadow-lg border text-center"}>
		<p className="font-bold">Total excluding savings and bills</p>
		<p className="text-4xl font-bold">{loading ? "Loading..." : <FormatCurrency value={total} />}</p>
	</div>
}