import React, { useEffect } from "react";
import axios from "./axios";
import Modal from "./modal";
import Rightmodal from "./rightmodal";
import Leftmodal from "./leftmodal";
import { useDispatch, useSelector } from "react-redux";
import {  rightModalVisible, leftModalVisible, middleModal, setVisible, setInitial, playerOneReduce, playerTwoReduce, playerOneAdd, playerTwoAdd } from "./actions";
import Middlemodal from "./middlemodal";


export default function NewGame() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setInitial());
    }, []);
    // const visible = useSelector(state=>state.visible);


    const count = useSelector(state => state.count);
    const counttwo = useSelector(state=> state.counttwo);
    const logolink = useSelector(state=> state.logolink);
    const upperlink = useSelector(state=> state.upperlink);
    const lowerlink = useSelector(state=> state.lowerlink);
    const logovisible = useSelector(state=> state.logovisible);

    const leftmodal = useSelector(state=>state.leftmodalvisible);
    const rightmodal = useSelector(state=>state.rightmodalvisible);
    const deckname = useSelector(state => state.deckname);
    const middlemodal = useSelector(state=>state.middlemodal);




    return (

        <div>
            <div className="completeBackground">
                <div className="header">
                    <img className="hamby" onClick={e=>dispatch(leftModalVisible())} src="hamburger.png"/>
                    <p className="headerDecks" onClick={e=>dispatch(rightModalVisible())}>{deckname}</p>
                </div>
                <img className="nickyB"src="nicky_b.jpg"/>
                <img className="upperHalf" src={upperlink}/>

                {logovisible &&(<img className="logoGame" src={logolink} onClick={e => dispatch(middleModal())}/>)}

                {middlemodal &&(<Middlemodal/>)}

                {leftmodal &&(<Leftmodal/>)}
                {rightmodal &&(<Rightmodal/>)}

                <img className="lowerHalf" src={lowerlink}/>
                <img className="plus" onClick={e => dispatch(playerOneAdd(count))}src="plus.png"/>
                <img className="plustwo" onClick={e => dispatch(playerTwoAdd(counttwo))} src="plus.png"/>
                <img className="minus" onClick={e => dispatch(playerOneReduce(count))} src="minus.png"/>
                <img className="minustwo" onClick={e => dispatch(playerTwoReduce(counttwo))} src="minus.png"/>
                <div className="lifeOne reverse">{count}</div>
                <div className="lifeTwo">{counttwo}</div>



            </div>
        </div>
    );
}