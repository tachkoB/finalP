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
   


    
    const leftmodaltwo = useSelector(state=>state.leftmodalvisibletwo);

    const deckname = useSelector(state=>state.deckname);
    const deckid = useSelector(state=>state.deckid);

    return (

        <div>
            <div className="completeBackground">
                <div className="header">
                    <img className="hamby" onClick={e=>dispatch(leftModalVisibleTwo())} src="hamburger.png"/>
                </div>
                <img className="nickyB" src="statsbkg.png"/>
                {leftmodaltwo &&(<LeftModalTwo/>)}


            </div>
        </div>
    );
}