import React from 'react';
import { IPlannedTransaction } from '../../../DTOs/Money/planned.transaction.dto';
import { FormatCurrency } from '../../Shared/Number/format.currency';
import { getPlannedTransactions } from '../../../DAOs/Money/planned.transaction.dao';
import { PlannedTransaction } from '../Components/planned.transaction';

interface IPlannedTransactionProps {
	accountId: string,
	dateFrom: string;
	dateTo: string;
	setPlannedTransactionsTotal: Function
}

interface IPlannedTransactionState {
	total: number;
	plannedTransactions: Array<IPlannedTransaction>;
}

class PlannedTransactionsPanel extends React.Component<IPlannedTransactionProps, IPlannedTransactionState> {

	constructor(props: IPlannedTransactionProps) {
		super(props);

		this.state = {
			total: 0,
			plannedTransactions: []
		}
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate(prevProps: IPlannedTransactionProps) {
		if (prevProps.dateTo !== undefined && prevProps.dateTo !== this.props.dateTo) {
			this.loadData();
		}
	}

	async loadData() {
		this.setState({
			total: 0,
			plannedTransactions: await getPlannedTransactions(this.props.accountId, this.props.dateFrom, this.props.dateTo)
		});

		this.state.plannedTransactions.forEach((plannedTransaction: IPlannedTransaction) => {
			this.setState({
				total: this.state.total + plannedTransaction.Amount
			});
		});

		this.props.setPlannedTransactionsTotal(this.state.total);
	}

	render() {
		return <>
			<div className="flex justify-between">
				<h2 className="flex flex-row font-bold text-2xl mb-5">
					Planned transactions 
					<a href="/banks/1" className="text-blue-500 self-center align-middle ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></a>
				</h2>
				<p className={this.state.total >= 0 ? 'text-green-500 text-xl font-bold min-w-max' : 'text-red-500 text-xl font-bold min-w-max'}>
					<FormatCurrency value={this.state.total} />
				</p>
			</div>
			{this.state.plannedTransactions.length > 0 ? this.state.plannedTransactions.map((plannedTransaction: IPlannedTransaction) => {
				return <PlannedTransaction 
					id={plannedTransaction.id}
					processed={plannedTransaction.Processed}
					date={plannedTransaction.Date} 
					name={plannedTransaction.Name}
					transactionCategoryCode={plannedTransaction.transaction_category.Code} 
					transactionCategoryName={plannedTransaction.transaction_category.Name}
					bankName={plannedTransaction.bank_account.Bank.Name}
					bankAccountName={plannedTransaction.bank_account.Name}
					amount={plannedTransaction.Amount} />}) : <p>No planned transactions found.</p>}
			{/* <div className="flex border-b pt-5 pb-5 flex-col md:flex-row">
				<div className="min-w-max pr-5">
					<svg className="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
				</div>
				<div>
					<svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				</div>
				<p className="md:pl-5 md:pr-5 font-bold min-w-max">01/03/2021</p>
				<h5 className="md:pl-5 md:pr-5 w-full">
					Money moved out of savings pot "Baby fund"<br/>
					<small className="text-gray-500">Transfer</small>
				</h5>
				<p className="text-red-500 min-w-max">-&pound;100.00</p>
			</div>
			<div className="flex border-b pt-5 pb-5 flex-col md:flex-row">
				<div className="min-w-max pr-5">
					<svg className="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
				</div>
				<div>
					<svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
				</div>
				<p className="md:pl-5 md:pr-5 font-bold min-w-max">01/03/2021</p>
				<h5 className="md:pl-5 md:pr-5 w-full">
					Food shop at Tesco<br/>
					<small className="text-gray-500">Spending</small>
				</h5>
				<p className="text-red-500 min-w-max">-&pound;100.00</p>
			</div>
			<div className="flex border-b pt-5 pb-5 flex-col md:flex-row">
				<div className="min-w-max pr-5">
					<svg className="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
				</div>
				<div>
					<svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
				</div>
				<p className="md:pl-5 md:pr-5 font-bold min-w-max">01/03/2021</p>
				<h5 className="md:pl-5 md:pr-5 w-full">
					Netflix<br/>
					<small className="text-gray-500">Entertainment</small>
				</h5>
				<p className="text-red-500 min-w-max">-&pound;9.99</p>
			</div> */}
		</>;
	}
}

export default PlannedTransactionsPanel;