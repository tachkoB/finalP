import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDecks } from "./actions";
import { Link } from "react-router-dom";


export default function Deckbuilder() {


    const dispatch = useDispatch();
    const decklist = useSelector(
        state =>state.decks);

    useEffect(() => {
        dispatch(getDecks());
    }, []);

    if (!decklist) {
        return null;
    }

    return (

        <div>
            <p className="pInDeck">List of decks:</p>
            <div className="deckListContainer">
                {decklist &&
                    decklist.map(deck => (
                        <div className="deckContainer" key={deck.id}>
                            <p>{deck.name}</p>
                        </div>
                    ))} 
            </div>

            <Link to="/newdeck">Build a new deck!</Link>

        </div>
    );
}