import axios from "axios";
import { IPlannedTransaction } from '../../DTOs/Money/planned.transaction.dto';

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
						Name, 
						Bank {
							Name
						}
					}, 
					transaction_category {
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
						Name, 
						Bank {
							Name
						}
					}, 
					transaction_category {
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

export async function getPlannedTransactionsTotal(accountId: string, date: string): Promise<number> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { plannedTransactionsConnection(where: {Processed: false, bank_account: "` + accountId + `", Date_lt: "` + date + `"}) {
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