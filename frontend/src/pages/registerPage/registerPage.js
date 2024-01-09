import React, { useState, useContext } from 'react';
import services from '../../services/services';
import { MyContext } from "../../context/my-context/my-context";

const RegisterPage = () => {
    const { IsActive } = useContext(MyContext)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })


    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const registerHandler = async (e) => {
        e.preventDefault()
        console.log("register>>>", form);
        try {
            const data = await services.registerService({ ...form },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            console.log("data>>>", data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div className="container">
                <div className="auth-page">
                    <h3>Регистрация</h3>
                </div>
                <form onSubmit={registerHandler} className="form form-login">
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={changeHandler} type="email" name="email" className="validate" />
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={changeHandler} type="password" name="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                            type='submit'
                            className="btn blue waves-effect waves-light"
                        >Регистрация</button>
                        <span onClick={() => IsActive(1)}>Уже есть аккаунт ?</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage