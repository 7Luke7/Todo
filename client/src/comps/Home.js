import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    getItems();
  });

  const getItems = async () => {
    const response = await axios.get("http://localhost:5004/todoItems");
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const addTodo = async (text) => {
    const response = await axios.post("http://localhost:5004/add", {
      inpText: text,
    });
    if (response.status === 200) {
      toast.success(response.data);
      setInputText("");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText) {
      toast.error("Please fill all the line");
    } else {
      addTodo(inputText);
    }
  };

  const remove = async (id) => {
    const res = await axios.delete(`http://localhost:5004/todoItems/${id}`);
    if (res.status === 200) {
      getItems();
      toast.success(res.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const deleteTodo = (id) => {
    remove(id);
  };

  const clearHandler = async () => {
    const res = await axios.delete("http://localhost:5004/clearItems");
    if (res.status === 200) {
      toast.success(res.data);
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="box" id="heading">
        <h1>Todo App</h1>
        <h1 style={{ color: "red" }}>Welcome!</h1>
      </div>
      <div className="box">
        <div>
          <button className="clearBTN" onClick={clearHandler}>
            clear
          </button>
        </div>
        {data &&
          data.map((item) => {
            return (
              <div className="item">
                <button onClick={() => deleteTodo(item._id)} className="remBTN">
                  -
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        <form action="" className="item" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Item"
            autoComplete="off"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
