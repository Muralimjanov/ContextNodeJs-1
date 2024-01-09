import React, { useState, useContext, useEffect } from "react";
import services from "../../services/services";
import { MyContext } from "../../context/my-context/my-context";

const MainPage = () => {
    const [text, setText] = useState("");
    const { userId, createPost, todos } = useContext(MyContext);
    const createTodoHandler = async (e) => {
        e.preventDefault();
        await services.createTodo(text, userId, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        setText("");
    };

    useEffect(() => {
        const getTodo = async () => {
            const data = await services.todoGet(userId);
            createPost(data.data);
        };
        getTodo();
    }, [todos]);

    const deleteTodo = async (id) => {
        await services.todoRemove(id, {
            headers: { "Content-Type": "application" },
        });
    };
    const completeTodo = async (id) => {
        console.log(id)
        await services.todoCompleted(id, {
            headers: {
                'Content-Type': 'application'
            }
        })
    }
    const importantTodo = async (id) => {
        console.log(id)
        await services.todoImportant(id, {
            headers: {
                'Content-Type': 'application'
            }
        })
    }

    return (
        <div className="container">
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form onSubmit={createTodoHandler} className="form form-login">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                onChange={(e) => setText(e.target.value)}
                                name="text"
                                className="validate"
                                id=""
                            />
                            <label htmlFor="text">Задача:</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn blue" type="submit">
                            Дабавить
                        </button>
                    </div>
                </form>
                <h3>Активные Задачи:</h3>
                <div className="todos">
                    {todos.map((elem, index) => {
                        let text = ["row flex todos-item"]
                        if (elem.completed) {
                            text.push("completed")
                        }
                        if (elem.important) {
                            text.push("important")
                        }
                        return (
                            <div className={text.join(" ")} key={index} >
                                <div className="col todos-num">{index + 1}</div>
                                <div className="col todos-text">{elem.text}</div>
                                <div className="col todos-buttons ">
                                    <i onClick={() => completeTodo(elem._id)} className="material-icons blue-text">check</i>
                                    <i onClick={() => importantTodo(elem._id)} className="material-icons orange-text">warning</i>
                                    <i
                                        onClick={() => deleteTodo(elem._id)}
                                        className="material-icons red-text"
                                    >
                                        delete
                                    </i>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
