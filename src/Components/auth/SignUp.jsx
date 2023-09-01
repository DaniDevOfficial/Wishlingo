import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import '../../Styles/Auth.css';
import { Link } from "react-router-dom";

export function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function HandleSignup(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="background-Account">
            <form className="SignInForm" onSubmit={HandleSignup}>
                <h1 id="mainTitle">Sign up</h1>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button type="submit" id="startLearningButton">Sign up</button>

            </form>
        </div>
    );
}
