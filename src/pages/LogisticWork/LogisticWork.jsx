import { useEffect, useState } from "react";
import "./LogisticWork.scss";
import ZapComments from "../../components/zap/ZapComments";
import moment from "moment";
import "moment/locale/uk";
import toTimestamp from "../../helpers/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddZap from "../../components/zap/AddZap";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveUsers } from "../../redux/slices/users";
import { motion } from "framer-motion";
import {
  changeCommentsCount,
  deleteReduxZap,
  fetchGroups,
  fetchZap,
  refreshReduxZap,
  showEditReduxZap,
} from "../../redux/slices/zap";
import {
  // fromAdminToUser,
  notifyCommentZap,
  notifyNewZap,
} from "../../utils/toasts";
import socket from "../../utils/socket";
import ZapItem from "../../components/zap/ZapItem";
import ZapEditForm from "../../components/zap/ZapEditForm";
import { editZapAddSlice } from "../../redux/slices/edit";
import { useRef } from "react";
import axios from "../../utils/axios";
import { addReduxZap } from "../../redux/slices/zap";
import { beep, beepSend } from "../../helpers/audio";
import { fetchEvents } from "../../redux/slices/events";

const LogisticWork = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const groups = useSelector((state) => state.zap.zap.groups);
  const zap = useSelector((state) => state.zap.zap.items);
  const [activeZap, setActiveZap] = useState([]);
  const { users } = useSelector((state) => state.users);
  const [commentsClass, setCommentsClass] = useState(false);
  const [filterZap, setFilterZap] = useState([]);
  const [selectedZap, setSelectedZap] = useState(null);
  const [addZap, setAddZap] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const comments = useSelector((state) => state.comments.comments);
  const [myZap, setMyZap] = useState(null);
  const zapAddSlice = useSelector((state) => state.edit.zapAddSlice);
  const [myZapSelect, setMyZapSelect] = useState(false);
  const [editZap, setEditZap] = useState(false);
  const [activeUsers,setActiveUsers] = useState(null)
  const showAddZap = () => {
    setAddZap((value) => !value);
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
useEffect(()=>{
socket.emit('activeUsers');
},[socket])
useEffect(()=>{
socket.on('showActiveUsers',data =>{
  setActiveUsers(data)
})
},[socket])
console.log(activeUsers);
  // useEffect(() => {
  //   const date = new Date();
  //   date.toISOString();
  //   socket.on("showNewZap", (data) => {
  //     dispatch(
  //       addReduxZap({
  //         DAT: date,
  //         KOD_GROUP: data.pKodGroup,
  //         KOD_OS: data.pKodAuthor,
  //         ZAV: data.pZav,
  //         ROZV: data.pRozv,
  //         ZAPTEXT: data.pZapText,
  //         KOD: data.ZAPKOD,
  //         PIP: data.PIP,
  //         COUNTCOMM: 0,
  //         COUNTNEWCOMM: 0,
  //         ISNEW: 1,
  //         KOD: data.ZAP_KOD,
  //       })
  //     );
  //     notifyNewZap(userData, data);
  //     beepSend();
  //   });
  // }, [socket]);
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
    socket.on("showNewComment", (data) => {
      if (userData?.KOD === data.zapAuthor) {
        notifyCommentZap(userData, data);
      } else {
        return;
      }
    });
  }, []);
  const containerProp = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
    
  const itemProp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }
  return (
    <div className="logistic logistic__work container">
              <div className="active__users-length">
          <p>Користувачів на сайті: <span>{activeUsers?.length}</span> </p>
        </div>
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
              // borderBottom: "1px solid rgb(76, 135, 202)",
              outline: "none",
              width: "100%",
              padding: "0.4rem",
              // borderRadius: "10px",
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
                    {zap?.filter((value) => value.KOD_GROUP === item.KOD).length}
                  </button>
                </div>
              );
            })
          : null}
      </div>
      {zapAddSlice ? (
        <AddZap showAddZap={showAddZap} selectedGroup={selectedGroup} />
      ) : null}

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
                    item.KOD.toString().includes(searchFilter);
            })
            .filter((item) => {
              if (myZapSelect) {
                return item.KOD_OS === userData?.KOD;
              } else {
                return item;
              }
            })
            .sort((a, b) => toTimestamp(b.DAT) - toTimestamp(a.DAT))
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
      <ToastContainer />
    </div>
  );
};

export default LogisticWork;
