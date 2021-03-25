export interface IRecentTransaction {
    id: string;
    Description: string;
    Amount: number;
    DateTime : string;
    bank_account : {
        Name: string;
        Bank: {
            Name: string;
        }
    };
    transaction_category : {
        Name: string;
        Code: string;
    };
}