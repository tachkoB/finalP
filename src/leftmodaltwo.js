import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { shrouder, hideit } from "./actions";
import { Link } from "react-router-dom";


//left modal containing what homepage does

export default function LeftModalTwo() {
    const dispatch = useDispatch();


    return (
        <div>
            <div className="shroud" onClick={e=>dispatch(shrouder())}></div>
            <div className="leftModal">
                <img className="leftModal" src="lefty.png"/>
                <ul className="so">
                    <li className="leftModalList"><Link to="/play" onClick={e=>dispatch(shrouder())}className="linkHomepage">New Game</Link></li>
                    <li className="leftModalList"><Link to="/newdeck" className="linkHomepage" onClick={e=>dispatch(hideit())}>Build decks</Link></li>
                </ul>
            </div>
        </div>
    );
}
