import React from 'react';
import { Link } from 'react-router-dom';
import LoggedInTemplate from '../Shared/loggedin.component';
import BankTotalPanel from './Panels/banks.listing.total.chart.component';
import { UpcomingPlannedTransactions } from './Panels/upcoming.planned.transactions';
import { RecentTransactions } from './Panels/recent.transactions';
import { getUpcomingPlannedTransactions } from '../../DAOs/Money/planned.transaction.dao';
import { getRecentTransactions } from '../../DAOs/Money/transactions.dao';
import { getAccounts } from '../../DAOs/Money/accounts.dao';
import { getLatestAccountTotal } from '../../DAOs/Money/transaction.totals.dao';
import { IAccountListingProps, IAccountListingState } from '../../DTOs/Money/banks.listing.dto';
import { IAccount } from '../../DTOs/Money/account.dto';
import moment from 'moment';
import Modal from '../Shared/Components/modal.component';
import NewBankAccount from './Components/Forms/new.bank.account';
import BankAccount from './Components/bank.account.component';

class BanksListing extends React.Component<IAccountListingProps, IAccountListingState> {

	constructor(props: {}) {
		super(props);

		this.state = {
			accounts: [],
			recentTransactions: [],
			plannedTransactions: [],
			errors: [],
			openNewAccountModal: false,
			closeNewAccountModal: false
		};

		this.getAccounts = this.getAccounts.bind(this);
		this.newAccountModal = this.newAccountModal.bind(this);
		this.newAccountSuccess = this.newAccountSuccess.bind(this);
	}

	async getAccounts() {
		const dateFrom = moment().date(25);
		const dateTo = moment().date(25);

		const dateFromISO = (dateFrom.toDate().getDay() < 25) ? dateFrom.subtract({months: 1}).toISOString() : dateFrom.toISOString();
		const dateToISO = (dateTo.toDate().getDay() >= 25) ? dateTo.add({months: 1}).toISOString() : dateTo.toISOString();
		
		getAccounts().then((accounts) => {
			accounts.map((account: IAccount, idx: number) => {
				getLatestAccountTotal(account.id, dateFromISO, dateToISO).then((total: number) => {
					accounts[idx].Total = total;

					this.setState({
						accounts: accounts
					});
				});
				
				return true;
			});
		})
	}

	async getRecentTransactions() {
		this.setState({
			recentTransactions: await getRecentTransactions()
		});
	}

	async getUpcomingPlannedTransactions() {
		this.setState({
			plannedTransactions: await getUpcomingPlannedTransactions()
		});
	}

	componentDidMount() {
		this.getAccounts();
		this.getRecentTransactions();
		this.getUpcomingPlannedTransactions();
	}

	componentDidUpdate(prevProps: IAccountListingProps, prevState: IAccountListingState) {
		if (this.state.openNewAccountModal !== prevState.openNewAccountModal && this.state.openNewAccountModal) {
			this.setState({
				openNewAccountModal: false
			});
		}
		if (this.state.closeNewAccountModal !== prevState.closeNewAccountModal && this.state.closeNewAccountModal) {
			this.setState({
				closeNewAccountModal: false
			});
		}
	}

	newAccountModal(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		e.preventDefault();
		this.setState({
			openNewAccountModal: true
		});
	}

	newAccountSuccess(newAccount: IAccount) {
		let accounts = this.state.accounts;
		newAccount.Total = 0;
		accounts.push(newAccount);
		this.setState({
			accounts: accounts,
			openNewAccountModal: false,
			closeNewAccountModal: true
		});
	}

	render() {
		return <LoggedInTemplate title="bank accounts" chart={<BankTotalPanel/>}>
			<div className="max-w-7xl mx-auto -mt-8">
				<div className="flex flex-wrap items-start flex-row">
					{this.state.accounts !== undefined && this.state.accounts !== null && this.state.accounts.length > 0 ? this.state.accounts.map((account) => {
						return <BankAccount account={account} key={'account-' + account.id} />
					}) : ''}
					<div className="w-full md:w-3/12 pl-5 pr-5 flex justify-center mb-10">
						<Link to={'#'} className="flex flex-col items-center justify-center w-full rounded-xl shadow-lg bg-white  pl-5 pr-5 pt-8 pb-8 hover:bg-gray-100" onClick={(e) => {this.newAccountModal(e)}}>
							<h2 className="text-2xl font-bold flex flex-col text-center text-green-700">
								New account <svg className="w-6 h-6 ml-auto mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							</h2>
						</Link> 
					</div>
				</div>
			</div>
			<Modal open={this.state.openNewAccountModal} forceClose={this.state.closeNewAccountModal}>
				<NewBankAccount successCallback={this.newAccountSuccess} />
			</Modal>
			<div className="max-w-7xl mx-auto mt-10 flex flex-wrap">
				<div className="w-full md:w-6/12">
					<div className="pl-5 pr-5">
						<RecentTransactions transactions={this.state.recentTransactions} />
					</div>
				</div>
				<div className="w-full md:w-6/12 mb-10">
					<div className="pl-5 pr-5">
						<UpcomingPlannedTransactions transactions={this.state.plannedTransactions} />
					</div>
				</div>
			</div>
        </LoggedInTemplate>;
	}
}

export default BanksListing;
