import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Splash from "./Splash";

const initialState = {
    nameError: "",
    emailError: "",
    passwordError: "",
    generalError: ""
};

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            email: "",
            password: "",
            visibility: true,
            nameError: "",
            emailError: "",
            passwordError: "",
            generalError: ""
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
            500
        );
        console.log(
            "%cFor proper experience, please use iPhone 6/7/8 viewport",
            "color: blue; font-size:15px;"
        );
    }
    validate() {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let generalError = "";
        if (!this.state.first || !this.state.email || !this.state.password) {
            generalError = "please fill in all the fields";
        }
        if (this.state.first.length < 3) {
            nameError = "min. 3 charachters username";
        }
        if (!this.state.email.includes("@")) {
            emailError = "Invalid email";
        }
        if (this.state.password.length < 8) {
            passwordError = "password must be at least 8 characters long";
        }

        if (generalError) {
            this.setState({ generalError });
        } else if (nameError) {
            this.setState({ nameError });
        } else if (emailError) {
            this.setState({ emailError });
        } else if (passwordError) {
            this.setState({ passwordError });
        } else return true;
    }

    submit(e) {
        e.preventDefault();
        this.setState(initialState);

        const isValid = this.validate();
        if (isValid) {
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
                        <form noValidate onSubmit={e => this.submit(e)}>
                            <input
                                noValidate
                                className="inputRegistration one"
                                name="first"
                                placeholder="username"
                                onChange={e => this.handleChange(e)}
                            />
                            <br />
                            <div className="error">{this.state.nameError}</div>
                            <input
                                noValidate
                                className="inputRegistration two"
                                name="email"
                                placeholder="email"
                                onChange={e => this.handleChange(e)}
                            />

                            <br />
                            <div className="error">{this.state.emailError}</div>
                            <div className="error">
                                {this.state.generalError}
                            </div>

                            <input
                                noValidate
                                className="inputRegistration three"
                                autocomplete="new-password"
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={e => this.handleChange(e)}
                            />

                            <br />
                            <div className="error">
                                {this.state.passwordError}
                            </div>

                            <button
                                type="submit"
                                className="buttonRegistration"
                            >
                                Register
                            </button>
                        </form>
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
