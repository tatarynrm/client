import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import socket from "../../utils/socket";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const MessageFromAdmin = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const userData = useSelector((state) => state.auth.data);
  useEffect(() => {
    socket.on("show_msg_from_admin", (data) => {
      console.log(data);
      if (userData?.KOD === data.kod) {
        setData({
          ...data,
        });
        setOpen((value) => !value);
      }
    });
  }, [socket, userData]);

  return (
    <>
      <Modal
        title={`Системне повідомлення`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        // onCancel={() => setOpen(false)}
        width={1000}
        cancelButtonProps={{
          disabled: true,
          style: {
            display: "none",
          },
        }}
      >
        <p>{data?.message ? data.message : ""}</p>
      </Modal>
    </>
  );
};

export default MessageFromAdmin;
