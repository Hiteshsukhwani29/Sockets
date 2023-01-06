import "./App.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { customAlphabet } from "nanoid";

const socket = io("http://localhost:5001");

const nanoid = customAlphabet("1234567890abcdef", 6);
// const uid = nanoid();
const uid = prompt('Please enter your name');

function App() {
  const [Message, setMessage] = useState("");
  const [Chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...Chat, payload]);
    });
  });

  const sendChat = (e) => {
    e.preventDefault();
    console.log("working");
    let date = new Date().toLocaleTimeString().slice(0, 5);
    socket.emit("chat", { Message, uid, date });
    setMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="p-3">Chat App</h2>

        <div class="col-md-6 col-lg-7 col-xl-8">
          <ul class="list-unstyled" style={{ color: "black" }}>
            {Chat.map((payload, index) => {
              return (
                <>
                  {payload.uid === uid ? (
                    <>
                      <li class="d-flex justify-content-between mb-4 mr-4">
                        <div style={{ width: "200px" }} />

                        <div class="card">
                          <div
                            class="card-header d-flex justify-content-between p-2 align-items-center"
                            style={{ fontSize: "16px" }}
                          >
                            <p class="fw-bold mb-0">You</p>
                            <p
                              class="text-muted small mb-0"
                              style={{
                                fontSize: "14px",
                                paddingRight: "2px",
                                paddingLeft: "20px",
                              }}
                            >
                              {payload.date}
                            </p>
                          </div>
                          <div
                            class="p-2"
                            style={{ fontSize: "14px", textAlign: "right" }}
                          >
                            <p class="mb-0">{payload.Message}</p>
                          </div>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li class="d-flex justify-content-between mb-4 mr-4">
                        <div class="card">
                          <div
                            class="card-header d-flex justify-content-between p-2 align-items-center"
                            style={{ fontSize: "16px" }}
                          >
                            <p class="fw-bold mb-0">{payload.uid}</p>
                            <p
                              class="text-muted small mb-0"
                              style={{
                                fontSize: "14px",
                                paddingRight: "2px",
                                paddingLeft: "20px",
                              }}
                            >
                              {payload.date}
                            </p>
                          </div>
                          <div
                            class="p-2"
                            style={{ fontSize: "14px", textAlign: "right" }}
                          >
                            <p class="mb-0">{payload.Message}</p>
                          </div>
                        </div>
                        <div style={{ width: "200px" }} />
                      </li>
                    </>
                  )}
                </>
              );
            })}
          </ul>
        </div>

        <form onSubmit={sendChat}>
          <div className="input-group mb-3 mt-5">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message here..."
              value={Message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button className="btn btn-outline-primary" type="submit">
              Button
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
