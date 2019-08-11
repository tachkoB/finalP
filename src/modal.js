import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Modal() {

    return (

        <div className="modal">
            <div>Lose</div>
            <div>Restart</div>
            <div>Win</div>
        </div>
    );
}