import {useEffect, useState } from 'react';
import { LoggedInTemplate } from '../../../Shared/loggedin.component';
import { UpcomingPlannedTransactions } from './Components/UpcomingPlannedTransactions/upcoming.planned.transactions';
import { RecentTransactions } from './Components/RecentTransactions/recent.transactions';
import { ListBankAccounts } from './Components/ListBankAccounts/list.bank.accounts';
import { BankTotalPanel } from './Components/TotalsChart/banks.listing.total.chart.component';

export const BanksListing = (props: {}) => {

	const [refresh, setRefresh] = useState<boolean>(false);

	useEffect(() => {
		setRefresh(false);
	}, [refresh]);

	return <LoggedInTemplate title="bank accounts" chart={<BankTotalPanel refresh={refresh} />}>
		<ListBankAccounts refreshCallback={setRefresh} />
		<div className="max-w-7xl mx-auto mt-10 flex flex-wrap">
			<div className="w-full md:w-6/12">
				<div className="pl-5 pr-5">
					<RecentTransactions refresh={refresh} />
				</div>
			</div>
			<div className="w-full md:w-6/12 mb-10">
				<div className="pl-5 pr-5">
					<UpcomingPlannedTransactions refresh={refresh} refreshCallback={setRefresh} />
				</div>
			</div>
		</div>
	</LoggedInTemplate>
};