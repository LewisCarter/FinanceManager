import { IPlannedTransaction } from '../../../DTOs/Money/planned.transaction.dto';
import { PlannedTransaction } from '../Components/planned.transaction';

interface IUpcomingPlannedTransactionsProps {
	transactions: Array<IPlannedTransaction>
}

export function UpcomingPlannedTransactions(props: IUpcomingPlannedTransactionsProps) {
	return <div className="p-10 bg-white rounded-xl shadow-lg border">
		<h2 className="font-bold text-2xl mb-5">Upcoming planned transactions</h2>
		{props.transactions !== undefined && props.transactions !== null && props.transactions.length > 0 ? props.transactions.map((transaction) => {
			return <PlannedTransaction 
				id={transaction.id}
				processed={transaction.Processed}
				date={transaction.Date} 
				name={transaction.Name}
				transactionCategoryCode={transaction.transaction_category.Code} 
				transactionCategoryName={transaction.transaction_category.Name}
				bankName={transaction.bank_account.Bank.Name}
				bankAccountName={transaction.bank_account.Name}
				amount={transaction.Amount} />;
		}) : <p>No upcoming transactions found.</p>}
	</div>
}