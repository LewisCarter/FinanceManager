import React from 'react';
import { match } from 'react-router-dom';
import { getAccount } from '../../DAOs/Money/accounts.dao';
import SavingsTotalsPanel from './Panels/savings.totals.component';
import LoggedInTemplate from '../Shared/loggedin.component';
import BankTotalPanel from './Panels/banks.listing.total.chart.component';
import { IAccount } from '../../DTOs/Money/account.dto';
import { getLatestAccountTotal } from '../../DAOs/Money/transaction.totals.dao';
import { FormatCurrency } from '../Shared/Number/format.currency';
import { Transaction } from './Components/transaction';
import { getAccountTransactions, getAccountTransactionsTotal } from '../../DAOs/Money/transactions.dao';
import { ITransaction } from '../../DTOs/Money/transaction.dto';
import moment from 'moment';
import Moment from 'react-moment';
import { Pagination } from '../Shared/Components/pagination.component';
import Error404 from '../Shared/Errors/404.component';
import PlannedTransactionsPanel from './Panels/planned.transaction.totals.component';

interface IViewAccountProps {
	match: match<{accountId:string}>
}

interface IViewAccountState {
	bankAccount: IAccount | undefined;
	date: moment.Moment;
	dateFrom: string;
	dateTo: string;
	accountTotal : number;
	plannedTransactionsTotal: number
	savingPotTotal: number;
	plannedTransactions : [];
	transactionHistory : {
		records : Array<ITransaction>;
		total : number;
		page : number;
		perPage : number;
	}
	errors?: Array<{id:string, message: string}>;
}

class ViewAccount extends React.Component<IViewAccountProps, IViewAccountState> {

	constructor(props: IViewAccountProps) {
		super(props);

		this.state = {
			bankAccount: undefined,
			date: (moment().toDate().getDay() < 25) ? moment().date(25) : moment().date(25).add({months: 1}),
			dateFrom: "",
			dateTo: "",
			accountTotal : 0,
			plannedTransactionsTotal: 0,
			savingPotTotal: 0,
			plannedTransactions : [],
			transactionHistory : {
				records : [],
				total : 0,
				page : 1,
				perPage : 10
			},
			errors: []
		}

		this.previousMonth = this.previousMonth.bind(this);
		this.nextMonth = this.nextMonth.bind(this);
		this.loadAccount = this.loadAccount.bind(this);
		this.updateTransactionHistoryPage = this.updateTransactionHistoryPage.bind(this);
		this.setPlannedTransactionsTotal = this.setPlannedTransactionsTotal.bind(this);
		this.setSavingsPotsTotal = this.setSavingsPotsTotal.bind(this);
	}

	componentDidMount() {
		this.setFromAndToDates();
		this.loadAccount();
	}

	previousMonth() {
		this.setState({
			date: this.state.date.subtract({months: 1})
		});
		this.setFromAndToDates();
		this.loadAccount();
	}

	nextMonth() {
		this.setState({
			date: this.state.date.add({months: 1})
		});
		this.setFromAndToDates();
		this.loadAccount();
	}

	setFromAndToDates() {
		const dateFrom = moment(this.state.date);
		const dateTo = moment(this.state.date);

		const dateFromISO = (dateFrom.toDate().getDay() < 25) ? dateFrom.subtract({months: 1}).toISOString() : dateFrom.toISOString();
		const dateToISO = (dateTo.toDate().getDay() >= 25) ? dateTo.add({months: 1}).toISOString() : dateTo.toISOString();

		this.setState({
			dateFrom: dateFromISO,
			dateTo: dateToISO
		});
	}

	setPlannedTransactionsTotal(total: number) {
		this.setState({
			plannedTransactionsTotal: total
		});
	}

	setSavingsPotsTotal(total: number) {
		this.setState({
			savingPotTotal: total
		});
	}

	async loadAccount() {
		this.setState({
			bankAccount: await getAccount(this.props.match.params.accountId),
			accountTotal: await getLatestAccountTotal(this.props.match.params.accountId, this.state.dateFrom, this.state.dateTo),
			transactionHistory: {
				records: await getAccountTransactions(this.props.match.params.accountId, this.state.dateFrom, this.state.dateTo, this.state.transactionHistory.page, this.state.transactionHistory.perPage),
				total: await getAccountTransactionsTotal(this.props.match.params.accountId, this.state.dateFrom, this.state.dateTo),
				page: this.state.transactionHistory.page,
				perPage: this.state.transactionHistory.perPage
			}
		});
	}

	async updateTransactionHistoryPage(page: number) {
		this.setState({
			transactionHistory: {
				records: await getAccountTransactions(this.props.match.params.accountId, this.state.dateFrom, this.state.dateTo, page, this.state.transactionHistory.perPage),
				total: this.state.transactionHistory.total,
				page: page,
				perPage: this.state.transactionHistory.perPage
			}
		});
	}

	render() {
		if (this.state.bankAccount === null && this.state.bankAccount !== undefined) {
			return <Error404 />;
		} else {

			let transactions = this.state.transactionHistory;
			
			return <LoggedInTemplate title={this.state.bankAccount !== undefined ? this.state.bankAccount.Name : "Loading..."} chart={<BankTotalPanel forceRefresh={false} />} breadcrumb={[{link: '/banks', text: 'Bank accounts'}, {link: '', text: (this.state.bankAccount !== undefined ? this.state.bankAccount.Name : "Loading...")}]}>
				{this.state.bankAccount === undefined ? <p>Loading...</p> : <>
					<div className="max-w-7xl mx-auto -mt-8">
						<div className="flex flex-wrap items-start flex-row justify-between bg-white rounded-xl p-10">
							<p className="flex items-center justify-center font-bold cursor-pointer" onClick={this.previousMonth}>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
								<span className="hidden md:inline-block md:ml-2">
									<Moment format="MMM YYYY" subtract={{months: 1}}>
										{this.state.date}
									</Moment>
								</span>
							</p> 
							<div className="flex items-center justify-center font-bold">
								<p>
									<Moment format="MMM YYYY">
										{this.state.date}
									</Moment>
								</p>
							</div>
							<p className="flex items-center justify-center font-bold cursor-pointer" onClick={this.nextMonth}>
								<span className="hidden md:inline-block md:mr-2">
									<Moment format="MMM YYYY" add={{months: 1}}>
										{this.state.date}
									</Moment>
								</span>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							</p> 
						</div>
					</div>
					{/* <AccountNavigation date={this.state.date} /> */}
					<div className="max-w-7xl mx-auto mt-10 flex flex-wrap pl-5 pr-5 lg:pl-0 lg:pr-0">
						<div className="w-full md:w-6/12 md:pr-5">
							<div className={(this.state.accountTotal >= 0 ? "bg-green-600" : "bg-red-600") + " p-10 mb-5 text-white rounded-xl shadow-lg border text-center"}>
								<p className="font-bold">Total</p>
								<p className="text-4xl font-bold"><FormatCurrency value={this.state.accountTotal} /></p>
							</div>
							{/* <CurrentAccountTotal total={this.state.total} /> */}
						</div>
						<div className="w-full md:w-6/12 md:pl-5">
							<div className="p-10 mb-5 bg-green-600 text-white rounded-xl shadow-lg border text-center">
								<p className="font-bold">Total excluding savings and bills</p>
								<p className="text-4xl font-bold"><FormatCurrency value={this.state.accountTotal - this.state.plannedTransactionsTotal - this.state.savingPotTotal} /></p>
							</div>
							{/* <AccountTotalExcludingBills total={this.state.totalMinusBills} /> */}
						</div>
					</div>
					<div className="max-w-7xl mx-auto mt-5 flex flex-wrap pl-5 pr-5 lg:pl-0 lg:pr-0">
						<div className="w-full md:w-6/12">
							<div className="md:pr-5">
								<div className="p-10 mb-10 bg-white rounded-xl shadow-lg border">
									<PlannedTransactionsPanel accountId={this.state.bankAccount.id} dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} setPlannedTransactionsTotal={this.setPlannedTransactionsTotal} />
								</div>
							</div>
						</div>
						<div className="w-full md:w-6/12 mb-10">
							<div className="md:pl-5">
								<div className="p-10 bg-white rounded-xl shadow-lg border">
									<SavingsTotalsPanel accountId={this.state.bankAccount.id} dateTo={this.state.dateTo} setSavingsPotsTotal={this.setSavingsPotsTotal} />
								</div>
							</div>
						</div>
					</div>
					<div className="max-w-7xl mx-auto mt-10 flex flex-wrap pl-5 pr-5 lg:pl-0 lg:pr-0">
						<div className="w-full">
							<div className="p-10 bg-white rounded-xl shadow-lg border">
								<div className="flex justify-between">
									<h2 className="font-bold text-2xl mb-5">Transaction history</h2>
									<div className="flex">
										<a href="/banks/1" className="mr-5 text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></a>
										<a href="/banks/1" className="text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg></a>
									</div>
								</div>

								{transactions !== undefined && transactions !== null && transactions.records.length > 0 ? transactions.records.map((transaction) => {
									return <Transaction 
										key={'transaction-' + transaction.id}
										id={transaction.id}
										iconType={transaction.transaction_category.Code} 
										date={transaction.DateTime} 
										description={transaction.Description}
										transactionCategory={transaction.transaction_category.Name}
										bank={transaction.bank_account.Bank.Name}
										account={transaction.bank_account.Name}
										value={transaction.Amount} />;
								}) : <p>No transactions found</p>}

								<Pagination 
									key={'account-view-transaction-history-pagination'}
									totalResults={this.state.transactionHistory.total} 
									perPage={this.state.transactionHistory.perPage} 
									page={this.state.transactionHistory.page} callback={this.updateTransactionHistoryPage} />
							</div>
						</div>
					</div></>}
			</LoggedInTemplate>;
		}
	}
}

export default ViewAccount;
