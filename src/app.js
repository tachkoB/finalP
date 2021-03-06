import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Homepage from "./homepage";
import NewGame from "./newgame";
import Deckbuilder from "./deckbuilder";
import NewDeck from "./newdeck";
import Stats from "./stats";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/users").then(results => {
            console.log("this is the id I need: ", results.data.data.id);
            this.setState({
                id: results.data.data.id,
                first: results.data.data.first,
            });
        });
    }

    render() {
        if (!this.state.id) {
            return <div>Loading..</div>;
        }
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={props => {
                                return (
                                    <Homepage
                                        id={this.state.id}
                                    />
                                );
                            }}
                        />   
                        <Route path="/play" component={NewGame} />
                        <Route path ="/deckbuilder" component={Deckbuilder} />
                        <Route path ="/newdeck" component={NewDeck} />
                        <Route path ="/stats" component={Stats} />

                    </div>
                </BrowserRouter>
            </div>
        );
    }
}