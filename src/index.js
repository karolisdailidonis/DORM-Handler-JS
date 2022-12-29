import axios from 'axios';

class DORM {
	schema = '0.0.6';
	token = null;
	apiURL = null;

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
		const table = {
			requestJob: 'insert',
			from: from,
			values: values,
		};

		if (before != null) {
			table['before'] = before;
		}

		this.tables.push(table);

		return this;
	}

	addUpdateJob({ from, values, where = null }) {
		const table = {
			requestJob: 'update',
			from: from,
			values: values,
		};

		if (where != null) {
			table['where'] = where;
		}

		this.tables.push(table);

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

	send() {
		return axios
			.post(
				this.apiURL,
				{
					schema: this.schema,
					token: this.token,
					jobs: this.jobs,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			.catch((exception) => {
				console.log(exception);
				result = { data: { errors: [exception.message] } };
			});
	}
}

export { DORM };
