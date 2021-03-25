import Moment from 'react-moment';
import { FormatCurrency } from '../../Shared/Number/format.currency';
import { Icon } from '../../Shared/Assets/icons';

interface ITransactionProps {
	id: string;
	iconType: string;
	date: string;
	description: string;
	transactionCategory: string;
	bank: string;
	account: string;
	value: number;
}

export function Transaction(props: ITransactionProps) {
	return <div className="flex border-b pt-5 pb-5 flex-col md:flex-row" key={'transaction'}>
		<div>
			<Icon type={props.iconType} />
		</div>
		<p className="md:pl-5 md:pr-5 font-bold min-w-max">
			<Moment format="DD/MM/YYYY">
				{props.date}
			</Moment>
		</p>
		<h5 className="md:pl-5 md:pr-5 w-full">
			{props.description}<br/>
			<small className="text-gray-500">{props.transactionCategory} - {props.bank} - {props.account}</small>
		</h5>
		<p className={props.value >= 0 ? 'text-green-500 min-w-max' : 'text-red-500 min-w-max'}>
			<FormatCurrency value={props.value} />
		</p>
	</div>
}