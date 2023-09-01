import '../Styles/HomePage.css'
import Logo from "../Images/capyblapy.png"
import { Link } from 'react-router-dom'
import { useState } from 'react';
import themeSong from './Sound/themeSong.mp3';
export function HomePage() {
    const [counter, setCounter] = useState(0);
    const [audio] = useState(new Audio(themeSong));
        if(counter === 50){
            audio.play(); // is kinda loud. Pay attention
        }
    return (
        <>
            <div className="background-homepage">
                <div id="mainLogo">
                    <img src={Logo} alt="Capyblapy" onClick={() => setCounter(counter + 1)}/>
                </div>
                <div id="mainTitle">

                    Wishlingo
                </div>
                <div id="slogan">
                    Unlock Languages with us
                </div>
                <Link to={"/learn"}>
                <button id="startLearningButton">
                    <div id="startLearningText">
                        Start Learning Now
                    </div>
                </button>
                </Link>
            </div>
        </>
    )
}