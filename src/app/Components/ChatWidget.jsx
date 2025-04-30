"use client"
import { useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: input });
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-4 border rounded-lg">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ask me anything..."
      />
      <button onClick={sendMessage} className="w-full bg-blue-500 text-white p-2 mt-2 rounded">
        Send
      </button>
    </div>
  );
}
