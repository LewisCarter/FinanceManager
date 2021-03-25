export interface IAccount {
	id: string;
	Name: string;
	Total: number;
	Bank: {
		Name: string;
	}
}

export interface INewAccountFormValues {
	bank: string;
	newBank: string;
	name: string;
	description: string;
}