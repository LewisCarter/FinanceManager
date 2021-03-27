import axios from 'axios';
import { ISavingsPot, ISavingsPotTotal } from '../../DTOs/Money/savings.pot.dto';

export async function getSavingsPots(): Promise<Array<ISavingsPot>> {
    return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query {
                savingsPots(sort: "Name:DESC") {
                	id,
                    Name,
                    Goal
                }
            }`
		}
	}).then(response => {
		return response.data.data.savingsPots;
	}).catch(response => {
		console.log('Error loading savings pots...');
		// TODO: Do something with the errors
		return [];
	});
}

export function getSavingsPotTotals(dateTo: string | null) {
	return axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { plannedTransactionsConnection(where: {bank_account_null: false, Processed: true` + (dateTo !== null ? `, Date_lt: "` + dateTo + `"` : ``) + `}) {
				groupBy {
					savings_pot {
						key
						connection {
							aggregate {
								sum {
									Amount
								}
							}
						}
					}
				}
				}
			}`
		}
	}).then((response) => {
		return response.data.data.plannedTransactionsConnection.groupBy.savings_pot;
	}).then((savingsPots) => {
		let potMap = new Map<string, number>();
		savingsPots.map((pot: ISavingsPotTotal) => {
			return potMap.set(pot.key, pot.connection.aggregate.sum.Amount);
		});
		return potMap;
	}).catch(response => {
		console.log('Error loading savings pots...');
		// TODO: Do something with the errors
		return new Map<string, number>();
	});
}


export function getSavingsPotTotalsForAccount(accountId: string, dateTo: string | null) {
	return axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers : {
			"Authorization" : "Bearer " + localStorage.getItem('login.token')
		},
		method: 'post',
		data : {
			query: `query { plannedTransactionsConnection(where: {Processed: true, bank_account: "` + accountId + `"` + (dateTo !== null ? `, Date_lt: "` + dateTo + `"` : ``) + `}) {
				groupBy {
					savings_pot {
						key
						connection {
							aggregate {
								sum {
									Amount
								}
							}
						}
					}
				}
				}
			}`
		}
	}).then((response) => {
		return response.data.data.plannedTransactionsConnection.groupBy.savings_pot;
	}).then((savingsPots) => {
		let potMap = new Map<string, number>();
		savingsPots.map((pot: ISavingsPotTotal) => {
			return potMap.set(pot.key, pot.connection.aggregate.sum.Amount);
		});
		return potMap;
	}).catch(response => {
		console.log('Error loading savings pots...');
		// TODO: Do something with the errors
		return new Map<string, number>();
	});
}