import Moment from 'react-moment';
export const AccountNavigation = (props: {
	date: moment.Moment,
	changeDate: Function,
}) => {
	return <>
		<p className="flex items-center justify-center font-bold cursor-pointer" onClick={() => props.changeDate(-1)}>
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
			<span className="hidden md:inline-block md:ml-2">
				<Moment format="MMM YYYY" subtract={{months: 1}}>
					{props.date}
				</Moment>
			</span>
		</p> 
		<div className="flex items-center justify-center font-bold">
			<p>
				<Moment format="MMM YYYY">
					{props.date}
				</Moment>
			</p>
		</div>
		<p className="flex items-center justify-center font-bold cursor-pointer" onClick={() => props.changeDate(1)}>
			<span className="hidden md:inline-block md:mr-2">
				<Moment format="MMM YYYY" add={{months: 1}}>
					{props.date}
				</Moment>
			</span>
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		</p> 
	</>
}