export interface ISavingsPot {
	id: string;
	Name: string;
	Goal: number;
}

export interface ISavingsPotTotal {
	key: string;
	connection: {
		aggregate: {
			sum: {
				Amount: number
			}
		}
	}
}

export interface ISavingsPotCreateInput {
	Name: string;
	Goal: number;
}