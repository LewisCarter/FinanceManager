import React from 'react';
import MainNav from './Header/main.nav.component';
import { Breadcrumb } from './Header/breadcrumb.component';

interface ILoggedInHeaderProps {
	title: string;
	chart: any;
	breadcrumb?: Array<{
		link: string;
		text: string;
	}>;
}

interface ILoggedInHeaderState {
}

class LoggedInHeader extends React.Component<ILoggedInHeaderProps, ILoggedInHeaderState> {
	render() {
		return <>
		<div className="bg-green-300">	
			<div className="py-12 px-4 lg:px-8 flex flex-row items-start justify-between">
				<h1 className="text-3xl font-extrabold text-gray-700">
					home<span className="text-red-900">.</span>
				</h1>

				<MainNav />
			</div>
			{this.props.chart}
			<div className="flex flex-col justify-center text-center mt-20 pb-20">
				{this.props.title ? <h1 className="text-5xl md:text-7xl font-bold text-gray-700 pl-5 pr-5">{this.props.title}</h1> : ''}
				<Breadcrumb items={this.props.breadcrumb} />
			</div>
		</div></>;
	}
}

export default LoggedInHeader;
