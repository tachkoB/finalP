import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { setInitialTwo, win, lose } from "./actions";


//left modal containing what homepage does

export default function Middlemodal() {
    const dispatch = useDispatch();

    const restartlink = useSelector(state=>state.restartlink);
    const winlink = useSelector(state=>state.winlink);
    const loselink = useSelector(state=>state.loselink);
    const deckname = useSelector(state=>state.deckname);
    const deckid = useSelector(state=>state.deckid);



    return (
        <div>
            <img className="logoGame" src={restartlink} onClick={e => dispatch(setInitialTwo(deckname))}/>
            <img className="lose" src={loselink} onClick={e => dispatch(lose(deckid))}/>
            <img className="win" src={winlink} onClick={e =>dispatch (win(deckid))}/>
        </div>
    );
}
