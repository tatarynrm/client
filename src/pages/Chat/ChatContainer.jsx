import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
const ChatContainer = ({ selectedChat }) => {
  const userData = useSelector((state) => state.auth.data);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    try {
      const { data } = await axios.post("/chat", {
        MESSAGE: message,
        SENDER: userData?.KOD,
        RECEIVER: selectedChat.KOD,
      });
      if (data) {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get("/chat", {
        SENDER: selectedChat.KOD,
        RECEIVER: userData.KOD,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div className="chat__container_inner">
      <p>ChatContainer</p>

      <div className="chat__container-form">
        <textarea
          name="message"
          id=""
          cols="30"
          rows="10"
          value={message}
          style={{ resize: "none" }}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button onClick={sendMessage} className="normal">
          Відправити повідомлення
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
