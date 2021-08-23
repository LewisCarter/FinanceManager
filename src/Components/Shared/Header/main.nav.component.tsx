import React from 'react';
import { NavLink } from 'react-router-dom';
// import Notifications from './notifications.component';
import UserMenu from './user.menu.component';

interface IMainNavProps {}
interface IMainNavState {
	showMenu: boolean;
}

class MainNav extends React.Component<IMainNavProps, IMainNavState> {

	constructor(props: IMainNavProps) {
		super(props);

		this.state = {
			showMenu: false
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		this.setState({
			showMenu: !this.state.showMenu
		})
	}
	
	render() {
		return <>
			
			<ul className={'mt-1 lg:flex lg:flex-row absolute lg:relative w-full lg:w-auto left-0 top-20 lg:top-auto lg:left-auto bg-green-300 pt-10 pl-10 pr-10 pb-10 lg:p-0 z-10 transition-all' + (this.state.showMenu ? "" : " hidden")}>
				<li>
					<NavLink exact to="/" className="flex text-gray-700 hover:bg-gray-600 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium" activeClassName="flex bg-gray-700 text-green-300 px-3 py-2 rounded-md text-sm font-medium">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
						<span className="mt-0.5 ml-2">dashboard</span>
					</NavLink>
				</li>
				<li className="lg:pl-7 mt-2 lg:mt-0">
					<NavLink to="/banks" className="flex text-gray-700 hover:bg-gray-600 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium" activeClassName="flex bg-gray-700 text-green-300 px-3 py-2 rounded-md text-sm font-medium">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<span className="mt-0.5 ml-2">money</span>
					</NavLink>
				</li>
				{/*<li className="lg:pl-7 mt-2 lg:mt-0">*/}
				{/*	<NavLink to="/property" className="flex text-gray-700 hover:bg-gray-600 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium" activeClassName="flex bg-gray-700 text-green-300 px-3 py-2 rounded-md text-sm font-medium">*/}
				{/*		<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>*/}
				{/*		<span className="mt-0.5 ml-2">property</span>*/}
				{/*	</NavLink>*/}
				{/*</li>*/}
				{/*<li className="lg:pl-7 mt-2 lg:mt-0">*/}
				{/*	<NavLink to="/pensions" className="flex text-gray-700 hover:bg-gray-600 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium" activeClassName="flex bg-gray-700 text-green-300 px-3 py-2 rounded-md text-sm font-medium">*/}
				{/*		<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>*/}
				{/*		<span className="mt-0.5 ml-2">pensions</span>*/}
				{/*	</NavLink>*/}
				{/*</li>*/}
				{/*<li className="lg:pl-7 mt-2 lg:mt-0">*/}
				{/*	<NavLink to="/investments" className="flex text-gray-700 hover:bg-gray-600 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium" activeClassName="flex bg-gray-700 text-green-300 px-3 py-2 rounded-md text-sm font-medium">*/}
				{/*		<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>*/}
				{/*		<span className="mt-0.5 ml-2">investments</span>*/}
				{/*	</NavLink>*/}
				{/*</li>*/}
				{/*<li className="lg:hidden sm:visible">*/}

				{/*</li>*/}
			</ul>
			<div className={"flex flex-row"}>
				<div className={"flex flex-row"}>
					{/*<Notifications />*/}
					<UserMenu />
				</div>
				<span className="lg:hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-3 pt-1" onClick={(e) => this.onClick(e)}>
					<svg className={"w-6 h-6" + (this.state.showMenu ? " hidden" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
					<svg className={"w-6 h-6" + (this.state.showMenu ? "" : " hidden")} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
				</span>
			</div>
		</>
	}
}

export default MainNav;