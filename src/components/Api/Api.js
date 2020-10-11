import React from "react";

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: "",
            data: null
        }
        this.apiUrl = "https://pbdapi.malinovski.tk";
    }

    async sendRequest(query = "") {
        const options = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const resp = await fetch(this.apiUrl + query, options);
        const json = await resp.json();
        return json;
    }
}

export default Api;