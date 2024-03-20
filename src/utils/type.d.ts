export interface Form {
	username: string;
	prefLang: string;
	stdInt: string;
	code: string;
	submissions: string;
	timestamp: string;
}

export interface SubmitForm {
	username: string;
	prefLang: {
		id: number;
		lang: string;
	};
	stdInt: string;
	code: string;
	submissions: string;
}
