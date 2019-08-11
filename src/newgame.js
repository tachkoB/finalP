import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function NewGame() {

    const [count, setCount] = useState(20);
    const [countTwo, setCountTwo] = useState(20);


    return (

        <div>
            <div className="playerOne">
                <div className="gameContainer">  
                    <div>
                        <p className="plus" onClick={() => setCount(count + 1)}>+</p>
                    </div>
                    <div className=" reverse">
                        <p className="lifeTotal" >{count}</p>
                    </div>
                    <div >
                        <p className="minus" onClick={() => setCount(count - 1)}>-</p>
                    </div>  
                </div>
            </div>

            <div className="midBar">Tu ce doc ikona</div>

            <div className="playerTwo">
                <div className="gameContainer">
                    <div >
                        <p className="minus" onClick={() => setCountTwo(countTwo - 1)}>-</p>
                    </div>
                    <div>
                        <p className="lifeTotal">{countTwo}</p>
                    </div>
                    <div>
                        <p className="plus" onClick={() => setCountTwo(countTwo + 1)}>+</p>
                    </div>
                </div>
            </div>
        </div>
    );
}