import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";


export default function Homepage() {
    return (
        <div className ="homepageMain">
            <div className="homepageBigContainer">
                <BrowserRouter>
                    <div className="homepageSmallContainer">
                        <div className="linkContainerHomepage">
                            <Link className="linkHomepage" to="/play">New game</Link>
                        </div>
                        <div className="linkContainerHomepage">
                            <Link className="linkHomepage" to="/deckbuild">Build decks</Link>
                        </div>
                        <div className="linkContainerHomepage">
                            <Link className="linkHomepage" to="/stats">Stats</Link>
                        </div>
                    </div>
                </BrowserRouter>
                <div className="linkContainerHomepage">
                    <a href="/logout" className="linkHomepage">Exit</a>
                </div>
            </div>
        </div>
    );
}