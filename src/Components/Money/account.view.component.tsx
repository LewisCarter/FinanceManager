import {useState, useEffect} from 'react';
import { match } from 'react-router-dom';
import { getAccount } from '../../DAOs/Money/accounts.dao';
import { SavingsTotalsPanel } from './Panels/savings.totals.component';
import { LoggedInTemplate } from '../Shared/loggedin.component';
import { IAccount } from '../../DTOs/Money/account.dto';
import moment from 'moment';
import { Error404 } from '../Shared/Errors/404.component';
import { PlannedTransactionsPanel } from './Panels/planned.transaction.totals.component';
import { TransactionHistory } from './Panels/View/transaction.history';
import { AccountNavigation } from './Panels/View/account.navigation';
import { AccountTotal } from './Panels/View/account.total';
import { AccountTotalMinusBills } from './Panels/View/account.total.minus.bills';
import { AccountTotalsChart } from './Panels/View/account.total.chart';

export const ViewAccount = (props: {
	match: match<{accountId:string}>
}) => {

	const [bankAccount, setBankAccount] = useState<IAccount | null | undefined>(null);
	const [date, setDate] = useState<moment.Moment>((moment().date() < 25) ? moment().date(25) : moment().date(25).add({months: 1}));
	const [dateFrom, setDateFrom] = useState<string>(getDateFrom());
	const [dateTo, setDateTo] = useState<string>(getDateTo());
	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		getAccount(props.match.params.accountId).then((result: IAccount) => {
			setBankAccount(result);
		});

		setRefresh(false);
	}, [props.match.params.accountId, refresh]);

	function getDateFrom() {
		let d = moment(date);
		return (d.date() < 25) ? d.subtract({months: 2}).toISOString() : d.subtract({months: 1}).toISOString();
	}

	function getDateTo() {
		let d = moment(date);
		return (d.date() >= 25) ? d.toISOString() : d.add({months: 1}).toISOString();
	}

	function changeDate(increment: number) {
		setDate(date.add({months: increment}));
		setDateFrom(getDateFrom());
		setDateTo(getDateTo());
		setRefresh(true);
	}

	if (bankAccount === undefined) {
		return <Error404 />;
	} else {

		return <LoggedInTemplate title={bankAccount !== null ? bankAccount.Name : "Loading..."} chart={bankAccount !== null ? <AccountTotalsChart accountId={bankAccount?.id} dateTo={dateTo} refresh={false} /> : ""} breadcrumb={[{link: '/banks', text: 'Bank accounts'}, {link: '', text: (bankAccount !== null ? bankAccount.Name : "Loading...")}]}>
			{bankAccount === null ? <p>Loading...</p> : <>
				<div className="max-w-7xl mx-auto -mt-8">
					<div className="flex flex-wrap items-start flex-row justify-between bg-white rounded-xl p-10">
						<AccountNavigation date={date} changeDate={changeDate} />
					</div>
				</div>
				<div className="max-w-7xl mx-auto mt-10 flex flex-wrap pl-5 pr-5">
					<div className="w-full md:w-6/12 md:pr-5">
						<AccountTotal accountId={bankAccount.id} dateFrom={dateFrom} dateTo={dateTo} refresh={refresh} />
					</div>
					<div className="w-full md:w-6/12 md:pl-5">
						<AccountTotalMinusBills accountId={bankAccount.id} dateFrom={dateFrom} dateTo={dateTo} refresh={refresh} />
					</div>
				</div>
				<div className="max-w-7xl mx-auto mt-5 flex flex-wrap pl-5 pr-5">
					<div className="w-full md:w-6/12">
						<div className="md:pr-5">
							<div className="p-10 mb-10 bg-white rounded-xl shadow-lg border">
								<PlannedTransactionsPanel accountId={bankAccount.id} dateFrom={dateFrom} dateTo={dateTo} refresh={refresh} refreshCallback={setRefresh} />
							</div>
							<div className="w-full flex flex-col">
								<button className="self-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">Manage recurring transactions</button>
							</div>
						</div>
					</div>
					<div className="w-full md:w-6/12 mb-10">
						<div className="md:pl-5">
							<div className="p-10 bg-white rounded-xl shadow-lg border">
								<SavingsTotalsPanel accountId={bankAccount.id} dateTo={dateTo} refresh={refresh} />
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-7xl mx-auto mt-10 flex flex-wrap pl-5 pr-5">
					<div className="w-full">
						<div className="p-10 bg-white rounded-xl shadow-lg border">
							<TransactionHistory 
								accountId={bankAccount.id}
								dateTo={dateTo}
								dateFrom={dateFrom}
							/>
						</div>
					</div>
				</div></>}
		</LoggedInTemplate>;
	}

}