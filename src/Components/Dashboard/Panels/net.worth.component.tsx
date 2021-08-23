import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface INetWorthPanelProps {
}

interface INetWorthPanelState {
	data: Array<{}>
}

class NetWorthPanel extends React.Component<INetWorthPanelProps, INetWorthPanelState> {

	constructor(props: {}) {
		super(props);

		this.state = {
			data : [
				{
				  "id": "hack",
				  "label": "hack",
				  "value": 307,
				  "color": "hsl(20, 70%, 50%)"
				},
				{
				  "id": "php",
				  "label": "php",
				  "value": 350,
				  "color": "hsl(99, 70%, 50%)"
				},
				{
				  "id": "css",
				  "label": "css",
				  "value": 117,
				  "color": "hsl(46, 70%, 50%)"
				},
				{
				  "id": "elixir",
				  "label": "elixir",
				  "value": 454,
				  "color": "hsl(75, 70%, 50%)"
				},
				{
				  "id": "python",
				  "label": "python",
				  "value": 320,
				  "color": "hsl(18, 70%, 50%)"
				}
			  ]
		};
	}

	render() {
		return <div className="h-96"><ResponsivePie
			data={this.state.data}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			colors={{ scheme: 'nivo' }}
			borderWidth={1}
			borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
			enableArcLabels={false}
			legends={[
				{
					anchor: 'bottom',
					direction: 'row',
					justify: false,
					translateX: 0,
					translateY: 56,
					itemsSpacing: 0,
					itemWidth: 100,
					itemHeight: 18,
					itemTextColor: '#999',
					itemDirection: 'left-to-right',
					itemOpacity: 1,
					symbolSize: 18,
					symbolShape: 'circle',
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000'
							}
						}
					]
				}
			]}
		/></div>
	}
};

export default NetWorthPanel;
