import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import {  } from "./actions";
import { Link } from "react-router-dom";


//left modal containing what homepage does

export default function Leftmodal() {
    const dispatch = useDispatch();


    return (

        <div className="leftModal">
            <img className="leftModal" src="lefty.png"/>
            <ul className="so">
                <li className="leftModalList"><Link to="/deckbuilder" className="linkHomepage">Build decks</Link></li>
                <li className="leftModalList"><Link to="/stats" className="linkHomepage">Stats</Link></li>
            </ul>
         
        </div>
    );
}
