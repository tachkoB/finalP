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