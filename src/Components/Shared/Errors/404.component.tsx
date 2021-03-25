import React from 'react';
import LoggedInTemplate from '../loggedin.component';

class Error404 extends React.Component {

	render() {
		return <>
			<LoggedInTemplate title="Page not found" chart="" breadcrumb={[{link: '', text: 'Error'}]}>
				<div className="max-w-7xl mx-auto -mt-8 bg-white rounded-xl p-10 shadow-lg mb-10 text-center">
					<p>Whoops! It looks like the page you've requested doesn't exist.</p>
				</div>
			</LoggedInTemplate>
		</>;
	}
}

export default Error404;
