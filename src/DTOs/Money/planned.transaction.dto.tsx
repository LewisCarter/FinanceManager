export interface IPlannedTransaction {
    id: string;
    Name: string;
    Amount: number;
    Processed: boolean;
    Date: string;
    createdAt : string;
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