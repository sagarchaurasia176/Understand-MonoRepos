"use client"
// chat components
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
//connect to web-socket form the backend
const socketConnection = io("http://localhost:5000");


// chat-message handler
const ChatHandler = () => {
    const [message, setMessage] = useState<String[]>([]);
    const [input, setInput] = useState(""); //for the input purposes

    //useEffect for rendering the component one by one
    useEffect(() => {
        //Listen for message from the server
        socketConnection.on("chat message", (msg) => {
            setMessage((prev) => [...prev, msg]);
        });

        return () => {
            socketConnection.off("chat message"); // clen the  listener
        };
    }, []);

    //send-message handler
    const sendMessgae = () => {
        if (input.trim()) {
            //the info goes to the server
            socketConnection.emit("chat message", input);
            //update the states
            setInput(" "); //clear the inp-field
        }
    };

    return (
        <>
            <div
                style={{
                    padding: "20px",
                }}
            >
                <h1>React Chat Application</h1>
                <div style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    height: "300px",
                    overflow: "scroll",
                    marginBottom: "10px"
                }}>
                    {/* message show up here */}
                    {message.map((msg, index) => (
                        <>
                            <div key={index} >
                                {msg}
                            </div>
                        </>
                    ))}
                </div>

                {/* small input field */}
                <input type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    style={{
                        padding: "10px",
                        width: "calc(100%-120px)",
                        marginRight: "10px"
                    }}
                />

                {/* send the message */}
                <button
                    style={{ padding: "10px 20px" }}
                    onClick={sendMessgae}>
                    send message
                </button>
            </div>
        </>
    );
};


export default ChatHandler