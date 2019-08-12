import React, { useState, useEffect } from "react";
import axios from "./axios";


export default function NewDeck() {

    const [card, setCard] = useState();
    const [val, setVal] = useState();
    const [cardtwo, setCardTwo] = useState();
    const [valtwo, setValTwo] = useState();

    const [sel, selCard] = useState();
    const [use, useCard] = useState();
    const [seltwo, selCardTwo] = useState();
    const [usetwo, useCardTwo] = useState();


    useEffect(
        () => {
            if (val) {
                axios.get(`/searchCards/${val}.json`).then(results => {
                    console.log(
                        "results for new card in mbcard: ",
                        results.data
                    );
                    setCard(results.data);
                });
            }
        },
        [val]
    );

    useEffect(
        () => {
            if (valtwo) {
                axios.get(`/searchCards/${valtwo}.json`).then(results => {
                    console.log(
                        "results for new card in sbcard: ",
                        results.data
                    );
                    setCardTwo(results.data);
                });
            }
        },
        [valtwo]
    );

    useEffect(
        () => {
            if (sel) {
                useCard(sel);
            }
        }
        ,[sel]
    );
    useEffect(
        () => {
            if (seltwo) {
                useCardTwo(seltwo);
            }
        }
        ,[seltwo]
    );

    const onChange = e => {
        setVal(e.target.value);
    };
    const onChangeTwo = e => {
        setValTwo(e.target.value);
    };
    const selectCard = e => {
        selCard(e.target.value);    
    };
    const selectCardTwo = e => {
        selCardTwo(e.target.value);
    };

    return (

        <div>
            <div className="headerDeck">
                <p className="pInDeck">Name of your deck:</p>
                <input type="text" className="inputDeck" placeholder="Name of your deck" name="deckname"/> 
            </div>
            <br/>
            <div className="inputContainer">
                <div className="inputHolder">
                    <div className="smallHolder"> 
                        <input type="text" className="inputDeck" value={use} name="mainboard" onChange={onChange}/>
                        <p className="addCard">+</p>
                    </div>
                    <br/>
                    <div className="newCard" onClick={e => selectCard(e)}>{card}</div>
                </div>
                <div className="inputHolder">
                    <div className="smallHolder"> 
                        <input type="text" className="inputDeck" value={usetwo} name="sideboard" onChange={onChangeTwo}/>
                        <p className="addCard">+</p>
                    </div>
                   
                    <div className="newCard" onClick={e => selectCardTwo(e)}>{cardtwo}</div>
                </div>
            </div>
            <div className="decksContainer">
                <div className="mainboardContainer"></div>
                <div className="sideboardContainer"></div>
            </div>
            <button>Save</button>
        </div>
    );
}