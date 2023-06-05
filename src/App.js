import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, settodos] = useState();
  const [input, setInput] = useState("");
  useEffect(() => {
    gettodos();
  }, []);
  const addItem = async () => {
    if (input.length == 0) {
      alert("Please Enter Your todo");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/add-todo", {
        todo: input,
      });
      settodos([...todos, res.data]);
      setInput("");
    } catch (error) {
      console.log(`error -> ${error}`);
    }
  };
  const gettodos = async () => {
    try {
      const new_todos = await axios.get("http://localhost:3000/get-todos");
      settodos(new_todos.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };
  const handleDelete = async (_id) => {
    try {
      const updated_todos = await axios.delete(
        "http://localhost:3000/delete-todo/" + _id
      );

      const updated_array = todos.filter((todo) => todo._id != _id);
      settodos(updated_array);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="input">
        <div>
          <svg
            className="bar"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>

          <input
            className="text_field"
            name="todo"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          ></input>
          <svg
            onClick={addItem}
            className="arrow"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </div>
        <div style={{ marginTop: 20 }}>
          {todos &&
            todos.map((todo, index) => (
              <div className="todos" key={index}>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    backgroundColor: "#a8662c",
                    color: "white",
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 40,
                    marginTop: 16,
                  }}
                />
                <h4>{todo.todo}</h4>
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  style={{
                    backgroundColor: "#a8662c",
                    color: "white",
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 40,
                    marginTop: 16,
                  }}
                  onClick={() => {
                    handleDelete(todo._id);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
