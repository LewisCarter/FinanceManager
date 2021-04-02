import React, { useEffect, useState } from 'react';
import { getPlannedTransactions, getPlannedTransactionsTotal, initiateRecurringTransactions } from '../../../DAOs/Money/planned.transaction.dao';
import { IPlannedTransaction } from '../../../DTOs/Money/planned.transaction.dto';
import { FormatCurrency } from '../../Shared/Number/format.currency';
import { PlannedTransaction } from '../Components/planned.transaction';

export const PlannedTransactionsPanel = (props: {
	accountId: string;
	dateFrom: string;
	dateTo: string;
	refresh: boolean;
	refreshCallback: Function;
}) => {

	const [total, setTotal] = useState<number>(0);
	const [plannedTransactions, setPlannedTransactions] = useState<IPlannedTransaction[]>([]);

	useEffect(() => {
		getPlannedTransactionsTotal(props.accountId, props.dateFrom, props.dateTo).then((result: number) => {
			setTotal(result);
		});

		getPlannedTransactions(props.accountId, props.dateFrom, props.dateTo).then((result: IPlannedTransaction[]) => {
			setPlannedTransactions(result);
		});
	}, [props.accountId, props.dateFrom, props.dateTo, props.refresh]);

	function initiate() {
		initiateRecurringTransactions(props.accountId, props.dateFrom).then((result: IPlannedTransaction[]) => {
			setPlannedTransactions(result);
		});
	}

	return <>
		<div className="flex justify-between">
			<h2 className="flex flex-row font-bold text-2xl mb-5">
				Planned transactions 
				<button className="text-blue-500 self-center align-middle ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
			</h2>
			<p className={total >= 0 ? 'text-green-500 text-xl font-bold min-w-max' : 'text-red-500 text-xl font-bold min-w-max'}>
				<FormatCurrency value={total} />
			</p>
		</div>
		{plannedTransactions.length > 0 ? plannedTransactions.map((plannedTransaction: IPlannedTransaction, idx) => {
			return <PlannedTransaction 
				key={'planned-transaction-' + idx}
				id={plannedTransaction.id}
				processed={plannedTransaction.Processed}
				date={plannedTransaction.Date} 
				name={plannedTransaction.Name}
				transactionCategoryCode={plannedTransaction.transaction_category.Code} 
				transactionCategoryName={plannedTransaction.transaction_category.Name}
				bankName={plannedTransaction.bank_account.Bank.Name}
				bankAccountName={plannedTransaction.bank_account.Name}
				amount={plannedTransaction.Amount}
				refreshCallback={props.refreshCallback} />}) : <p>No planned transactions found. <button onClick={initiate} className="text-blue-500 hover:text-blue-600 hover:underline">Click here</button> to initiate recurring transactions.</p>}
	</>;
}