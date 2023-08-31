import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import '../../Styles/Auth.css';

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); 
        });

        return () => unsubscribe();
    }, []);

    function handleSignIn(e) {
        e.preventDefault();
        setIsLoading(true);
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log("User signed in:", userCredentials.user);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Sign-in error:", error);
                setError("Invalid email or password. Please try again.");
                setIsLoading(false);
            });
    }

    function handleSignOut() {
        signOut(auth)
            .then(() => {
                console.log("User signed out.");
            })
            .catch((error) => {
                console.error("Sign-out error:", error);
            });
    }

    return (
        <div className="background-Account">
            <form className="SignInForm" onSubmit={handleSignIn}>
                {user ? ( // If logged in
                    <div className="loggedInContent">
                        <p className="loggedinText">Logged in as: {user.email}</p>
                        <Link to="/learn" className="startLearningButton">Start Learning</Link>
                        <button onClick={handleSignOut} className="logoutButton">Log Out</button>
                    </div>
                ) : ( // If not logged in
                    <>
                        <h1 id="mainTitle">Log In</h1>
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
                        <button type="submit" id="startLearningButton" disabled={isLoading}>
                            {isLoading ? "Logging In..." : "Log In"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        <p className="demo-credentials">
                        Demo Account: demo@demo.com <br />
                        Password: demo123
                    </p>
                    </>
                )}
            </form>
        </div>
    );
}
