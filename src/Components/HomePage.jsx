import '../Styles/HomePage.css'
import Logo from "../Images/capyblapy.png"
import { Link } from 'react-router-dom'
export function HomePage() {



    return (
        <>
            <div className="background-homepage">
                <div id="mainLogo">
                    <img src={Logo} alt="Capyblapy" />
                </div>
                <div id="mainTitle">

                    Wishlingo
                </div>
                <div id="slogan">
                    Unlock Languages with US
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