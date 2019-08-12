import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { setInitial } from "./actions";
import { Link } from "react-router-dom";


export default function Deckbuilder() {

    return (

        <div>
            <p className="pInDeck">Your decks:</p>
            <div className="deckListContainer">
                <div className="deckContainer">

                </div>
            </div>

            <Link to="/newdeck">Build a new deck!</Link>

        </div>
    );
}