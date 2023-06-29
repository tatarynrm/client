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
import { fetchGroups, fetchZap } from "./redux/slices/zap";
import { editZap } from "./redux/slices/edit";
import ZapEditForm from "./components/zap/ZapEditForm";
import { io } from "socket.io-client";
import socket from "./utils/socket";
import CompanyFiles from "./pages/CompanyFiles/CompanyFiles";
import ClosedCargos from "./pages/ClosedCargos/ClosedCargos";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { ToastContainer } from "react-toastify";
import { fromAdminToUser, textToAllUsers } from "./utils/toasts";
import { directorSound } from "./helpers/audio";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  const zapEditStatus = useSelector((state) => state.edit.zapEdit);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
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
      textToAllUsers(data);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("show_msg_from_admin", (data) => {
      if (userData?.KOD === data.kod) {
        fromAdminToUser(data.message);
        directorSound();
      }
    });
  }, [socket, userData]);
  return (
    <>
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
        <Route path="*" exact={true} element={<DoesntExist />} />
      </Routes>
      {zapEditStatus ? <ZapEditForm /> : null}
      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}

export default App;
