import React from "react";
import { useState } from "react";

const UsersActions = ({
  item,

  message,
  sendMessageToUser,
  setMessage,
}) => {
  const [action, setAction] = useState(false);
  return (
    <React.Fragment>
      <div className="user">
        <div className="user__info">{item.userId}</div>
        <div className="user__info">{item.PIP}</div>
        <div className="user__info">{item.MAIL}</div>
        <div className="user__info">{item.DB_PASSWD}</div>
        <button
          className="normal"
          onClick={(e) => setAction((value) => !value)}
        >
          {action ? "Приховати" : "Виконати дії"}
        </button>
      </div>
      {action && (
        <div className="admin__user-action">
          <div className="admin__send-message">
            <textarea
              name="admin_text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={() => sendMessageToUser(item)} className="normal">
              Написати {item.PIP}
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UsersActions;
