import React, { useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { editDeck, leftModalVisibleTwo, getDecks } from "./actions";
import LeftModalTwo from "./leftmodaltwo";
import { Link } from "react-router-dom";





export default function NewDeck() {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDecks());
    }, []);

    const decks = useSelector(state=>state.decks);
   


    
    const leftmodaltwo = useSelector(state=>state.leftmodalvisibletwo);

    return (

        <div className="main">
            <div className="completeBackground">
                <div className="header">
                    <img className="hamby" onClick={e=>dispatch(leftModalVisibleTwo())} src="hamburger.png"/>
                </div>
                <img className="nickyB" src="statsbkg.png"/>

                {leftmodaltwo &&(<LeftModalTwo/>)}         
                <div className="deckStatsContainer">

                    <ul className="absolutely">
                        {decks &&(decks.map(deck=>(
                            // eslint-disable-next-line react/jsx-key
                            <li > 
                                <div className="containerOfDecks" key={deck.id}>
                                    <img className="to"src="radistat.png"/>
                                    <div className="conto">
                                        <p className="bigger">{deck.name}</p>
                                        <p className="smaller">{deck.ratio}</p>
                                    </div>
                                </div>   
                            </li>

                        )))}
                    </ul>
                </div>
            </div>
        </div>
    );
}