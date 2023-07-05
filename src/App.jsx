import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workers from "./pages/Workers/Workers";
import Worker from "./pages/Worker/Worker";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import DoesntExist from "./pages/DoesntExist/DoesntExist";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { fetchActiveUsers, fetchUsers } from "./redux/slices/users";
import CurrentTransportation from "./pages/CurrentTransportation/CurrentTransportation";
import Chat from "./pages/Chat/Chat";
import CurrentTransportationItem from "./pages/CurrentTransportation/CurrentTransportationItem";
import Transportation from "./pages/Transportation/Transportation";
import Carriers from "./pages/Carriers/Carriers";
import axios from "./utils/axios";
import LogisticWork from "./pages/LogisticWork/LogisticWork";
import { addReduxZap, fetchAllZap, fetchGroups, fetchZap } from "./redux/slices/zap";
import { editZap } from "./redux/slices/edit";
import ZapEditForm from "./components/zap/ZapEditForm";
import { io } from "socket.io-client";
import socket from "./utils/socket";
import CompanyFiles from "./pages/CompanyFiles/CompanyFiles";
import ClosedCargos from "./pages/ClosedCargos/ClosedCargos";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { ToastContainer } from "react-toastify";
import { fromAdminToUser, notifyNewZap, textToAllUsers } from "./utils/toasts";
import { beepSend, directorSound, msgToAllUsers } from "./helpers/audio";
import { fetchEvents } from "./redux/slices/events";
import NotificationPanel from "./components/notification_panel/NotificationPanel";
import { addCommentRedux } from "./redux/slices/comments";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  const zapEditStatus = useSelector((state) => state.edit.zapEdit);
  const navigate = useNavigate();
  const events = useSelector(state => state.events.events.items)
  const eventsOpen = useSelector(state => state.edit.eventsOpen)

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  useEffect(() => {
    dispatch(fetchZap(userData?.KOD))
  }, [])
  useEffect(() => {
    if (userData) {
      socket.emit("newUser", userData);
    }
  }, [userData]);
  useEffect(() => {
    socket.on("windowReloadAllUsers", (data) => {
      window.location.reload();
    });
  }, [socket]);
  useEffect(() => {
    socket.on("showTextToAllUsers", (data) => {
   
      textToAllUsers(data.user,data.textToAllUsers);
      msgToAllUsers()
    });
  }, [socket]);
  useEffect(() => {
    socket.on("show_msg_from_admin", (data) => {
      if (userData?.KOD === data.kod) {
        fromAdminToUser(data.user,data.message);
        directorSound();
      }
    });
  }, [socket, userData]);
  // useEffect(()=>{
  //   dispatch(fetchEvents(userData?.KOD))
  //   },[])

  useEffect(()=>{

      userData && dispatch(fetchEvents(userData?.KOD))
 
    },[userData])
  useEffect(() => {
    socket.on("showNewComment", (data) => {
      dispatch(
        addCommentRedux({
          KOD_OS: data.pKodAuthor,
          KOD_ZAP: data.pKodZap,
          PRIM: data.pComment,
          PIP: data.PIP,
          DAT: Date.now(),
          KOD: data.pKodComment,
        })
      );
    });
  }, []);

  useEffect(() => {
    const date = new Date();
    date.toISOString();
    socket.on("showNewZap", (data) => {
      dispatch(
        addReduxZap({
          DAT: date,
          KOD_GROUP: data.pKodGroup,
          KOD_OS: data.pKodAuthor,
          ZAV: data.pZav,
          ROZV: data.pRozv,
          ZAPTEXT: data.pZapText,
          KOD: data.ZAPKOD,
          PIP: data.PIP,
          COUNTCOMM: 0,
          COUNTNEWCOMM: 0,
          ISNEW: 1,
          KOD: data.ZAP_KOD,
        })
      );
      notifyNewZap(userData, data);
      beepSend();
    });
  }, [socket]);
  return (
    <div className="main__app">
      {/* <div style={{backgroundColor:"lightcoral"}} className="admin__notification">
        <span>Оновлення :.................</span>
      </div> */}
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          {/* {userData?.ISDIR === 1 ? (
            <> */}
          <Route path="/workers" element={<Workers />} />
          <Route path={`/workers/:id`} element={<Worker />} />{" "}
          {/* </>
          ) : null} */}
          {/* <Route path={`/chat`} element={<Chat />} /> */}
          {/* <Route path={`/transportation`} element={<Transportation />} /> */}
          <Route path={`/carriers`} element={<Carriers />} />
          <Route path={`/logistic-work`} element={<LogisticWork />} />
          <Route path={`/ict-files`} element={<CompanyFiles />} />
          <Route path={`/closed-cargos`} element={<ClosedCargos />} />
          {/* <Route
            path={`/current-transportation`}
            element={<CurrentTransportation />}
          /> */}
          {/* <Route
            path={`/current-transportation/:id`}
            element={<CurrentTransportationItem />}
          /> */}
          {userData?.ISDIR === 1 ||
          userData?.KOD === 38231 ||
          userData?.KOD === 24011 ||
          userData?.KOD === 4611 ? (
            <Route path={`/admin`} element={<AdminPanel />} />
          ) : null}
        </Route>
        {/* <Route path="*" exact={true} element={<DoesntExist />} /> */}
      </Routes>
      {zapEditStatus ? <ZapEditForm /> : null}
      {eventsOpen && <NotificationPanel/> } 
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
