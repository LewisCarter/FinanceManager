import { useEffect, useState } from 'react';
import { getUpcomingPlannedTransactions } from '../../../../../../DAOs/Money/planned.transaction.dao';
import { IPlannedTransaction } from '../../../../../../DTOs/Money/planned.transaction.dto';
import { PlannedTransaction } from '../../../Items/PlannedTransaction/planned.transaction';

interface IUpcomingPlannedTransactionsProps {
	refresh: boolean | null;
	refreshCallback: Function;
}

export const UpcomingPlannedTransactions = (props: IUpcomingPlannedTransactionsProps) => {
	
	const [transactions, setTransactions] = useState<IPlannedTransaction[]>([]);

	useEffect(() => {
		getUpcomingPlannedTransactions().then((result: IPlannedTransaction[]) => {
			setTransactions(result);
		})
		
	}, [props.refresh]);
	
	return <div className="p-10 bg-white rounded-xl shadow-lg border">
		<h2 className="font-bold text-2xl mb-5">Upcoming planned transactions</h2>
		{transactions.length > 0 ? transactions.map((transaction: IPlannedTransaction) => {
			return <PlannedTransaction 
				plannedTransaction={transaction}
				refreshCallback={props.refreshCallback} />;
		}) : <p>No upcoming transactions found.</p>}
	</div>
}