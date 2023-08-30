import React, { useEffect, useRef } from "react";
import "./AdminPanel.scss";
import { useState } from "react";
import socket from "../../utils/socket";
import UsersActions from "../../components/admin_components/UsersActions";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { SiGooglemeet } from "react-icons/si";
import { useDispatch } from "react-redux";
import { fetchGoogleMeetLink } from "../../redux/slices/events";
import DatePicker, { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/uk";
registerLocale("uk", uk);
const AdminPanel = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const [textToAllUsers, setTextToAllUsers] = useState("");
  const [activeUsers, setActiveUsers] = useState(null);
  const [message, setMessage] = useState("");
  const [usersGroups, setUsersGroups] = useState(null);
  const [allTgUsers, setAllTgUsers] = useState([]);
  const events = useSelector((state) => state.events.events.items);
  const [choosenUsers, setChoosenUsers] = useState([]);
  const [activeUsersCompare, setActiveUsersCompare] = useState([]);
  const [googleMeetLink,setGoogleMeetLink] = useState([])
  const [nachVid,setNachVid] = useState([])
  const [dateTime, setDateTime] = useState("");
  const [meetTitle, setMeetTitle] = useState("");
  console.log(nachVid);


  const showActiveUsersAtList = () => {
    socket.emit("activeUsersToCompare");
  };

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };
  const handleMeetTitleChange = (event) => {
    setMeetTitle(event.target.value);
  };
  const setUsersToChosen = (item) => {
    if (choosenUsers.includes(item)) {
      setChoosenUsers(
        choosenUsers.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setChoosenUsers([...choosenUsers, item]);
    }
  };

  const selectAllChoosenUsers = (item) => {
    setChoosenUsers([]);
    setChoosenUsers(item);
  };
  const unSelectAllChoosenUsers = (item) => {
    setChoosenUsers([]);
    setChoosenUsers(item);
  };

  const startGoogleMeet = (statusGoogleMeet) => {
    switch (statusGoogleMeet) {
      case 1:
        if (window.confirm("Розпочати миттєву нараду з усіма?")) {
          socket.emit("startGoogleMeet", {
            GOOGLEMEET: googleMeetLink,
            status: 1,
            users:allTgUsers
          });
        }
        break;
      case 2:
        if (window.confirm("Розпочати миттєву нараду з обраними менеджерами?")) {
          socket.emit("startGoogleMeet", {
            GOOGLEMEET: googleMeetLink,
            status: 2,
            users:choosenUsers
          });
        }
        break;
      case 3:
        if (window.confirm("Розпочати миттєву нараду з активними менеджерами?")) {
          socket.emit("startGoogleMeet", {
            GOOGLEMEET: googleMeetLink,
            status: 3,
          });
        }
        break;
      case 4:
        if (window.confirm("Розпочати  нараду за розкладом з усіма користувачами?")) {
          if (!dateTime & !meetTitle) {
            alert('Заповніть дату та тему наради')
          }else {
            socket.emit("startGoogleMeet", {
              GOOGLEMEET: googleMeetLink,
              status: 4,
              users:allTgUsers,
              date:moment(dateTime).format('LLL'),
              dateToRemind:dateTime,
              title:meetTitle
            });
          }
   
        }
        break;
      case 5:
        if (window.confirm("Розпочати  нараду за розкладом з обраними користувачами?")) {
          if (!dateTime & !meetTitle) {
            alert('Заповніть дату та тему наради')
          }else {
            socket.emit("startGoogleMeet", {
              GOOGLEMEET: googleMeetLink,
              status: 5,
              users:choosenUsers,
              date:moment(dateTime).format('LLL'),
              dateToRemind:dateTime,
              title:meetTitle
            });
          }
   
        }
        break;
      case 6:
        if (window.confirm("Розпочати  нараду за розкладом з активними користувачами?")) {
          if (!dateTime & !meetTitle) {
            alert('Заповніть дату та тему наради')
          }else {
            socket.emit("startGoogleMeet", {
              GOOGLEMEET: googleMeetLink,
              status: 6,
              date:moment(dateTime).format('LLL'),
              dateToRemind:dateTime,
              title:meetTitle
            });
          }
   
        }
        break;

      default:
        break;
    }

  };
  const fetchActiveUsers = () => {
    if (activeUsers === null) {
      socket.emit("activeUsers");
      setUsersGroups(null);
    } else {
      setActiveUsers(null);
      setUsersGroups(null);
    }
  };
  const reloadWindow = () => {
    socket.emit("windowReload");
  };
  const handleSubmitMessages = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Відправити повідомлення усім активним користувачам?")) {
      socket.emit("textToAllUsers", {
        textToAllUsers,
        user: userData.PIP,
        activeUsers,
      });
      await axios.post("/events/create-mess-all", {
        pKodAutor: userData?.KOD,
        pMess: textToAllUsers,
      });
      setMessage("");
    }
  };
  useEffect(() => {
    socket.on("showActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);
  useEffect(() => {
    socket.on("showActiveUsersToCompare", (data) => {
      setActiveUsersCompare(data);
    });
  }, [activeUsersCompare]);
  const sendMessageToUser = (item) => {
    socket.emit("admin_msg_user", {
      message: message,
      id: item.socketId,
      kod: item.userId,
      user: userData.PIP,
    });
    setTextToAllUsers("");
  };
  const logoutAll = () => {
    if (window.confirm("Вийти усім користувачам з системи ?")) {
      socket.emit("logoutAll");
    }
  };
  const groupUsers = async () => {
    try {
      if (usersGroups === null) {
        const { data } = await axios.get("/users/managers");
        setUsersGroups(data);
        setActiveUsers(null);
      } else {
        setUsersGroups(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTgUsers = async () => {
    try {
      if (usersGroups === null) {
        const { data } = await axios.get("/users/os-managers-tg");

        setAllTgUsers(data);
      } else {
        setUsersGroups(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [events]);
  useEffect(() => {}, [activeUsersCompare]);

  return (
    <div className="admin container">
      <div className="admin__inner">
        <div className="admin__nav">
          <div className="fast__buttons">
            <button onClick={fetchActiveUsers} className="normal">
              {activeUsers === null
                ? "Активні користувачі"
                : "Приховати активних користувачів"}
            </button>
            <button onClick={() => groupUsers()} className="normal">
              {usersGroups === null
                ? "Права корисутвання"
                : "Приховати права користування"}
            </button>

            <button onClick={reloadWindow} className="normal">
              Перезавантажити сторінки
            </button>
            <button onClick={logoutAll} className="danger">
              Вийти усім з аккаунтів!!!
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
              <button className="normal">Надіслати усім</button>
            </form>
          </div>
          {userData?.GOOGLEMEET && (
            <div className="google__meet">
              {/* <button onClick={startGoogleMeet} className="normal google__meet-button"> */}
              <button
                onClick={getAllTgUsers}
                className="normal google__meet-button"
              >
                <i>
                  <SiGooglemeet />
                </i>
                Розпочати нараду
              </button>
            </div>
          )}
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
                .sort((a, b) => a.PIP.localeCompare(b.PIP))
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
          {usersGroups ? (
            <div className="active__users">
              {usersGroups
                .sort((a, b) => a.PIP.localeCompare(b.PIP))
                .map((item, idx) => {
                  return <div key={idx}>{item.PIP}</div>;
                })}
            </div>
          ) : null}
        </div>
        {allTgUsers.length > 0 && (
          <div className="google__meet-area">
            <div className="google__meet-choose-users">
              {allTgUsers && (
                <div className="show__active-or-inactive">
                  <button
                    onClick={() =>
                      choosenUsers.length <= 0
                        ? selectAllChoosenUsers(
                            allTgUsers.map((item) => item.TELEGRAMID)
                          )
                        : unSelectAllChoosenUsers(
                            allTgUsers.filter(
                              (item) => item.TELEGRAMID === item
                            )
                          )
                    }
                    className="normal"
                  >
                    {choosenUsers.length > 0
                      ? "Зняти виділення"
                      : "Вибрати усіх"}
                  </button>
                  <button className="normal" onClick={()=>setNachVid(allTgUsers.filter(item=> item.ISNV === 1))}>
                    Начальники відділів
                  </button>
                  <button className="normal" onClick={showActiveUsersAtList}>
                    Показати активних
                  </button>
                </div>
              )}
              {allTgUsers && (
                <div className="all__tg-users">
                  {allTgUsers
                    .sort((a, b) => a.PIP.localeCompare(b.PIP))
                    .map((item, idx) => {
                      return (
                        <div
                          onClick={() => setUsersToChosen(item.TELEGRAMID)}
                          className={`tg__user ${
                            activeUsersCompare.length > 0 &&
                            activeUsersCompare.find(
                              (val) => val.TELEGRAMID == item.TELEGRAMID
                            )
                              ? "tg__user-online"
                              : "tg__user-offline"
                          } ${nachVid.length > 0  && nachVid.find( 
                            val => val.ISNV === item.ISNV
                          )? "tg__user-nach-vid" : "" }`}
                          key={idx}
                        >
                          <input
                            checked={choosenUsers.includes(item.TELEGRAMID)}
                            onChange={() => setUsersToChosen(item.TELEGRAMID)}
                            type="checkbox"
                          />{" "}
                          <span>{item.PIP}</span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div className="google__meet-actions">
              <div className="immidate__meet meet__options">
                <h2>Миттєва нарада</h2>
                <div className="form__control">
                  <input
                    type="text"
                    placeholder="Посилання на нараду"
                    value={googleMeetLink}
                    onChange={e=> setGoogleMeetLink(e.target.value)}
                  />
                </div>
                <div className="tg__users-select">
                  <button onClick={() => startGoogleMeet(1)} className="normal">
                    Розпочати нараду з усіма
                  </button>
                  <button onClick={() => startGoogleMeet(2)} className="normal">
                    Розпочати нараду з обраними користувачами
                  </button>

                  <button onClick={() => startGoogleMeet(3)} className="normal">
                    Розпочати нараду з активними користувачами
                  </button>
                </div>
              </div>

              <div className="time__select meet__options">
                <h2>Нарада за розкладом</h2>

                <div className="form__control">
                  <input
                    type="text"
                    placeholder="Посилання на нараду"
                    value={googleMeetLink}
                    onChange={e=> setGoogleMeetLink(e.target.value)}
                  />
                </div>
                <div className="form__control">
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    value={dateTime}
                    onChange={handleDateTimeChange}
                  />
                </div>
                <div className="form__control">
                  <textarea
                    type="text"
                    placeholder="Тема наради"
                    value={meetTitle}
                    onChange={handleMeetTitleChange}
                  />
                </div>
                <div className="tg__users-select">
                  <button onClick={() => startGoogleMeet(4)} className="normal">Розпочати нараду з усіма</button>
                  <button onClick={() => startGoogleMeet(5)} className="normal">
                    Розпочати нараду з обраними користувачами
                  </button>

                  <button onClick={() => startGoogleMeet(6)} className="normal">
                    Розпочати нараду з активними користувачами
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
