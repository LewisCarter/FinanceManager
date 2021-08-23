import { ISavingsPot } from './savings.pot.dto';
export interface IReccuringTransaction {
	id: string;
	Name: string;
	Amount: number;
	DayOfTheMonth: number;
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
	savings_pot : ISavingsPot
}

export interface IReccuringTransactionCreateInput {
	Name: string;
	Amount: number;
	DayOfTheMonth: number;
	bank_account : string;
	transaction_category : string;
}