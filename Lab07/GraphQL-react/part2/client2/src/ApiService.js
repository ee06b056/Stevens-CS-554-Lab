class ApiService {

    constructor() {
        this.apiUrl = 'http://localhost:3001/';
        this.quoteFields = `{id, quote}`;
    }

    async getQuotes(params = {}) {
        const data = await this.getGraphQlData('quotes', params, this.quoteFields);
        return data.quotes;
    }

    async addQuote(params) {
        const data = await this.mutateGraphQlData('createQuote', params, this.quoteFields);
        return data.quote;
    }

    async updateQuote(params) {
        const data = await this.mutateGraphQlData('updateQuote', params, this.quoteFields);
        return data.quote;
    }

    async deleteQuote(params) {
        const data = await this.mutateGraphQlData('deleteQuote', params, this.quoteFields);
        return data.quote;
    }

    /**
     * Generic function to fetch data from server
     * @param {string} query
     * @returns {unresolved}
     */
    async getGraphQlData(resource, params, fields) {
        console.log(params);
        const query = `query {${resource} ${this.paramsToString(params)} ${fields}}`
        console.log(query);
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({ query })
        });
        if (res.ok) {
            const body = await res.json();
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }

    async mutateGraphQlData(resource, params, fields) {
        console.log(params);
        const query = `mutation {${resource} ${this.paramsToString(params)} ${fields}}`;
        console.log(query);
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({ query })
        });
        if (res.ok) {
            const body = await res.json();
            return body.data;
        } else {
            throw new Error(res.status);
        }
    };

    /**
     * 
     * @param {object} params
     * @returns {String} params converted to string for usage in graphQL
     */
    paramsToString(params) {
        let paramString = '';
        let tmp = [];
        for (let key in params) {
            let paramStr = params[key];
            if (paramStr !== '') {
                if (typeof params[key] === 'string') {
                    paramStr = `"${paramStr}"`;
                }
                tmp.push(`${key}:${paramStr}`);
            }
        }
        if (tmp.length) {
            paramString = `(input: {${tmp.join()}})`;
        }
        return paramString;
    }
}

export default new ApiService();