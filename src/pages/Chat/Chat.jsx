import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Chat.scss";
import { useEffect, useState } from "react";
import { fetchActiveUsers } from "../../redux/slices/users";
import ChatSelect from "./ChatSelect";
import messagesPreloader from "../../assets/messages.gif";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [department, setDepartment] = useState("Усі працівники");
  const [activeTab, setActiveTab] = useState(false);
  useEffect(() => {
    dispatch(fetchActiveUsers());
  }, []);
  return (
    <div className="chat container">
      <div className="chat__inner">
        <aside className="chat__asside">
          <div className="chat__users">
            <input
              placeholder="Пошук"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="search__input"
            />
            <ChatSelect department={department} setDepartment={setDepartment} />
            <div className="chat__title">{department}</div>
            {users.items
              ? users.items

                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.PRIZV.toLowerCase().includes(search) ||
                          item.IMJA.toLowerCase().includes(search) ||
                          item.IMJA.toUpperCase().includes(search);
                  })

                  .map((item, idx) => {
                    return (
                      <div
                        onClick={() => {
                          setActiveTab(item);
                          setSelectedChat(item);
                        }}
                        className={`chat__user-container ${
                          activeTab === item ? "active" : ""
                        }`}
                        key={idx}
                      >
                        <div className={`chat__user user-${item.KOD}`}>
                          <div className="chat__user-name">
                            {item.PRIZV} {item.IMJA}
                          </div>
                          <div className="chat__user-from">Відділ</div>
                          <div className="chat__user-status"></div>
                        </div>
                      </div>
                    );
                  })
              : "Завантаження"}
          </div>
        </aside>
        <div className="chat__container">
          {selectedChat ? (
            <div>
              <div className="chat__with">
                Чат з{" "}
                <b>
                  {selectedChat.IMJA} {selectedChat.PRIZV}
                </b>
              </div>
              <ChatContainer selectedChat={selectedChat} />
            </div>
          ) : (
            <div className="chat__container-preloader">
              <img
                style={{ width: "100px" }}
                src={messagesPreloader}
                alt="messages"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
