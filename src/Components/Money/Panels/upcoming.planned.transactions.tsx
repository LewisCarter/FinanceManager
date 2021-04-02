import { useEffect, useState } from 'react';
import { getUpcomingPlannedTransactions } from '../../../DAOs/Money/planned.transaction.dao';
import { IPlannedTransaction } from '../../../DTOs/Money/planned.transaction.dto';
import { PlannedTransaction } from '../Components/planned.transaction';

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
		{transactions.length > 0 ? transactions.map((transaction) => {
			return <PlannedTransaction 
				id={transaction.id}
				processed={transaction.Processed}
				date={transaction.Date} 
				name={transaction.Name}
				transactionCategoryCode={transaction.transaction_category.Code} 
				transactionCategoryName={transaction.transaction_category.Name}
				bankName={transaction.bank_account.Bank.Name}
				bankAccountName={transaction.bank_account.Name}
				amount={transaction.Amount}
				refreshCallback={props.refreshCallback} />;
		}) : <p>No upcoming transactions found.</p>}
	</div>
}