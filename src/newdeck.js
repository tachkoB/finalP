/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { hideItTwo, setInitialCard, addMainboard, addSideboard, incrementCard, decrementCard, incrementCardTwo, decrementCardTwo, addDeck, leftModalVisibleThree } from "./actions";
import { Link } from "react-router-dom";
import LeftModalThree from "./leftmodalthree";



export default function NewDeck(props) {
    const [card, setCard] = useState();
    const [val, setVal] = useState();
    const [cardtwo, setCardTwo] = useState();
    const [valtwo, setValTwo] = useState();
    const [cardcount, setCardCount] = useState();
    const [cardcounttwo, setCardCountTwo] = useState();
    const [deckname, setDeckName] = useState();


    const maincard = useSelector(state => state.maincard);
    const sidecard = useSelector(state=> state.sidecard);
    const leftthree = useSelector(state=> state.leftmodalvisiblethree);

    useEffect(() => {
        dispatch(setInitialCard());
    }, []);

   
  
    useEffect(
        () => {
            if (val) {
                axios.get(`/searchCards/${val}.json`).then(results => {
                    console.log(
                        "results for new card in mbcard: ",
                        results.data.result
                    );
                    setCard(results.data.result);
                });
            }
        },
        [val]
    );
    useEffect(()=>{
        dispatch(hideItTwo());
    }, []);

    useEffect (()=>{
        if (maincard){
            let sum = 0;
            maincard.forEach((user)=>{
                sum += user.cardnr; 
                setCardCount(sum);
            }
            );
        }
      
    }, 
    [maincard]
    );
    useEffect (()=>{
        if (sidecard){
            let sum = 0;
            sidecard.forEach((user)=>{
                sum += user.cardnrtwo; 
                setCardCountTwo(sum);
            }
            );
        }
    }, 
    [sidecard]
    );
 
    useEffect(
        () => {
            if (valtwo) {
                axios.get(`/searchCards/${valtwo}.json`).then(results => {
                    console.log(
                        "results for new card in sbcard: ",
                        results.data
                    );
                    setCardTwo(results.data.result);
                });
            }
        },
        [valtwo]
    );

    const dispatch = useDispatch();

    const onChange = e => {
        setVal(e.target.value);
    };
    const onChangeTwo = e => {
        setValTwo(e.target.value);
    };
    const deckName = e => {
        setDeckName(e.target.value);
    };

    return (
        <div>
            <div className="main">
                <div className="completeBackground">
                    <div className="header">
                        <img className="hamby" onClick={e=>dispatch(leftModalVisibleThree())} src="/hamburger.png"/>
                    </div>
                    <img className="nickyB" src="/statsbkg.png"/>
                    <img className="namey" src="/namey.png"/>
                    <img className="decky" src="/decky.png"/>
                    <img className="savey"
                        onClick={e => {
                            const action = addDeck(deckname, maincard, sidecard);
                            dispatch(action);
                            action.then(
                                () => props.history.push('/stats')
                            );
                        }}
                        src="/savey.png"/>
                    <input type="text" onChange={deckName} value={deckname} className="inputy" placeholder="New Deck" name="deckname"/> 
                    <img className="searchey" src="/searchey.png"/>
                    <input type="text" placeholder="mainboard" className="mainey"  name="mainboard" onChange={onChange}/>
                    <div className="newy" >
                        <p className="newyCont" onClick={e => dispatch(addMainboard(e.target.textContent))}>{card}</p>
                    </div>
                    <img className="cardnr" src="/cardnr.png"/>
                    <img className="cardlist" src="/cardlist.png"/>
                    {leftthree &&(<LeftModalThree/>)} 
                    
                    <div className="biggy">
                        {maincard &&
                    maincard.filter(cards => {
                        if(cards.cardnr>0){
                            return cards;
                        }
                    }).map(cards => (
                        <div className="yas">
                            <div className="cdnmr">
                                <p>{cards.cardnr}</p>
                            </div>
                            <div className="cdname">                        
                                <p>{cards.maincard}</p>
                            </div>
                            <div className="pl">
                                <img className="plusey" onClick={e => dispatch(incrementCard(cards.maincard))} src="/plusy.png"/>
                            </div>
                            <div className="min">
                                <img className="minusey" onClick={e => dispatch(decrementCard(cards.maincard))} src="/minusy.png"/>
                            </div>
                        </div>

                    ))}
                
                    </div>
                    <div className = "cardtotalmain"><p className="totalContainer">card total: {cardcount}</p></div>
                </div>
            </div>
        </div>
        
    );
}