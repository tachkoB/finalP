import React, { useState, useEffect } from "react";
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
            <div className="playerOne">
                <div className="gameContainer">  
                    <div>
                        <p className="plus" onClick={e => dispatch(playerOneAdd(count))}>+</p>
                    </div>
                    <div className=" reverse">
                        <p className="lifeTotal" >{count}</p>
                    </div>
                    <div >
                        <p className="minus"  onClick={e => dispatch(playerOneReduce(count))}>-</p>
                    </div>  
                </div>
            </div>

            <div className="midBar" onClick={()=>dispatch(setVisible())}>Tu ce doc ikona</div>

            {visible && (
                <Modal />
            )}

            <div className="playerTwo">
                <div className="gameContainer">
                    <div >
                        <p className="minus" onClick={e => dispatch(playerTwoReduce(counttwo))}>-</p>
                    </div>
                    <div>
                        <p className="lifeTotal">{counttwo}</p>
                    </div>
                    <div>
                        <p className="plus" onClick={e => dispatch(playerTwoAdd(counttwo))}>+</p>
                    </div>
                </div>
            </div>
        </div>
    );
}