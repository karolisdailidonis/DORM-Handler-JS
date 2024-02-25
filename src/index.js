import axios from 'axios';

class DORM {
	schema = '0.1.3';
	token = null;
	apiURL = null;
	json = null;

	axiosInstance = axios;

	axiosConfig = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	jobs = [];

	addReadJob({
		from,
		columns = [],
		where = null,
		join = null,
		after = null,
		limit = null,
		order = null,
	}) {
		const job = {
			job: 'read',
			from: from,
			columns: columns.map((column) => {
				return { column: column };
			}),
		};

		if (where != null) {
			job['where'] = where;
		}

		if (join != null) {
			job['join'] = join;
		}

		if (after != null) {
			job['after'] = after;
		}

		if (limit != null) {
			job['limit'] = limit;
		}

		if (order != null) {
			job['order'] = order;
		}

		this.jobs.push(job);

		return this;
	}

	addInsertJob({ from, values, before = null }) {
		const job = {
			job: 'insert',
			from: from,
			values: values,
		};

		if (before != null) {
			job['before'] = before;
		}

		this.jobs.push(job);

		return this;
	}

	addUpdateJob({ from, values, where = null }) {
		const job = {
			job: 'update',
			from: from,
			values: values,
		};

		if (where != null) {
			job['where'] = where;
		}

		this.jobs.push(job);

		return this;
	}

	setApiURL(url) {
		this.apiURL = url;
		return this;
	}

	setToken(token) {
		this.token = token;
		return this;
	}

	selectRow(response, table, emptyArray = false) {
		try {
			return response.data.body[table].rows[0];
		} catch (error) {
			if (emptyArray) {return [];}
			return error;	
		}
	}

	selectRows(response, table, emptyArray = false) {
		try {
			return response.data.body[table].rows;
		} catch (error) {
			if (emptyArray) {return [];}
			return error;
		}
	}
	
	hasError(response) {
		if (response.data.errors.length > 0) return true;
		return false;
	}
	
	selectErrors(response, table) {
		try {
			return response.data.errors;
		} catch (error) {
			return []
		}
	}

	// TODO: set jobs to null
	send() {
		return this.axiosInstance.post(
			this.apiURL,
			{
				schema: this.schema,
				token: this.token,
				json: this.json,
				jobs: this.jobs,
			},
			this.axiosConfig
		);
			// .catch((exception) => {
			// 	console.log(exception);
			// 	result = { data: { errors: [exception.message] } };
			// });
	}
}

export { DORM };
