import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { getBankListingChartTotals } from '../../../../../../DAOs/Money/transaction.totals.dao';

interface IBankTotalPanelProps {
	refresh: boolean;
}

export const BankTotalPanel = (props: IBankTotalPanelProps) => {

	const [data, setData] = useState<Array<{ x: string; y: number; }>>([]);

	useEffect(() => {
		getBankListingChartTotals().then((result: {x: string; y: number;}[]) => {
			setData(result);
		})
	}, [props.refresh]);

	return <div className="h-72 w-full mt-10">
		<ResponsiveLine
			data={[{
				id: "bank-totals",
				data: data
			}]}
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



// class BankTotalPanel extends React.Component<IBankTotalPanelProps, IBankTotalPanelState> {

// 	constructor(props: IBankTotalPanelProps) {
// 		super(props);

// 		this.state = {
// 			"id": "bank-totals",
// 			"data": [],
// 			"refresh": false
// 		};
// 	}

// 	componentDidMount() {
// 		this.getData();
// 	}

// 	componentDidUpdate(prevProps: IBankTotalPanelProps, preState: IBankTotalPanelState) {
// 		if (this.props.refresh && !prevProps.refresh) {
// 			this.setState({
// 				refresh: true
// 			});
// 		}
// 	}

// 	async getData() {
// 		this.setState({
// 			data: await getBankListingChartTotals()
// 		});
// 	}

// 	render() {
// 		return <div className="h-72 w-full mt-10">
// 			<ResponsiveLine
// 				data={[this.state]}
// 				margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
// 				xScale={{ type: 'point' }}
// 				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
// 				yFormat=" >-.2f"
// 				curve="cardinal"
// 				axisTop={null}
// 				axisRight={null}
// 				axisBottom={null}
// 				axisLeft={null}
// 				colors="rgb(6, 78, 59)"
// 				enableGridX={false}
// 				enableGridY={false}
// 				lineWidth={5}
// 				enablePoints={false}
// 				pointSize={10}
// 				pointColor="rgb(6, 78, 59)"
// 				pointBorderWidth={2}
// 				pointBorderColor="rgb(6, 78, 59)"
// 				pointLabelYOffset={-12}
// 				useMesh={true}
// 				legends={[]} />
// 	  </div>
// 	}
// };

// export default BankTotalPanel;
