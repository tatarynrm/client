import { useEffect, useState } from "react";
import "./LogisticWork.scss";
import ZapComments from "../../components/zap/ZapComments";
import "moment/locale/uk";
import toTimestamp from "../../helpers/functions";
import "react-toastify/dist/ReactToastify.css";
import AddZap from "../../components/zap/AddZap";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  changeCommentsCount,
  deleteReduxZap,
  fetchGroups,
  fetchZap,
  refreshReduxZap,
  showEditReduxZap,
  showEditReduxZapCarCount,
  showEditReduxZapText,
} from "../../redux/slices/zap";
import { notifyCommentZap } from "../../utils/toasts";
import socket from "../../utils/socket";
import ZapItem from "../../components/zap/ZapItem";

import { editZapAddSlice } from "../../redux/slices/edit";
import axios from "../../utils/axios";

import ActiveUsersList from "../../components/users/ActiveUsersList";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const LogisticWork = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const groups = useSelector((state) => state.zap.zap.groups);
  const zap = useSelector((state) => state.zap.zap.items);
  const addZapSuccess = useSelector((state) => state.edit.addZapSuccess);
  const [commentsClass, setCommentsClass] = useState(false);
  const [selectedZap, setSelectedZap] = useState(null);
  const [addZap, setAddZap] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const zapAddSlice = useSelector((state) => state.edit.zapAddSlice);
  const [myZapSelect, setMyZapSelect] = useState(false);
  const [editZap, setEditZap] = useState(false);
  const [activeUsers, setActiveUsers] = useState(null);
  const [showActiveUsers, setShowActiveUsers] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [openManager, setOpenManager] = useState(false);
  const [choosenUsers, setChoosenUsers] = useState([]);
  const [cinaFilter, setCinaFilter] = useState(false);
  const [krainaZakr, setKrainaZakr] = useState(false);
  const { width, height } = useWindowSize();
  const [filterByKraina, setFilterByKraina] = useState([]);
  const [krainaFilter, setKrainaFilter] = useState(false);
  const [choosenKraina, setChoosenKraina] = useState([]);

  const showAddZap = () => {
    setAddZap((value) => !value);
  };
  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };
  useEffect(() => {
    if (userData) {
      socket.emit("newUser", userData);
    }
  }, [userData]);
  useEffect(() => {
    socket.on("showNewComment", (data) => {
      dispatch(changeCommentsCount(data.pKodZap));
    });
  }, []);
  useEffect(() => {
    socket.emit("activeUsers");
  }, [socket]);
  useEffect(() => {
    socket.on("showActiveUsers", (data) => {
      setActiveUsers(data);
    });
  }, [socket]);

  const showComments = async (item) => {
    setCommentsClass((value) => !value);
    setSelectedZap(item);
  };
  useEffect(() => {
    if (userData) {
      dispatch(fetchGroups(userData.KOD));
    }
  }, [userData]);
  useEffect(() => {
    if (userData) {
      dispatch(fetchZap(userData.KOD));
    }
  }, [userData]);
  useEffect(() => {
    if (groups.length > 0) {
      setSelectedGroup(groups[0].KOD);
    } else {
      setSelectedGroup(11);
    }
  }, []);
  useEffect(() => {
    socket.on("deleteZapAllUsers", (data) => {
      dispatch(deleteReduxZap(data));
    });
  }, [socket]);
  useEffect(() => {
    socket.on("refreshAllZap", (data) => {
    
      dispatch(refreshReduxZap(data));
    });
  }, [zap]);
  useEffect(() => {
    socket.on("showEditZap", (data) => {
      dispatch(showEditReduxZap(data));
    });
  }, [zap]);
  useEffect(() => {
    socket.on("showEditZapText", (data) => {

      dispatch(showEditReduxZapText(data));
    });
  }, [zap]);
  useEffect(() => {
    socket.on("showNewComment", (data) => {
      if (userData?.KOD === data.zapAuthor) {
        notifyCommentZap(userData, data);
      } else {
        return;
      }
    });
  }, []);
  useEffect(() => {
    socket.on("showChangeCountAm", (data) => {
    
      dispatch(showEditReduxZapCarCount(data));
    });
  }, []);

  // useEffect(() => {
  //   if (commentsClass === true) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [commentsClass]);
  const containerProp = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemProp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  const uniqueUsers = zap.filter((obj, index, array) => {
    return !array.slice(0, index).some((o) => o.PIP === obj.PIP);
  });
  const setUsersToChosen = (item) => {
    if (choosenUsers.includes(item)) {
      setChoosenUsers(
        choosenUsers.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setChoosenUsers([...choosenUsers, item]);
    }
  };
  const setKrainaToChoosen = (item) => {
    if (choosenKraina.includes(item)) {
      setChoosenKraina(
        choosenUsers.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setChoosenKraina([...choosenKraina, item]);
    }
  };
  const refreshMyZap = async () => {
    const myZap = zap.filter((item) => item.KOD_OS === userData?.KOD);
    myZap.forEach((element) => {
      axios.post(`/zap/refresh`, {
        pKodAuthor: userData?.KOD,
        pKodZap: element.KOD,
      });
      socket.emit("refreshZap", element.KOD);
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (zap) {
      let uniq = [];
      for (let i = 0; i < zap.length; i++) {
        const el = zap[i];
        uniq.push(el.KRAINA);
        const myArray = new Set(uniq.filter((item) => item !== null));  
        setFilterByKraina([...myArray]);
      }
    }
  }, [zap]);
  return (
    <div className="logistic logistic__work container">
      {addZapSuccess ? <Confetti width={width} height={height} /> : null}
      {/* <div className="active__users-length">
        {" "}
        <button
          onClick={() => setShowActiveUsers((value) => !value)}
          className="normal"
        >
          {showActiveUsers ? "Приховати" : "Користувачі online"}{" "}
          {activeUsers?.length}
        </button>
        {showActiveUsers && <ActiveUsersList users={activeUsers} />}
      </div> */}
      <div className="logistic__work-nav">
        <button onClick={() => dispatch(editZapAddSlice())} className="normal">
          {zapAddSlice ? "Приховати" : "Добавити вантаж"}
        </button>
        <div className="form__control">
          <input
            className="zap__search-input"
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              padding: "0.4rem",
            }}
            type="text"
            placeholder="Пошук: місто,прізвище"
          />
        </div>
        {myZapSelect ? (
          <button
            style={{ backgroundColor: "lightcoral" }}
            onClick={() => setMyZapSelect((value) => !value)}
            className="normal"
          >
            Дивитись усі заявки
          </button>
        ) : (
          <button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={() => setMyZapSelect((value) => !value)}
            className="normal"
          >
            Лише мої заявки
          </button>
        )}
        {/* {zap.filter(item => item.ZAKRKRAINA > 0 ? <button>Закріплено за мною</button> : null )} */}
        {cinaFilter ? (
          <button
            onClick={() => setCinaFilter((value) => !value)}
            className="normal"
          >
            Скинути фільтр
          </button>
        ) : (
          <button
            onClick={() => setCinaFilter((value) => !value)}
            className="normal"
          >
            Запит ціни
          </button>
        )}
        {krainaZakr ? (
          <button
            onClick={() => setKrainaZakr((val) => !val)}
            className="normal"
          >
            Приховати фільтр{" "}
          </button>
        ) : (
          <button
            onClick={() => setKrainaZakr((val) => !val)}
            className="normal"
          >
            Фільтр по закр/країнах
          </button>
        )}

        <div>
          <button
            className="normal"
            style={{ position: "relative" }}
            onClick={() => setOpenManager((value) => !value)}
          >
            {openManager ? "Приховати фільтр" : "Фільтр по менеджерах"}
          </button>
          {openManager && (
            <div className="pip__filter">
              {uniqueUsers.map((item, idx) => {
                return (
                  <div key={idx} className="choose__user">
                    <input
                      type="checkbox"
                      checked={choosenUsers.includes(item.PIP)}
                      onChange={() => setUsersToChosen(item.PIP)}
                    />
                    <button>{item.PIP}</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {krainaFilter ? (
          <button
            onClick={() => setKrainaFilter((val) => !val)}
            className="normal"
          >
            Приховати фільтр{" "}
          </button>
        ) : (
          <button
            onClick={() => setKrainaFilter((val) => !val)}
            className="normal"
          >
            Фільтр Країни
          </button>
        )}
        {krainaFilter && (
          <div className="pip__filter">
            {filterByKraina
              .filter((item) => item !== "UA")
              .map((item, idx) => {
                return (
                  <div key={idx} className="choose__user">
                    <input
                      type="checkbox"
                      checked={choosenKraina.includes(item)}
                      onChange={() => setKrainaToChoosen(item)}
                    />
                    <button onClick={() => setKrainaToChoosen(item)}>
                      {item}
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="zap__rules">
        <div className="zap__rules-block">
          <div
            className="zap__rules-round"
            style={{ backgroundColor: "rgb(20, 238, 20)" }}
          ></div>
          <span>- Нова заявка на перевезення</span>
        </div>
        <div className="zap__rules-block">
          <div
            className="zap__rules-round"
            style={{ backgroundColor: "rgb(228, 203, 64)" }}
          ></div>
          <span>- Заявка яка має термін життя більший ніж 30хв</span>
        </div>
        <div className="zap__rules-block">
          <div
            className="zap__rules-round"
            style={{ backgroundColor: "rgb(226, 75, 75)" }}
          ></div>
          <span>- Заявка яка має термін життя більший ніж 3години</span>
        </div>
      </div>
      <div className="logistic__work-nav">
        {groups
          ? groups.map((item, idx) => {
              return (
                <div key={idx} className="nav">
                  {selectedGroup === item.KOD ? (
                    <div className="decor__div"></div>
                  ) : null}
                  <button
                    onClick={() => setSelectedGroup(item.KOD)}
                    value={item.KOD}
                    className="normal"
                  >
                    {item.NGROUP}{" "}
                    {
                      zap?.filter((value) => value.KOD_GROUP === item.KOD)
                        .length
                    }
                  </button>
                </div>
              );
            })
          : null}
      </div>
      {zapAddSlice ? (
        <AddZap showAddZap={showAddZap} selectedGroup={selectedGroup} />
      ) : null}
      {krainaZakr && (
        <h3 className="filter__title">
          Фільтр по закріпленими за вами країнами
        </h3>
      )}
      {cinaFilter && (
        <h3 className="filter__title">Фільтр по заявках : ЗАПИТ ЦІНИ</h3>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        // initial={{ scale: 0 }}
        // animate={{ rotate: 360, scale: 1 }}
        // transition={{
        //   type: "spring",
        //   stiffness: 260,
        //   damping: 20
        // }}
        className="zap__list"
      >
        {myZapSelect && (
          <div className="my__func">
            <button onClick={refreshMyZap} className="reload__my-func normal">
              Оновити усі заявки
            </button>
          </div>
        )}
        {zap ? (
          zap

            .filter((item) => item.KOD_GROUP === selectedGroup)
            .filter((item) => {
              return searchFilter.toLowerCase() === ""
                ? item
                : item.ZAV.toLowerCase().includes(searchFilter) ||
                    item.ROZV.toLowerCase().includes(searchFilter) ||
                    item.PIP.toUpperCase().includes(searchFilter) ||
                    item.PIP.toLowerCase().includes(searchFilter) ||
                    item.ZAM?.toLowerCase().includes(searchFilter) ||
                    item.ZAM?.toUpperCase().includes(searchFilter) ||
                    item.KOD.toString().includes(searchFilter) ||
                    item.ZAPNUM.toString().includes(searchFilter) ;
            })
            .filter((item) => {
              if (myZapSelect) {
                return item.KOD_OS === userData?.KOD;
              } else {
                return item;
              }
            })
            .filter((item) =>
              choosenUsers.length > 0 ? choosenUsers.includes(item.PIP) : item
            )
            .filter((item) =>
              choosenKraina.length > 0
                ? choosenKraina.includes(item.KRAINA)
                : item
            )
            .filter((item) => (cinaFilter ? item.ZAPCINA === 1 : item))
            .filter((item) => (krainaZakr ? item.ZAKRKRAINA > 0 : item))
            .sort((a, b) => toTimestamp(b.DATUPDATE) - toTimestamp(a.DATUPDATE))
            .map((item, idx) => {
              return (
                <ZapItem
                  key={idx}
                  item={item}
                  showComments={showComments}
                  showAddZap={showAddZap}
                  setEditZap={setEditZap}
                />
              );
            })
        ) : (
          <div className="zap__type">
            <h2>Немає завантажень</h2>
          </div>
        )}
      </motion.div>

      {commentsClass ? (
        <ZapComments
          setAddZap={setAddZap}
          showComments={showComments}
          selectedZap={selectedZap}
        />
      ) : null}
    </div>
  );
};

export default LogisticWork;
