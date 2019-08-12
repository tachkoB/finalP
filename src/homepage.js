import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";
import NewGame from "./newgame";


export default function Homepage() {
    return (
        <div className ="homepageMain">
            <div className="homepageBigContainer">
                <div className="homepageSmallContainer">
                    <div className="linkContainerHomepage">
                        <Link to="/play" className="linkHomepage">New game</Link>
                    </div>
                    <div className="linkContainerHomepage">
                        <Link to="/deckbuild" className="linkHomepage">Build decks</Link>
                    </div>
                    <div className="linkContainerHomepage">
                        <Link to="/stats" className="linkHomepage">Stats</Link>
                    </div>
                </div>
                <div className="linkContainerHomepage">
                    <a href="/logout" className="linkHomepage">Exit</a>
                </div>
            </div>
        </div>

    );
}