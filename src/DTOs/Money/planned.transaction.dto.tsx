export interface IPlannedTransaction {
	id: string;
	Name: string;
	Amount: number;
	Processed: boolean;
	Date: string;
	createdAt : string;
	bank_account : {
		id: string;
		Name: string;
		Bank: {
			Name: string;
		}
	};
	transaction_category : {
		id: string;
		Name: string;
		Code: string;
	};
	savings_pot: {
		id: string;
		Name: string;
		// Amount: number;
		// Date: string;
	}
}

export interface IPlannedTransactionCreateInput {
	Name: string;
	Amount: number;
	Processed: boolean;
	Date: string;
	bank_account : string;
	transaction_category : string;
	savings_pot: string | null;
}