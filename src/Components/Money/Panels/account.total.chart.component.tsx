import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { getAccountChartTotals } from '../../../DAOs/Money/transaction.totals.dao';

interface IAccountTotalPanelProps {
    accountId: string;
    date: string;
	forceRefresh: boolean;
}

interface IAccountTotalPanelState {
	id: string,
	data: Array<{
		x: string;
		y: number;
	}>;
	refresh: boolean;
}

class AccountTotalPanel extends React.Component<IAccountTotalPanelProps, IAccountTotalPanelState> {

	constructor(props: IAccountTotalPanelProps) {
		super(props);

		this.state = {
			"id": "bank-totals",
			"data": [],
			"refresh": false
		};
	}

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps: IAccountTotalPanelProps, preState: IAccountTotalPanelState) {
		if (this.props.accountId !== prevProps.accountId || this.props.date !== prevProps.date) {
			this.getData();
		}
	}

	async getData() {
		this.setState({
			data: await getAccountChartTotals(this.props.accountId, this.props.date)
		});
	}

	render() {
		return <div className="h-72 w-full mt-10">
			<ResponsiveLine
				data={[this.state]}
				margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
				yFormat=" >-.2f"
				curve="cardinal"
				axisTop={null}
				axisRight={null}
				axisBottom={null}
				axisLeft={null}
				colors="rgb(6, 78, 59)"
				enableGridX={false}
				enableGridY={false}
				lineWidth={5}
				enablePoints={false}
				pointSize={10}
				pointColor="rgb(6, 78, 59)"
				pointBorderWidth={2}
				pointBorderColor="rgb(6, 78, 59)"
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[]} />
	  </div>
	}
};

export default AccountTotalPanel;
