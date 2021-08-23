import { Transaction } from '../../../Items/Transaction/transaction';
import { useEffect, useState } from 'react';
import { getRecentTransactions } from '../../../../../../DAOs/Money/transactions.dao';
import { ITransaction } from '../../../../../../DTOs/Money/transaction.dto';

interface IRecentTransactionsProps {
	refresh: boolean | null
}

export const RecentTransactions = (props: IRecentTransactionsProps) => {

	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	useEffect(() => {
		getRecentTransactions().then((result: ITransaction[]) => {
			setTransactions(result);
		})
		
	}, [props.refresh]);

	return <div className="p-10 mb-10 bg-white rounded-xl shadow-lg border">
		<h2 className="font-bold text-2xl mb-5">Recent transactions</h2>
		{transactions.length > 0 ? transactions.map((transaction) => {
			return <Transaction 
				key={'recent-transaction-' + transaction.id}
				id={transaction.id}
				iconType={transaction.transaction_category.Code} 
				date={transaction.DateTime} 
				description={transaction.Description}
				transactionCategory={transaction.transaction_category.Name}
				bank={transaction.bank_account.Bank.Name}
				account={transaction.bank_account.Name}
				value={transaction.Amount} />;
		}) : <p>No recent transactions found.</p>}
	</div>
}