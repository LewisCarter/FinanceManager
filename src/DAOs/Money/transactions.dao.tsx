import axios from "axios";
import { ITransaction } from "../../DTOs/Money/transaction.dto";

export async function getRecentTransactions(limit:number=5) {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
				transactions(sort: "DateTime:DESC", limit: ` + limit + `) {
					id, 
					Description, 
					Amount, 
					DateTime, 
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
		return response.data.data.transactions;
	}).catch(response => {
		console.log('Error loading recent transactions...');
		// TODO: Do something with the errors
		return [];
	});
}

export async function getAccountTransactions(id:string, dateFrom: string, dateTo: string, page:number=1, limit:number=10): Promise<Array<ITransaction>> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
				transactions(where: {bank_account:"` + id + `", DateTime_gte: "` + dateFrom + `", DateTime_lt: "` + dateTo + `"}, sort: "DateTime:DESC", limit: ` + limit + `, start: ` + (page-1) * limit + `) {
					id, 
					Description, 
					Amount, 
					DateTime, 
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
		return response.data.data.transactions;
	}).catch(response => {
		console.log('Error loading recent transactions...');
		// TODO: Do something with the errors
		return [];
	});
}

export async function getAccountTransactionsTotal(id:string, dateFrom: string, dateTo: string): Promise<number> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { transactionsConnection(where: {bank_account: "` + id + `", DateTime_gte: "` + dateFrom + `", DateTime_lt: "` + dateTo + `"}) {
				aggregate {
				  count
				}
			}}`
		}
	}).then(response => {
		if (response.data.data.transactionsConnection.aggregate.count !== null) {
			return response.data.data.transactionsConnection.aggregate.count;
		} else {
			return 0;
		}
	}).catch(response => {
		console.log('Error loading recent transactions...');
		// TODO: Do something with the errors
		return 0;
	});
}