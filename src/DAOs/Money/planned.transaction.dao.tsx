import axios from "axios";
import { IPlannedTransaction, IPlannedTransactionCreateInput } from '../../DTOs/Money/planned.transaction.dto';
import { IReccuringTransaction } from '../../DTOs/Money/recurring.transaction.dto';
import { getRecurringTransactions } from '../../DAOs/Money/recurring.transaction.dao';
import moment from 'moment';

export async function getUpcomingPlannedTransactions(limit=5) {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
				plannedTransactions(sort: "Date:ASC", limit: ` + limit + `, where: {Processed:false, bank_account_null:false}) {
					id, 
					Name, 
					Amount, 
					Date,
					Processed,
					createdAt, 
					bank_account {
						id,
						Name, 
						Bank {
							Name
						}
					}, 
					transaction_category {
						id,
						Name,
						Code
					}
				}
			}`
		}
	}).then(response => {
		console.log('Successfully loaded upcoming planned transactions...');
		return response.data.data.plannedTransactions;
	}).catch(response => {
		console.log('Error loading upcoming planned transactions...');
		// TODO: Do something with the errors
		return [];
	});
}


export async function getPlannedTransactions(accountId: string, dateFrom: string, dateTo: string): Promise<IPlannedTransaction[]> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
				plannedTransactions(sort: "Date:ASC", where: {bank_account:"` + accountId + `", Date_gte: "` + dateFrom + `", Date_lt: "` + dateTo + `"}) {
					id, 
					Name, 
					Amount, 
					Date,
					Processed
					createdAt, 
					bank_account {
						id,
						Name, 
						Bank {
							Name
						}
					}, 
					transaction_category {
						id,
						Name,
						Code
					}
				}
			}`
		}
	}).then(response => {
		return response.data.data.plannedTransactions;
	}).catch(response => {
		console.log('Error loading upcoming planned transactions...');
		// TODO: Do something with the errors
		return [];
	});
}

export async function getPlannedTransactionsTotal(accountId: string, dateFrom: string | null, dateTo: string): Promise<number> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { plannedTransactionsConnection(where: {Processed: false, bank_account: "` + accountId + `"` + (dateFrom !== null ? `, Date_gte: "` + dateFrom + `"`: ``) + `, Date_lt: "` + dateTo + `"}) {
				aggregate {
				  sum {
					  Amount
				  }
				}
			}}`
		}
	}).then(response => {
		if (response.data.data.plannedTransactionsConnection.aggregate.sum.Amount !== null) {
			return response.data.data.plannedTransactionsConnection.aggregate.sum.Amount;
		} else {
			return 0;
		}
	}).catch(response => {
		console.log('Error loading recent transactions...');
		// TODO: Do something with the errors
		return 0;
	});
}

export async function createPlannedTransaction(plannedTransaction: IPlannedTransactionCreateInput): Promise<IPlannedTransaction> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `mutation {
				createPlannedTransaction(input: { data: {
					Name: "` + plannedTransaction.Name + `",
					Amount: ` + plannedTransaction.Amount + `,
					Processed: ` + plannedTransaction.Processed + `,
					Date: "` + moment(plannedTransaction.Date).format('YYYY-MM-DD') + `",
					bank_account: "` + plannedTransaction.bank_account + `",
					transaction_category: "` + plannedTransaction.transaction_category + `"
				}}) {
					plannedTransaction {
						id, 
						Name, 
						Amount, 
						Date,
						Processed
						createdAt, 
						bank_account {
							id,
							Name, 
							Bank {
								Name
							}
						}, 
						transaction_category {
							id,
							Name,
							Code
						}
					}
				}
			  }`
		}
	}).then(response => {
		return response.data.data.createPlannedTransaction.plannedTransaction;
	}).catch(response => {
		console.log('Error creating planned transaction...');
		// TODO: Do something with the errors
		return null;
	});
}

export async function initiateRecurringTransactions(accountId: string, dateFrom: string): Promise<IPlannedTransaction[]> {
	return getRecurringTransactions(accountId).then((recurringTransactions: IReccuringTransaction[]) => {
		let plannedTransactions: Array<Promise<IPlannedTransaction>> = recurringTransactions.map((recurringTransaction: IReccuringTransaction) => {

			const date = recurringTransaction.DayOfTheMonth < 25 ? moment(dateFrom).add({months: 1}).date(recurringTransaction.DayOfTheMonth) : moment(dateFrom).date(recurringTransaction.DayOfTheMonth);

			let plannedTransactionInput: IPlannedTransactionCreateInput = {
				Name: recurringTransaction.Name,
				Amount: recurringTransaction.Amount,
				Processed: false,
				Date: date.format("YYYY-MM-DD"),
				bank_account: recurringTransaction.bank_account.id,
				transaction_category: recurringTransaction.transaction_category.id,
				savings_pot: "" // TODO: add savings pots to recurring transactions
			}
			return createPlannedTransaction(plannedTransactionInput);
		});
		return plannedTransactions;
	}).then((plannedTransactions) => {
		return Promise.all(plannedTransactions);
	}).catch(response => {
		console.log('Error creating initiating recurring transactions...');
		// TODO: Do something with the errors
		return [];
	});
}

export async function processPlannedTransaction(accountId: string, processed: boolean) {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `mutation {
				updatePlannedTransaction(input:{
					where: {id: "` + accountId + `"}
					data: {Processed: ` + processed + `}
				}) {
					plannedTransaction {
						id, 
						Name, 
						Amount, 
						Date,
						Processed
						createdAt, 
						bank_account {
							id,
							Name, 
							Bank {
								Name
							}
						}, 
						transaction_category {
							id,
							Name,
							Code
						}
					}
				}
			}`
		}
	}).then(response => {
		return response.data.data.updatePlannedTransaction.plannedTransaction;
	}).catch(response => {
		console.log('Error processing planned transaction...');
		// TODO: Do something with the errors
		return null;
	});
}