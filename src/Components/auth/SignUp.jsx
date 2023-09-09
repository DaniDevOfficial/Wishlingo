import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../Styles/Auth.css';

export function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function HandleSignup(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                toast.success("Your Account Got Created!! Start Learning");
                navigate('/signin');
            }).catch((error) => {
                toast.error("Something went wrong" + error);
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
                    minLength={8}
                />
                <button type="submit" id="startLearningButton">Sign up</button>

            </form>
        </div>
    );
}
