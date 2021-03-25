import { IRecentTransaction } from './recent.transaction.dto';
import { IPlannedTransaction } from './planned.transaction.dto';

export interface IAccountListingProps {
}

export interface IAccountListingState {
	accounts: Array<{
		id: string,
		Name: string,
		Total: number,
		Bank: {
			Name: string
		}
	}>;
	recentTransactions: Array<IRecentTransaction>;
	plannedTransactions: Array<IPlannedTransaction>;
	errors?: Array<{id:string, message: string}>;
	openNewAccountModal: boolean;
	closeNewAccountModal: boolean;
}