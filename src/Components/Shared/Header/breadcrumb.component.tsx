import React from 'react';
import { Link } from 'react-router-dom';

interface IBreadcrumbProps {
	items?: Array<{
		link: string;
		text: string;
	}>;
}

interface IBreadcrumbState {
}

class Breadcrumb extends React.Component<IBreadcrumbProps, IBreadcrumbState> {
	render() {
		let itemCount = -1;
		return <>
			{this.props.items !== undefined && this.props.items.length > 0 ? <ul className="flex justify-center content-evenly items-center mt-5 text-gray-600">
				{this.props.items.map((item) => {
					itemCount++;
					return itemCount > 0 ? <>
						<li className="mr-2 ml-2" key={'breadcrumb-sep-' + item.text}>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</li>
						<li key={'breadcrumb-' + item.text}>
							{item.link !== "" ? <Link to={item.link} key={'breadcrumb-' + item.text + '-link'}>{item.text}</Link> : item.text}
						</li></> : <li key={'breadcrumb-' + item.text}>
							{item.link !== "" ? <Link to={item.link} key={'breadcrumb-' + item.text + '-link'}>{item.text}</Link> : item.text}
						</li>
				})}
			</ul> : ''}
		</>
	}
}

export default Breadcrumb;