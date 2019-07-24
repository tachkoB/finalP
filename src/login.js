import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                if (res.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="inputField">
                {this.state.error && (
                    <div className="error">
                        Please enter correct email and address.
                    </div>
                )}
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.submit(e)}>Submit</button>
            </div>
        );
    }
}
