import React, { useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { leftModalVisibleTwo, getDecks, shrouder } from "./actions";
import LeftModalTwo from "./leftmodaltwo";




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

                    <ul className="so">
                        {decks &&(decks.map(deck=>(
                            // eslint-disable-next-line react/jsx-key
                            <li> <div className="containerOfDecks" key={deck.id}>
                                <p>{deck.name}</p>
                                <p>Win ratio:{deck.ratio}</p>
                            </div>   </li>

                        )))}
                    </ul>
                </div>
            </div>
        </div>
    );
}