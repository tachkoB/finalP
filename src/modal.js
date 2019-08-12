import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { setInitial } from "./actions";

export default function Modal() {
    const dispatch = useDispatch();

    return (

        <div className="modal">
            <div>Lose</div>
            <div onClick={e => dispatch(setInitial())}>Restart</div>
            <div>Win</div>
        </div>
    );
}