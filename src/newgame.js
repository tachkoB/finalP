import React, { useEffect } from "react";
import axios from "./axios";
import Modal from "./modal";
import Rightmodal from "./rightmodal";
import Leftmodal from "./leftmodal";
import { useDispatch, useSelector } from "react-redux";
import { setVisible, setInitial, playerOneReduce, playerTwoReduce, playerOneAdd, playerTwoAdd } from "./actions";


export default function NewGame() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setInitial());
    }, []);

    const count = useSelector(state => state.count);
    const counttwo = useSelector(state=> state.counttwo);
    const visible = useSelector(state=>state.visible);


    return (

        <div>
            <div className="completeBackground">
                <div className="header"> yo</div>
                <img className="nickyB"src="nicky_b.jpg"/>
                <img className="upperHalf" src="upper.png"/>
                <img className="logoGame" src="logogame.png"/>
                <img className="lowerHalf" src="lower.png"/>
                <img className="plus" src="plus.png"/>
                <img className="plustwo" src="plus.png"/>
                <img className="minus" src="minus.png"/>
                <img className="minustwo" src="minus.png"/>
                <div className="lifeOne reverse">20</div>
                <div className="lifeTwo">{counttwo}</div>



            </div>
        </div>
    );
}