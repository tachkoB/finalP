import { statement } from "@babel/template";

export default function(state = {}, action) {
    if (action.type == "SET_INITIAL") {
        state = {
            ...state,
            count: action.count,
            counttwo: action.counttwo,
            visible: action.visible,
            logolink: action.logolink,
            modalleft: action.modalleft,
            modalright: action.modalright,
            upperlink: action.upperlink,
            lowerlink: action.lowerlink,
            logovisible: action.logovisible,
            restartlink: action.restartlink,
            winlink: action.winlink,
            loselink: action.loselink,
            leftmodalvisible: action.leftmodalvisible,
            deckname: action.deckname
        };
    }
    if (action.type == "LEFT_MODAL"){
        state= {
            ...state,
            leftmodalvisible: action.leftmodalvisible
        };
    }
    if (action.type == "RIGHT_MODAL"){
        state = {
            ...state,
            rightmodalvisible: action.rightmodalvisible
        };
    }
    if (action.type =="SHROUDER"){
        state= {
            ...state,
            leftmodalvisible:action.leftmodalvisible,
            rightmodalvisible:action.rightmodalvisible,
            leftmodalvisibletwo: action.leftmodalvisibletwo
        };
    }

    if (action.type == "MIDDLE_MODAL") {
        state= {
            ...state,
            logolink: action.logolink,
            upperlink: action.upperlink,
            lowerlink: action.lowerlink,
            logovisible: action.logovisible,
            restartlink:action.restartlink,
            middlemodal: action.middlemodal,
            winlink: action.winlink,
            loselink: action.loselink
        };
    }
    if(action.type=="SET_CARD"){
        state = {
            ...state,
            cardnr:action.cardnr,
            cardnrtwo:action.cardnrtwo
        };
    }
    if(action.type == "PLONE_REDUCE") {
        state = {
            ...state,
            count:action.count
        };
    }
    if(action.type == "PLONE_ADD") {
        state = {
            ...state,
            count:action.count
        };
    }
    if(action.type == "PLTWO_REDUCE") {
        state = {
            ...state,
            counttwo:action.counttwo
        };
    }
    if(action.type == "PLTWO_ADD") {
        state = {
            ...state,
            counttwo:action.counttwo
        };
    }
    if(action.type == "SET_VISIBLE") {
        state = {
            ...state,
            visible: action.visible        
        };
    }
    if(action.type == "ADD_MAINBOARD"){
        if(state.maincard){  
            state= {
                ...state,
                maincard: [...state.maincard, action.cardind]
            };
        } else if (!state.maincard){
            state= {
                ...state,
                maincard: [action.cardind]
            };
        }
    }

    if(action.type == "ADD_SIDEBOARD"){
        if(state.sidecard){  
            state= {
                ...state,
                sidecard: [...state.sidecard, action.cardindtwo]
            };
        } else if (!state.sidecard){
            state= {
                ...state,
                sidecard: [action.cardindtwo]
            };
        }
    }

    
    if(action.type == "INCREMENT_MAINBOARD") {
        return {
            ...state,
            maincard: state.maincard.map(
                card => {
                    if (card.maincard == action.maincard) {
                        return {
                            ...card,
                            cardnr: card.cardnr + 1
                        };
                    } else {
                        return card;
                    }
                }
            )
        };
    }
    
    if(action.type == "DECREMENT_MAINBOARD") {
        return {
            ...state,
            maincard: state.maincard.map(
                card => {
                    if (card.maincard == action.maincard) {
                        return {
                            ...card,
                            cardnr: card.cardnr - 1
                        };
                    } else {
                        return card;
                    }
                }
            )
        };
    }
    if(action.type == "INCREMENT_SIDEBOARD") {
        return {
            ...state,
            sidecard: state.sidecard.map(
                card => {
                    if (card.sidecard == action.sidecard) {
                        return {
                            ...card,
                            cardnrtwo: card.cardnrtwo + 1
                        };
                    } else {
                        return card;
                    }
                }
            )
        };
    }


    if(action.type=="LEFT_MODALTWO"){
        return {
            ...state,
            leftmodalvisibletwo:action.leftmodalvisibletwo


        };
    }
    if(action.type == "DECREMENT_SIDEBOARD") {
        return {
            ...state,
            sidecard: state.sidecard.map(
                card => {
                    if (card.sidecard == action.sidecard) {
                        return {
                            ...card,
                            cardnrtwo: card.cardnrtwo - 1
                        };
                    } else {
                        return card;
                    }
                }
            )
        };
    }
    if(action.type == "SET_INITIALTWO"){
        return { ...state,
            count: action.count,
            counttwo: action.counttwo,
            visible: action.visible,
            logolink: action.logolink,
            modalleft: action.modalleft,
            modalright: action.modalright,
            upperlink: action.upperlink,
            lowerlink: action.lowerlink,
            logovisible: action.logovisible,
            restartlink: action.restartlink,
            winlink: action.winlink,
            loselink: action.loselink,
            leftmodalvisible: action.leftmodalvisible,
            deckname: action.deckname
        };
    }
    if(action.type == "WIN"){
        return {
            ...state,
            logovisible:action.logovisible,
            middlemodal:action.middlemodal,
            count: action.count,
            counttwo: action.count,
            logolink: action.logolink,
            upperlink: action.upperlink,
            lowerlink: action.lowerlink        
        };
    }
    if(action.type =="LOSS"){
        return {
            ...state,
            logovisible:action.logovisible,
            middlemodal:action.middlemodal,
            count: action.count,
            counttwo: action.count,
            logolink: action.logolink,
            upperlink: action.upperlink,
            lowerlink: action.lowerlink        
        };
    }
 
    if(action.type=="SELECT_DECK"){
        return {
            ...state,
            deckname: action.deckname,
            deckid: action.deckid,
            rightmodalvisible: action.rightmodalvisible
        };
    }
    if(action.type == "ADD_DECK"){
        return {
            ...state,
            sidecard: action.sideboard,
            maincard: action.mainboard,
            deckname: action.deckname,

        };
    }
    if(action.type == "GET_DECKS"){
        return {
            ...state,
            decks: action.decks
        };    
    }
    if(action.type == "HIDE_TWO"){
        return {
            ...state,
            leftmodalvisibletwo: action.leftmodalvisibletwo
        };
    }
    return state;
}   





