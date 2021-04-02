import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb = (props: {
	items?: Array<{
		link: string;
		text: string;
	}>;
}) => {
	let itemCount = -1;
		return <>
			{props.items !== undefined && props.items.length > 0 ? <ul className="flex justify-center content-evenly items-center mt-5 text-gray-600" key="breadcrumb-list">
				{props.items.map((item, idx) => {
					itemCount++;
					return itemCount > 0 ? <React.Fragment key={'breadcrumb-wrapper-' + idx}>
						<li className="mr-2 ml-2" key={'breadcrumb-sep-' + idx}>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" key={'breadcrumb-sep-svg-' + idx}>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" key={'breadcrumb-sep-svg-path-' + idx} />
							</svg>
						</li>
						<li key={'breadcrumb-' + idx}>
							{item.link !== "" ? <Link to={item.link} key={'breadcrumb-link-' + idx}>{item.text}</Link> : item.text}
						</li></React.Fragment> : <li key={'breadcrumb-' + idx}>
							{item.link !== "" ? <Link to={item.link} key={'breadcrumb-link-' + idx}>{item.text}</Link> : item.text}
						</li>
				})}
			</ul> : ''}
		</>
};