import React, { useEffect, useState } from 'react';
import { getPlannedTransactions, getPlannedTransactionsTotal, initiateRecurringTransactions } from '../../../DAOs/Money/planned.transaction.dao';
import { IPlannedTransaction } from '../../../DTOs/Money/planned.transaction.dto';
import { FormatCurrency } from '../../Shared/Number/format.currency';
import { PlannedTransaction } from '../Components/planned.transaction';

// interface IPlannedTransactionProps {
// 	accountId: string,
// 	dateFrom: string;
// 	dateTo: string;
// 	setPlannedTransactionsTotal: Function
// }

// interface IPlannedTransactionState {
// 	total: number;
// 	plannedTransactions: Array<IPlannedTransaction>;
// }

export const PlannedTransactionsPanel = (props: {
	accountId: string;
	dateFrom: string;
	dateTo: string;
	refresh: boolean;
}) => {

	const [total, setTotal] = useState<number>(0);
	const [plannedTransactions, setPlannedTransactions] = useState<IPlannedTransaction[]>([]);

	useEffect(() => {
		getPlannedTransactionsTotal(props.accountId, props.dateTo).then((result: number) => {
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
				amount={plannedTransaction.Amount} />}) : <p>No planned transactions found. <button onClick={initiate} className="text-blue-500 hover:text-blue-600 hover:underline">Click here</button> to initiate recurring transactions.</p>}
	</>;
}

// class PlannedTransactionsPanel extends React.Component<IPlannedTransactionProps, IPlannedTransactionState> {

// 	constructor(props: IPlannedTransactionProps) {
// 		super(props);

// 		this.state = {
// 			total: 0,
// 			plannedTransactions: []
// 		}

// 		this.initiateRecurringTransactions = this.initiateRecurringTransactions.bind(this);
// 	}

// 	componentDidMount() {
// 		this.loadData();
// 	}

// 	componentDidUpdate(prevProps: IPlannedTransactionProps) {
// 		if (prevProps.dateTo !== undefined && prevProps.dateTo !== this.props.dateTo) {
// 			this.loadData();
// 		}
// 	}

// 	async loadData() {
// 		this.setState({
// 			total: 0,
// 			plannedTransactions: await getPlannedTransactions(this.props.accountId, this.props.dateFrom, this.props.dateTo),
// 		});

// 		this.state.plannedTransactions.forEach((plannedTransaction: IPlannedTransaction) => {
// 			if (!plannedTransaction.Processed) {
// 				this.setState({
// 					total: this.state.total + plannedTransaction.Amount
// 				});
// 			}
// 		});

// 		this.props.setPlannedTransactionsTotal(this.state.total);
// 	}

// 	async initiateRecurringTransactions() {
// 		await initiateRecurringTransactions(this.props.accountId, this.props.dateFrom).then((result: IPlannedTransaction[]) => {
// 			this.loadData();
// 		});
// 	}

// 	render() {
// 		return <>
// 			<div className="flex justify-between">
// 				<h2 className="flex flex-row font-bold text-2xl mb-5">
// 					Planned transactions 
// 					<button className="text-blue-500 self-center align-middle ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
// 				</h2>
// 				<p className={this.state.total >= 0 ? 'text-green-500 text-xl font-bold min-w-max' : 'text-red-500 text-xl font-bold min-w-max'}>
// 					<FormatCurrency value={this.state.total} />
// 				</p>
// 			</div>
// 			{this.state.plannedTransactions.length > 0 ? this.state.plannedTransactions.map((plannedTransaction: IPlannedTransaction, idx) => {
// 				return <PlannedTransaction 
// 					key={'planned-transaction-' + idx}
// 					id={plannedTransaction.id}
// 					processed={plannedTransaction.Processed}
// 					date={plannedTransaction.Date} 
// 					name={plannedTransaction.Name}
// 					transactionCategoryCode={plannedTransaction.transaction_category.Code} 
// 					transactionCategoryName={plannedTransaction.transaction_category.Name}
// 					bankName={plannedTransaction.bank_account.Bank.Name}
// 					bankAccountName={plannedTransaction.bank_account.Name}
// 					amount={plannedTransaction.Amount} />}) : <p>No planned transactions found. <button onClick={this.initiateRecurringTransactions} className="text-blue-500 hover:text-blue-600 hover:underline">Click here</button> to initiate recurring transactions.</p>}
// 		</>;
// 	}
// }

// export default PlannedTransactionsPanel;