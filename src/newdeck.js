/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { setInitialCard, addMainboard, addSideboard, incrementCard, decrementCard, incrementCardTwo, decrementCardTwo } from "./actions";


export default function NewDeck() {
    const [card, setCard] = useState();
    const [val, setVal] = useState();
    const [cardtwo, setCardTwo] = useState();
    const [valtwo, setValTwo] = useState();
    const [cardcount, setCardCount] = useState();
    const [cardcounttwo, setCardCountTwo] = useState();
    const maincard = useSelector(state => state.maincard);
    const sidecard = useSelector(state=> state.sidecard);

    // const cardnr = useSelector(state=>state.cardnr);
    // const cardnrtwo = useSelector(state=>state.cardnrtwo);
 


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
        else {console.log("noup");}
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
        else {console.log("noup");}
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

    return (

        <div>
            <div className="headerDeck">
                <p className="pInDeck">Name of your deck:</p>
                <input type="text" className="inputDeck inputRegistration" placeholder="deck name" name="deckname"/> 
            </div>
            <br/>
            <div className="inputContainer">

                <div className="inputHolder">
                    <div className="smallHolder"> 
                        <input type="text" className="inputDeck inputRegistration"  placeholder="mainboard" name="mainboard" onChange={onChange}/>
                    </div>
                    
                    <div className="newcardcontainer">
                        <div className="newCard" >
                            <p className="addCard" onClick={e => dispatch(addMainboard(e.target.textContent))}>{card}</p>
                        </div>
                    </div>
                </div>

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
                    {maincard &&
                    maincard.map(card => (
                        <div className="cardContainer">  
                            <p className="cardName">{card.maincard} x {card.cardnr}</p>
                            <div className="incrementorsContainer">
                                <p className="incrementors" onClick={e => dispatch(incrementCard(card.maincard))}>+</p><p className="incrementors" onClick={e => dispatch(decrementCard(card.maincard))}> - </p>
                            </div>
                        </div>
                    ))} <div className = "cardtotal"><p className="totalContainer">Mainboard total: {cardcount}</p></div>
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
            <button>Save</button>
        </div>
    );
}