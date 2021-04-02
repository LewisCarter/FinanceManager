import React from 'react';
import LoggedInHeader from './header.component';
import LoggedInFooter from './footer.component';

interface ILoggedInTemplateProps {
	title: string;
	chart?: any;
	breadcrumb?: Array<{
		link: string;
		text: string;
	}>;
}

export const LoggedInTemplate: React.FunctionComponent<ILoggedInTemplateProps> = (props) => {
	return <>
		<LoggedInHeader title={props.title} chart={props.chart} breadcrumb={props.breadcrumb} />
			{props.children}
		<LoggedInFooter />
	</>;
}

// class LoggedInTemplate extends React.Component<ILoggedInTemplateProps, ILoggedInTemplateState> {
// 	render() {
// 		return <>
// 			<LoggedInHeader title={this.props.title} chart={this.props.chart} breadcrumb={this.props.breadcrumb} />
// 				{this.props.children}
// 			<LoggedInFooter />
// 		</>;
// 	}
// }

// export default LoggedInTemplate;
