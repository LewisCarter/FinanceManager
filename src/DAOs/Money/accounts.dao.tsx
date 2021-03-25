import axios, { AxiosRequestConfig } from "axios";
import {IAccount, INewAccountFormValues} from '../../DTOs/Money/account.dto';
import { IBank } from '../../DTOs/Money/bank.dto';
import { createBank } from './banks.dao';

export async function getAccounts() {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			"Authorization": 'Bearer ' + localStorage.getItem('login.token')
		},
		method: 'post',
		data: {
			query: `query { 
				bankAccounts { 
					id, 
					Name, 
					Bank { 
						Name 
					}
				} 
			}`
		}
	}).then(response => {
		return response.data.data.bankAccounts;
	}).catch(response => {
		console.log('Error loading bank accounts...');
		// TODO: Do something with the errors
		return [];
	});
} 

export async function getAccount(id:string): Promise<IAccount> {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			"Authorization": 'Bearer ' + localStorage.getItem('login.token')
		},
		method: 'post',
		data: {
			query: `query { 
				bankAccount(id: "` + id + `") { 
					id, 
					Name, 
					Bank { 
						Name 
					}
				} 
			}`
		}
	}).then(response => {
		if (response.data.data.bankAccount != null) {
			return response.data.data.bankAccount;
		} else {
			return null;
		}
		
	}).catch(response => {
		console.log('Error loading bank accounts...');
		// TODO: Do something with the errors
		return null;
	});
}

export async function createAccount(values: INewAccountFormValues): Promise<IAccount> {

	let axiosConfig: AxiosRequestConfig = {
		url: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			"Authorization": 'Bearer ' + localStorage.getItem('login.token')
		},
		method: 'post',
		data: {
			query: ``
		}
	};
	
	if (values.newBank !== null && values.newBank !== "") {
		return await createBank(values.newBank).then(async (bank: IBank) => {
			if (bank !== null) {
				axiosConfig.data.query = `mutation {
					createBankAccount(input: { data: {
						Name: "` + values.name + `",
						Description: "` + values.description + `"
						Bank: "` + bank.id + `",
					}}) {
						bankAccount {
							id
							Name
							Bank {
								Name
							}
						}
					}
				  }`
				return await axios(axiosConfig).then(response => {
					return response.data.data.createBankAccount.bankAccount;
				}).catch(response => {
					console.log('Error creating bank accounts...');
					// TODO: Do something with the errors
					return null;
				});
			} else {
				return null;
			}
		});
	} else {
		axiosConfig.data.query = `mutation {
			createBankAccount(input: { data: {
				Name: "` + values.name + `",
				Description: "` + values.description + `"
				Bank: "` + values.bank + `",
			}}) {
				bankAccount {
					id
					Name
					Bank {
						Name
					}
				}
			}
		  }`
		return await axios(axiosConfig).then(response => {
			return response.data.data.createBankAccount.bankAccount;
		}).catch(response => {
			console.log('Error creating bank accounts...');
			// TODO: Do something with the errors
			return null;
		});
	}

	
}

export async function deleteAccount(id: string) {
	return await axios({
		url: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			"Authorization": 'Bearer ' + localStorage.getItem('login.token')
		},
		method: 'post',
		data: {
			query: `mutation {
				deleteBankAccount(input: {where: {id:"` + id + `"}}) {
					bankAccount {
						id
					}
			 	}
			}`
		}
	}).then(response => {
		return response.data.data.deleteBankAccount.bankAccount.id;
	}).catch(response => {
		console.log('Error deleting bank account...');
		// TODO: Do something with the errors
		return null;
	});
}