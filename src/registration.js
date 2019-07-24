import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        console.log("juhuhuhu", this.state);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
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
                {this.state.error && <div className="error">Oops</div>}
                <input
                    name="first"
                    placeholder="first"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    name="last"
                    placeholder="last"
                    onChange={e => this.handleChange(e)}
                />
                <br />

                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <br />

                <input
                    name="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                />
                <br />

                <button onClick={e => this.submit(e)}>Register</button>
                <br />

                <Link to="/login">
                    If you already have an account, you can log in here.
                </Link>
            </div>
        );
    }
}
