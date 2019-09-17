import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { selectDeck, shrouder, getDecks } from "./actions";
import { Link } from "react-router-dom";

//left modal containing what homepage does

export default function Rightmodal() {
    const dispatch = useDispatch();

    const decklist = useSelector(state => state.decks || []);
    // const selectdeck = useSelector(state=>)
    useEffect(() => {
        console.log(decklist, "decklist", !decklist);
    }, [decklist]);
    useEffect(() => {
        dispatch(getDecks());
    }, []);

    return (
        <div>
            <div className="shroud" onClick={e => dispatch(shrouder())}></div>
            <div className="rightModal">
                <img className="rightModal" src="righty.png" />
                {decklist.length == 0 && (
                    <Link to="/newdeck" className="linkHomepage">
                        <p className="sot">Build a new deck!</p>
                    </Link>
                )}
                <ul className="absolutely">
                    <li>
                        {decklist &&
                            decklist.map(deck => (
                                <p
                                    key={deck.id}
                                    onClick={e =>
                                        dispatch(selectDeck(deck.name, deck.id))
                                    }
                                    className="deckContainerRight"
                                >
                                    {deck.name}
                                </p>
                            ))}
                    </li>
                </ul>
            </div>
        </div>
    );
}
