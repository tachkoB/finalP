import React, { useEffect } from "react";
import axios from "./axios";
import Modal from "./modal";
import Rightmodal from "./rightmodal";
import Leftmodal from "./leftmodal";
import { useDispatch, useSelector } from "react-redux";
import { leftModalVisible, lose, win, middleModal, setVisible, setInitial, playerOneReduce, playerTwoReduce, playerOneAdd, playerTwoAdd } from "./actions";


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
    const restartlink = useSelector(state=>state.restartlink);
    const winlink = useSelector(state=>state.winlink);
    const loselink = useSelector(state=>state.loselink);
    const leftmodal = useSelector(state=>state.leftmodalvisible);



    return (

        <div>
            <div className="completeBackground">
                <div className="header"><img className="hamby" onClick={e=>dispatch(leftModalVisible())} src="hamburger.png"/></div>
                <img className="nickyB"src="nicky_b.jpg"/>
                <img className="upperHalf" src={upperlink}/>

                {logovisible &&(<img className="logoGame" src={logolink} onClick={e => dispatch(middleModal())}/>)}
                {restartlink &&(<img className="logoGame" src={restartlink} onClick={e => dispatch(setInitial())}/>)}

                {loselink &&(<img className="lose" src={loselink} onClick={e => dispatch(lose())}/>)}

                {winlink &&(<img className="win" src={winlink} onClick={e =>dispatch (win())}/>)}

                {leftmodal &&(<Leftmodal/>)}

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