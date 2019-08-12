import { statement } from "@babel/template";

export default function(state = {}, action) {
    if (action.type == "SET_INITIAL") {
        state = {
            ...state,
            count: action.count,
            counttwo: action.counttwo,
            visible: action.visible
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
            visible: action.visible        };
    }

    return state;
}