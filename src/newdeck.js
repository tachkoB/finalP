/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideItTwo, setInitialCard, leftModalVisibleThree } from "./actions";
import LeftModalThree from "./leftmodalthree";
import Mainboard from "./mainboard";

export default function NewDeck(props) {
    const leftthree = useSelector(state => state.leftmodalvisiblethree);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setInitialCard());
    }, []);

    useEffect(() => {
        dispatch(hideItTwo());
    }, []);

    return (
        <div>
            <div className="main">
                <div className="completeBackground">
                    <div className="header">
                        <img
                            className="hamby"
                            onClick={e => dispatch(leftModalVisibleThree())}
                            src="/hamburger.png"
                        />
                    </div>
                    <img className="nickyB" src="/statsbkg.png" />
                    <Mainboard />

                    {leftthree && <LeftModalThree />}
                </div>
            </div>
        </div>
    );
}
