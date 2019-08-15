import React, { useEffect } from "react";
import axios from "./axios";
import Modal from "./modal";
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
                <div className="wrapper"></div>
                <div className="wrappertwo">
                    <div className="upperHalf">
                        <img src="upper.png"/>
                    </div>
                    <div className="wrapperthree"></div>
                    <div className="wrapperfour"> 
                        <div className="lowerHalf">
                            <img src="lower.png"/>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}311;