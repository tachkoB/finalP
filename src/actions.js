import axios from "./axios";
import { statement } from "@babel/template";

export function setInitial() {
    return {
        type: "SET_INITIAL",
        count: 20,
        counttwo:20,
        visible:false,
        logolink: "logogame.png",
        modalleft: false,
        modalright: false,
        upperlink: "upper.png",
        lowerlink: "lower.png",
        logovisible: true,
        restartlink: false,
        winlink: false,
        loselink: false,
        leftmodalvisible:false,
        rightmodalvisible:false,
        deckname: "Decks"
    };
}
export function setInitialTwo(deck) {
    return {
        type: "SET_INITIALTWO",
        count: 20,
        counttwo:20,
        visible:false,
        logolink: "logogame.png",
        modalleft: false,
        modalright: false,
        upperlink: "upper.png",
        lowerlink: "lower.png",
        logovisible: true,
        restartlink: false,
        winlink: false,
        loselink: false,
        leftmodalvisible:false,
        rightmodalvisible:false,
        deckname: deck
    };
}

export async function selectDeck(deck, id){
    return {
        type: "SELECT_DECK",
        deckname: deck,
        deckid:id,
        rightmodalvisible:false
    };
}

export async function win(id){
    const {data} = await axios.post("/win", {
        deckid:id
    });
    return {
        type: "WIN",
        logolink: "logogame.png",
        upperlink: "upper.png",
        lowerlink: "lower.png",
        logovisible:true,
        middlemodal: false,
        count: 20,
        counttwo: 20
    };
}

export async function lose(id){
    const {data} = await axios.post("/loss", {
        deckid:id
    });
    return {
        type:"LOSS",
        logolink: "logogame.png",
        upperlink: "upper.png",
        lowerlink: "lower.png",
        logovisible:true,
        middlemodal: false,
        count: 20,
        counttwo: 20
    };
}


export async function leftModalVisible(){
    return {
        type: "LEFT_MODAL",
        leftmodalvisible: true
    };
}
export async function leftModalVisibleTwo(){
    return {
        type: "LEFT_MODALTWO",
        leftmodalvisibletwo: true
    };
}
export async function rightModalVisible(){
    return {
        type: "RIGHT_MODAL",
        rightmodalvisible: true
    };
}
export async function editDeck(id){
    console.log("THE DECKID: ", id);
    const { data } = await axios.get(`/getDeck/${id}.json`);
    return {
        type: "GET_DECK"
    };
}
export async function shrouder(){
    return {
        type: "SHROUDER",
        leftmodalvisible: false,
        rightmodalvisible:false,
        leftmodalvisibletwo: false
    };
}
export async function middleModal(){
    return {
        type: "MIDDLE_MODAL",
        restartlink: "restart.png",
        upperlink: "upperopen.png",
        lowerlink: "loweropen.png",
        logovisible:false,
        middlemodal: true,
        loselink: "lose.png",
        winlink: "win.png"
    };
}





export function playerOneReduce(count) {
    return {
        type: "PLONE_REDUCE",
        count: count-1,
    };
}
export function playerOneAdd(count) {
    return {
        type: "PLONE_ADD",
        count: count+1,
    };
}
export function playerTwoReduce(counttwo) {
    return {
        type: "PLTWO_REDUCE",
        counttwo: counttwo-1,
    };
}
export function playerTwoAdd(counttwo) {
    return {
        type: "PLTWO_ADD",
        counttwo: counttwo+1,
    };
}
export function setVisible(){
    return {
        type: "SET_VISIBLE",
        visible: true
    };
}

export function addMainboard(maincard){
    return {
        type: "ADD_MAINBOARD",
        cardind: {
            maincard : maincard,
            cardnr : 1       
        }
    };
}
export function addSideboard(sidecard){
    return {
        type: "ADD_SIDEBOARD",
        cardindtwo:{
            sidecard: sidecard,
            cardnrtwo:1
        }
    };
}
export function incrementCard(maincard) {   
    console.log("wooo: ", maincard); 
    return {
        type: "INCREMENT_MAINBOARD",
        maincard: maincard
    }; 
    
}
export function decrementCard(maincard) {
    return {
        type: "DECREMENT_MAINBOARD",
        maincard:maincard   
    };
}

export function incrementCardTwo(sidecard) {
    return {
        type: "INCREMENT_SIDEBOARD",
        sidecard: sidecard

    };
}

export function decrementCardTwo(sidecard) {
    return {
        type: "DECREMENT_SIDEBOARD",
        sidecard: sidecard
    };
}
export function setInitialCard(){
    return {
        type: "SET_CARD",
        cardnr: 1,
        cardnrtwo: 1
    };
}
export async function getDecks() {
    const { data } = await axios.get("/getDecks/");
    return {
        type: "GET_DECKS",
        decks: data.data
    };
}

export async function hideIt(){
    return {
        type: "HIDE_TWO",
        leftmodalvisibletwo: false
    };
}


export async function addDeck(deckname, maindeck, sidedeck){  
    await axios.post("/newdeck", {
        deckname: deckname,
        mainboard: maindeck,
        sideboard: sidedeck
    });
    return {
        type: "ADD_DECK",
        sideboard: [],
        mainboard: [],
        deckname: ""
    };
}

