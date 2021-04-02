import { Icon } from '../../Shared/Assets/icons';
import Moment from 'react-moment';
import { FormatCurrency } from '../../Shared/Number/format.currency';
import { processPlannedTransaction } from '../../../DAOs/Money/planned.transaction.dao';

export const PlannedTransaction = (props: {
	id: string;
	processed: boolean;
	name: string;
	amount: number;
	date: string;
	transactionCategoryCode: string;
	transactionCategoryName: string;
	bankName: string;
	bankAccountName: string;
	refreshCallback: Function;
}) => {

	function processTransaction(processed: boolean) {
		processPlannedTransaction(props.id, processed);
		props.refreshCallback(true);
	}

	return <div className="flex border-b pt-5 pb-5 flex-col md:flex-row" key={'planned-transaction-' + props.id}>
		<div className="min-w-max pr-5">
			{props.processed ? 
				<svg onClick={() => processTransaction(false)} className="w-6 h-6 text-green-700 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : 
				<svg onClick={() => processTransaction(true)} className="w-6 h-6 text-red-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
			}
		</div>
		<div>
			<Icon type={props.transactionCategoryCode} />
		</div>
		<p className="md:pl-5 md:pr-5 font-bold min-w-max">
			<Moment format="DD/MM/YYYY">
				{props.date}
			</Moment>
		</p>
		<h5 className="md:pl-5 md:pr-5 w-full">
			{props.name}<br/>
			<small className="text-gray-500">{props.transactionCategoryName} - {props.bankName} - {props.bankAccountName}</small>
		</h5>
		<p className={props.amount >= 0 ? 'text-green-500 min-w-max' : 'text-red-500 min-w-max'}>
			<FormatCurrency value={props.amount} />
		</p>
	</div>
}