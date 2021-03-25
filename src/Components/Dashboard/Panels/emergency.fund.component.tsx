import React from 'react';

class EmergencyFundPanel extends React.Component {

	render() {
		return <>
			<h2 className="text-3xl font-bold mb-4">&pound;7,200.00 emergency fund</h2>
			<p className="text-gray-200">This would be enough to cover <span className="font-bold">4</span> months of expenses at <span className="font-bold">&pound;1,800.00</span> a month.</p>
		</>;
	}
}

export default EmergencyFundPanel;
