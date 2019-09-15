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
                <div className="shadowWrapper">
                    <img className="nickyBTwo" src="nicky_b.jpg" />
                    <img className="logoReg" src="logothree.png" />
                    <h4 className="registerIntro">
                        Fill in your email and address to access your account.
                    </h4>
                </div>
                {this.state.error && (
                    <div className="error shadowWrapper">
                        <h4>Please enter the correct email and password.</h4>
                    </div>
                )}
                <input
                    className="inputRegistration"
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <input
                    autoComplete="new-password"
                    className="inputRegistration two"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                />
                <br />
                <button
                    className="loginRegistration"
                    onClick={e => this.submit(e)}
                >
                    Log in
                </button>
            </div>
        );
    }
}
