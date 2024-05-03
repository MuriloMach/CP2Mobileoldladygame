import Splash from "../components/SplashScreen";
import { useEffect, useState } from "react";
import NoAuthNavigator from "./NotAuthNavigator";
import AuthNavigator from "./AuthNavigator";
import {getAuth, onAuthStateChanged } from "firebase/auth";

const MainNavigator = () => {
    const [isAuth, setIsAuth] = useState();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, 
            (user) => {
                if (user) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            }
        );
    }, [])

    const Navigator = isAuth ?
        AuthNavigator :
        NoAuthNavigator

    return (
            isAuth === undefined ?
                <Splash /> :
                <Navigator />
    )
}

export default MainNavigator;