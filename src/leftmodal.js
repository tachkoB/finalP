import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { shrouder } from "./actions";
import { Link } from "react-router-dom";


//left modal containing what homepage does

export default function Leftmodal() {
    const dispatch = useDispatch();


    return (
        <div>
            <div className="shroud" onClick={e=>dispatch(shrouder())}></div>

            <div className="leftModal">
                <img className="leftModal" src="lefty.png"/>
                <ul className="so">
                    <li className="leftModalList"><Link to="/newdeck" className="linkHomepage">Build decks</Link></li>
                    <li className="leftModalList"><Link to="/stats" className="linkHomepage">Stats</Link></li>
                </ul>
            </div>
        </div>
    );
}
