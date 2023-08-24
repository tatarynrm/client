import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workers from "./pages/Workers/Workers";
import Worker from "./pages/Worker/Worker";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import Transportation from "./pages/Transportation/Transportation";
import Carriers from "./pages/Carriers/Carriers";
import LogisticWork from "./pages/LogisticWork/LogisticWork";
import { addReduxZap } from "./redux/slices/zap";
import ZapEditForm from "./components/zap/ZapEditForm";
import socket from "./utils/socket";
import CompanyFiles from "./pages/CompanyFiles/CompanyFiles";
import ClosedCargos from "./pages/ClosedCargos/ClosedCargos";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import { ToastContainer } from "react-toastify";
import { fromAdminToUser, notifyNewZap, textToAllUsers } from "./utils/toasts";
import { beepSend, directorSound, msgToAllUsers } from "./helpers/audio";
import NotificationPanel from "./components/notification_panel/NotificationPanel";
import { addCommentRedux } from "./redux/slices/comments";
import MessageFromAdmin from "./components/messages/MessageFromAdmin";
import ZapReminder from "./components/messages/ZapReminder";
import { TbBrandTelegram } from "react-icons/tb";
import Carrier from "./pages/Carriers/Carrier";
import ZapDeleteForm from "./components/zap/ZapDeleteForm";
import NotificationMail from "./components/notification_panel/NotificationMail";
import { SiGooglemeet } from "react-icons/si";
import GoogleMeetItem from "./components/google_meet/GoogleMeetItem";
import { changeGoogleMeetOpen } from "./redux/slices/edit";
import { addGoogleMeetEvent } from "./redux/slices/events";
import ZapZakrForm from "./components/zap/ZapZakrForm";
// import Meetign from "./components/meeting/Meetign";
// import MeetingPage from "./pages/Meeting/MeetingPage";

function App() {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  const zapEditStatus = useSelector((state) => state.edit.zapEdit);
  const zapDeleteStatus = useSelector((state) => state.edit.zapDeleteStatus);
  const zapZakrStatus = useSelector((state) => state.edit.zapZakrStatus);
  const navigate = useNavigate();
  const eventsOpen = useSelector((state) => state.edit.eventsOpen);
  const googleMeetOpen = useSelector((state) => state.edit.googleMeetOpen);
  const mailOpen = useSelector((state) => state.edit.mailOpen);
  const location = useLocation();
  const googleMeet = window.localStorage.getItem("googleMeet");
  const events = useSelector(state => state.events.events.items)
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  useEffect(() => {
    socket.on("showStartGoogleMeet", (data) => {
      dispatch(changeGoogleMeetOpen())
      dispatch(addGoogleMeetEvent(data))
    });
  }, [socket]);
  useEffect(() => {
    socket.on("showStartGoogleMeetWithTime", (data) => {
      dispatch(changeGoogleMeetOpen())
      // dispatch(addGoogleMeetEvent(data))
    });
  }, [socket]);

  useEffect(() => {}, [googleMeet]);
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
      textToAllUsers(data.user, data.textToAllUsers);
      msgToAllUsers();
    });
  }, [socket]);
  useEffect(() => {
    socket.on("show_msg_from_admin", (data) => {
      if (userData?.KOD === data.kod) {
        fromAdminToUser(data.user, data.message);
        directorSound();
      }
    });
  }, [socket, userData]);
  useEffect(() => {
    if (token) {
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
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    date.toISOString();

    if (token) {
      socket.on("showNewZap", (data) => {
        console.log("--------------show-new-zap", data);
        dispatch(
          addReduxZap({
            DAT: date,
            DATUPDATE: date,
            KOD_GROUP: data.pKodGroup,
            KOD_OS: data.pKodAuthor,
            ZAV: data.pZav,
            ROZV: data.pRozv,
            ZAPTEXT: data.pZapText,
            KOD: data.ZAP_KOD,
            PIP: data.PIP,
            COUNTCOMM: 0,
            COUNTNEWCOMM: 0,
            ISNEW: 1,
            ZAPCINA: data.pZapCina,
            ZAM: data.ZAM_NAME,
            PUNKTZ: data.pPunktZ,
            PUNKTR: data.pPunktR,
            KILAM: data.pKilAm,
            KILAMACT:data.pKilAm
          })
        );
        notifyNewZap(userData, data);
        beepSend();
      });
    }
  }, [socket]);



  useEffect(() => {
    socket.on("logoutAllUsers", (data) => {
      window.localStorage.removeItem("token");
      navigate("/");
    });
  }, [socket, token]);
  useEffect(() => {}, [zapDeleteStatus]);
  useEffect(() => {}, [events]);
  return (
    <div className="main__app">
      <Header />
      <div className="main__content">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/workers" element={<Workers />} />
            <Route path={`/workers/:id`} element={<Worker />} />{" "}
            <Route path={`/transportation`} element={<Transportation />} />
            <Route path={`/carriers`} element={<Carriers />} />
            <Route path={`/carriers/:id`} element={<Carrier />} />
            <Route path={`/logistic-work`} element={<LogisticWork />} />
            <Route path={`/ict-files`} element={<CompanyFiles />} />
            <Route path={`/statistic`} element={<ClosedCargos />} />
            {/* <Route path={`/meeting`} element={<MeetingPage />} /> */}
            {userData?.ISDIR === 1 ||
            userData?.KOD === 38231 ||
            userData?.KOD === 24011 ||
            userData?.KOD === 4611 ||
            userData?.KOD === 3711 ||
            userData?.KOD === 2811 ||
            userData?.KOD === 6411 ||
            userData?.KOD === 19011 
            ? (
              <Route path={`/admin`} element={<AdminPanel />} />
            ) : null}
          </Route>
        </Routes>
        {zapEditStatus ? <ZapEditForm /> : null}
        {zapDeleteStatus ? <ZapDeleteForm /> : null}
        {zapZakrStatus ? <ZapZakrForm /> : null}
        {eventsOpen && <NotificationPanel />}
        {mailOpen && <NotificationMail />}
        {googleMeetOpen ? <GoogleMeetItem /> : null}
        <ToastContainer />
        <MessageFromAdmin />
        <ZapReminder />

        {location.pathname === "/logistic-work" && (
          <div title="Технічна підтримка" className="telegram__chat">
            <a target="_blank" href="https://t.me/I_Dont_Have_A_Phone_Number">
              <TbBrandTelegram />
            </a>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
