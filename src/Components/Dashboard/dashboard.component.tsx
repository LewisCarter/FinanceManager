import React from 'react';
import { LoggedInTemplate } from '../Shared/loggedin.component';
import NetWorthPanel from './Panels/net.worth.component';
import { SavingsTotalsPanel } from '../Money/Panels/savings.totals.component';
import EmergencyFundPanel from './Panels/emergency.fund.component';

interface IDashboardProps {}
interface IDashboardState {}

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {

	render() {
		return <>
			<LoggedInTemplate title="dashboard" chart="">
				<div className="max-w-7xl mx-auto -mt-8">
					<div className="flex flex-wrap items-start flex-row">
						<div className="w-full md:w-6/12 pl-5 pr-5 mb-10">
							<div className="bg-white rounded-xl p-10 shadow-lg mb-10">
								<NetWorthPanel />
							</div>
							<div className="bg-green-600 text-white text-center rounded-xl p-10 shadow-lg">
								<EmergencyFundPanel />
							</div>
						</div>
						<div className="w-full md:w-6/12 pl-5 pr-5">
							<div className="bg-white rounded-xl p-10 shadow-lg">
								<SavingsTotalsPanel accountId={null} dateTo={null} refresh={false} />
							</div>
						</div>
					</div>
				</div>
			</LoggedInTemplate>
		</>;
	}
}

export default Dashboard;
