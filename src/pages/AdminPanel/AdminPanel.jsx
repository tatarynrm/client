import React, { useEffect } from "react";
import "./AdminPanel.scss";
import { useState } from "react";
import socket from "../../utils/socket";
import UsersActions from "../../components/admin_components/UsersActions";
import { useSelector } from "react-redux";
const AdminPanel = () => {
  const userData = useSelector(state =state.auth.data);
  const [textToAllUsers, setTextToAllUsers] = useState("");
  const [activeUsers, setActiveUsers] = useState();

  const [message, setMessage] = useState("");
  const fetchActiveUsers = () => {
    socket.emit("activeUsers");
  };
  const reloadWindow = () => {
    socket.emit("windowReload");
  };
  const handleSubmitMessages = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Відправити повідомлення усім активним користувачам?")) {
      socket.emit("textToAllUsers", textToAllUsers);
    }
  };
  useEffect(() => {
    socket.on("showActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);
  const sendMessageToUser = (item) => {
    socket.emit("admin_msg_user", {
      message: message,
      id: item.socketId,
      kod: item.userId,
    });
  };
  return (
    <div className="admin container">
      <div className="admin__inner">
        <div className="admin__nav">
          <div className="fast__buttons">
            <button onClick={fetchActiveUsers} className="normal">
              Активні юзери
            </button>
            <button onClick={reloadWindow} className="normal">
              Перезавантажити сторінки
            </button>
          </div>
          <div className="admin__messages-to-users">
            <form onSubmit={handleSubmitMessages}>
              <div className="form__control">
                <input
                  type="text"
                  onChange={(e) => setTextToAllUsers(e.target.value)}
                  value={textToAllUsers}
                />
              </div>
              <button className="normal">Відправити</button>
            </form>
          </div>
        </div>

        <div className="admin__container">
          {activeUsers ? (
            <div className="active__users">
              <span>
                <b>
                  Користувачів на сайті:
                  <span style={{ color: "red" }}> {activeUsers.length}</span>
                </b>
              </span>
              {activeUsers && (
                <div className="active__users-block">
                  <div className="user__info">КОД ПРАЦІВНИКА</div>
                  <div className="user__info">ПІБ</div>
                  <div className="user__info">EMAIL</div>
                  <div className="user__info">STATUS: ONLINE</div>
                </div>
              )}
              {activeUsers
                .filter((item) => item.userId !== undefined)
                .map((item, idx) => {
                  return (
                    <UsersActions
                      item={item}
                      key={idx}
                      message={message}
                      setMessage={setMessage}
                      sendMessageToUser={sendMessageToUser}
                    />
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
