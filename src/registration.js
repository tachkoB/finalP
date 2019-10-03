import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Splash from "./Splash";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: true
        };
    }

    componentDidMount() {
        setTimeout(
            function() {
                this.setState({
                    visibility: false
                });
                console.log(this.state);
            }.bind(this),
            3000
        );
        console.log(
            "%cFor proper experience, please use iPhone 6/7/8 viewport",
            "color: blue; font-size:15px;"
        );
    }

    submit() {
        axios
            .post("/register", {
                first: this.state.first,
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
            <div>
                {this.state.visibility ? (
                    <Splash />
                ) : (
                    <div className="inputField">
                        <div className="shadowWrapper">
                            <img className="nickyBTwo" src="nicky_b.jpg" />
                            <img className="logoReg" src="logothree.png" />

                            <h4 className="registerIntro">
                                Register for free to use Magic the Gathering
                                Life Counter & Deck Builder
                            </h4>
                        </div>
                        {this.state.error && <div className="error">Oops</div>}
                        <input
                            className="inputRegistration one"
                            name="first"
                            placeholder="username"
                            onChange={e => this.handleChange(e)}
                        />
                        <br />
                        <input
                            className="inputRegistration two"
                            name="email"
                            placeholder="email"
                            onChange={e => this.handleChange(e)}
                        />

                        <br />

                        <input
                            className="inputRegistration three"
                            autocomplete="new-password"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={e => this.handleChange(e)}
                        />

                        <br />

                        <button
                            className="buttonRegistration"
                            onClick={e => this.submit(e)}
                        >
                            Register
                        </button>
                        <br />
                        <div className="shadowWrapper">
                            <Link className="loginLink" to="/login">
                                If you already have an account, you can log in
                                here.
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
