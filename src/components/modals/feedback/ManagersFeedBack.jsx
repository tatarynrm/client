import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../../utils/socket";
import axios from '../../../utils/axios'

const ManagersFeedBack = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {
    socket.on("show_msg_feedback", (data) => {
      setOpen(true);
    });
  }, [socket, userData]);
//   useEffect(() => {
//     socket.on("feedback_create", () => {
//       setFeedback("");
//       setConfirmation("ok");
//       setTimeout(() => {
//         setOpen(false);
//       }, 1000);
//     });
//   }, [socket, userData]);

  const sendFeedBack = async() => {
try {
    const data = await axios.post('/feedback/create',{
        text:feedback,
        user:userData?.PIP
    })
  if (data.status === 200) {
    setConfirmation('ok')
    setTimeout(()=>{
        setOpen(false)
    },1000)
  }
} catch (error) {
    console.log(error);
}
  };

  useEffect(() => {
    const button = document.querySelector(".ant-modal-footer");

    if (button) {
      button.style.setProperty("display", "none");
      setTimeout(() => {
        button.style.setProperty("display", "block");
      }, 3000);
    }
  }, []);
  return (
    <>
      <Modal
        title={`Опитування.
        
        
        \nПотрібно вносити якісь зміни на сайті ? Якщо потрібно то які ?`}
        centered
        open={open}
        onOk={() => {
          sendFeedBack();

          // setOpen(false)
        }}
        okText={"Надіслати відгук"}
        cancelText={"Відмовитись від опитування"}
        // onCancel={() => setOpen(false)}
        width={1000}
        cancelButtonProps={{
          disabled: true,
          style: {
            display: "none",
          },
        }}
      >
        <h3>
          Якщо вас все влаштовує,залиште поле пустим та натисність кнопку
          "Надіслати відгук".
        </h3>
        <textarea
          style={{ resize: "none", padding: "1rem" }}
          id=""
          cols="100"
          rows="10"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <p>{data?.message ? data.message : ""}</p>

        <span style={{ color: "green", fontSize: "20px" }}>
          {confirmation ? "Відгук успішно відправлено." : null}
        </span>
      </Modal>
    </>
  );
};

export default ManagersFeedBack;
