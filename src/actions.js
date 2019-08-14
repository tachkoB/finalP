export function setInitial() {
    return {
        type: "SET_INITIAL",
        count: 20,
        counttwo:20,
        visible:false
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
