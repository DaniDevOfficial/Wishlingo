import '../Styles/HomePage.css'
import Logo from "../Images/capyblapy.png"
import { Link } from 'react-router-dom'
export function HomePage() {

let funny = 0
function themesong () {
    funny ++
    
}
    return (
        <>
            <div className="background-homepage">
                <div id="mainLogo" onClick={themesong()}>
                    <img src={Logo} alt="Capyblapy" />
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