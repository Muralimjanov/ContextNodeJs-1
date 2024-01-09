import React, { useState, useContext } from "react";
import services from "../../services/services";
import { MyContext } from "../../context/my-context/my-context";

const AuthPage = () => {
    const { login, IsActive } = useContext(MyContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        IsActive(1);

        try {
            const data = await services.loginService(
                { ...form },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            console.log(data);
            login(data.data, data.data.userId);
            IsActive(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="container">
                <div className="auth-page">
                    <h3>Авторизация</h3>
                    <form onSubmit={registerHandler}
                        className="form form-login"
                    >
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    onChange={changeHandler}
                                    type="email"
                                    name="email"
                                    className="validate"
                                />
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={changeHandler}
                                    name="password"
                                    type="password"
                                    className="validate"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <button
                                type="submit"
                                className="btn blue waves-effect waves-light"
                            >Войти</button>
                            <span onClick={() => IsActive(2)} className="btn-outline btn-reg">
                                Нет аккаунта ?
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AuthPage;