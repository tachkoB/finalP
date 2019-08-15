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
        rightmodalvisible:false
    };
}
export async function leftModalVisible(){
    return {
        type: "LEFT_MODAL",
        leftmodalvisible: true
    };
}
export async function rightModalVisible(){
    return {
        type: "RIGHT_MODAL",
        rightmodalvisible: true
    };
}
export async function shrouder(){
    return {
        type: "SHROUDER",
        leftmodalvisible: false,
        rightmodalvisible:false
    };
}
export async function middleModal(){
    return {
        type: "MIDDLE_MODAL",
        restartlink: "restart.png",
        upperlink: "upperopen.png",
        lowerlink: "loweropen.png",
        logovisible:false
    };
}
// export async function win(){
//     return {
//         type: "WIN",

//     };
// }
// export async function lose(){
//     return {
//         type: "LOSE",
        
//     };
// }



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
    const { data } = await axios.get("/getDecks");
    console.log("data in action     yolo:", data);
    return {
        type: "GET_DECKS",
        decks: data.data
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

