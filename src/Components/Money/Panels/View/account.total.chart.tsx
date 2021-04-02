import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { getAccountChartTotals } from '../../../../DAOs/Money/transaction.totals.dao';

export const AccountTotalsChart = (props: {
    accountId: string;
    dateTo: string;
    refresh: boolean;
}) => {

	const [data, setData] = useState<Array<{ x: string; y: number; }>>([]);

	useEffect(() => {
		getAccountChartTotals(props.accountId, props.dateTo).then((result: {x: string; y: number;}[]) => {
			setData(result);
		})
	}, [props.accountId, props.dateTo, props.refresh]);

	return <div className="h-72 w-full mt-10">
		<ResponsiveLine
			data={[{
				id: "account-totals",
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