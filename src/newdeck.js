/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { setInitialCard, addMainboard, addSideboard, incrementCard, decrementCard, incrementCardTwo, decrementCardTwo, addDeck } from "./actions";
import { Link } from "react-router-dom";



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
                        <img className="hamby" onClick={e=>dispatch(leftModalVisibleTwo())} src="hamburger.png"/>
                    </div>
                    <img className="nickyB" src="statsbkg.png"/>
                    <img className="namey" src="namey.png"/>
                    <img className="decky" src="decky.png"/>
                    <img className="savey"
                        onClick={e => {
                            const action = addDeck(deckname, maincard, sidecard);
                            dispatch(action);
                            action.then(
                                () => props.history.push('/stats')
                            );
                        }}
                        src="savey.png"/>
                    <input type="text" onChange={deckName} value={deckname} className="inputy" placeholder="New Deck" name="deckname"/> 
                    <img className="searchey" src="searchey.png"/>
                    <input type="text" className="mainey"  name="mainboard" onChange={onChange}/>
                    <div className="newy" >
                        <p className="newyCont" onClick={e => dispatch(addMainboard(e.target.textContent))}>{card}</p>
                    </div>
                    <img className="cardnr" src="cardnr.png"/>
                    <img className="cardlist" src="cardlist.png"/>
                    
                    <div className="biggy">
                        <ul className="mo">  {maincard &&
                    maincard.map(cards => (
                        <li > 
                            <div className="yas">
                                <img className="plusey" onClick={e => dispatch(incrementCard(cards.maincard))} src="plusy.png"/>
                                <img className="minusey" onClick={e => dispatch(decrementCard(cards.maincard))} src="minusy.png"/>

                                <pre className="numberyo">{cards.cardnr}       {cards.maincard}</pre>
                            </div>
                        </li>

                    ))}
                        </ul> 
                    </div>


    





                    <div className="inputContainer">

                    

                        <div className="inputHolder">
                            <div className="smallHolder"> 
                                <input type="text" className="inputDeck inputRegistration" placeholder="sideboard" name="sideboard" onChange={onChangeTwo}/>
                            </div>


                            <div className="newcardcontainer">
                                <div className="newCard">
                                    <p className="addCard" onClick={e => dispatch(addSideboard(e.target.textContent))}>{cardtwo} </p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="decksContainer">
                        <div className="mainboardContainer">
                            <div className = "cardtotal"><p className="totalContainer">Mainboard total: {cardcount}</p></div>
                        </div>
                        <div className="cardContainer">  
                       
                        </div>

                        <div className="sideboardContainer">
                            {sidecard &&
                    sidecard.map(card => (
                        <div className="cardContainer">  
                            <p className="cardName">{card.sidecard} x {card.cardnrtwo}</p>
                            <div className="incrementorsContainer">
                                <p className="incrementors" onClick={e => dispatch(incrementCardTwo(card.sidecard))}>+ </p>
                                <p className="incrementors" onClick={e => dispatch(decrementCardTwo(card.sidecard))}> - </p>
                            </div>
                        </div>        
                    ))} 
                            <div className="cardtotal"> <p className = "totalContainer">Sideboard total: {cardcounttwo}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}