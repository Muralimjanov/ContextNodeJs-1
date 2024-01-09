import "./App.css";
import Navbar from "./components/navbar";
import RegisterPage from "./pages/registerPage/registerPage";
import AuthPage from "./pages/authPage/authPage";
import MainPage from "./pages/mainPage/mainPage";
import { MyContext } from "./context/my-context/my-context";
import React, { useContext, useEffect } from "react";

const App = () => {
    const { isReady, login, token } = useContext(MyContext);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"));
        if (data && data.token) {
            login(data.token, data.id)
        }
    }, []);

    if (isReady === 1) {
        return <AuthPage />;
    }
    if (isReady === 2) {
        return <RegisterPage />;
    }
    if (token === null) {
        return <AuthPage />;
    }
    return (
        <div className="app">
            <Navbar />
            <MainPage />
        </div>
    );
};

export default App;
