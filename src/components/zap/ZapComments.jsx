import React, { useEffect, useRef, useState } from "react";
import "./ZapComments.scss";
import { CgClose } from "react-icons/cg";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentRedux,
  deleteReduxComments,
  fetchComments,
} from "../../redux/slices/comments";
import socket from "../../utils/socket";
import { changeCommentsCount, fetchZap } from "../../redux/slices/zap";
import { beep, beepSend } from "../../helpers/audio";
import { FcInfo } from "react-icons/fc";
import { FcManager, FcComments } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { FaCommentSlash } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import toTimestamp from "../../helpers/functions";
import CommentItem from "./CommentItem";
import messagesGif from "../../assets/messages1gif.gif";
const ZapComments = ({ showComments, selectedZap }) => {
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.comments.comments.items);
  const userData = useSelector((state) => state.auth.data);
  const [arrivalComment, setArrivalComment] = useState([]);
  const dispatch = useDispatch();
  const bottomRef = useRef();
  const [zapFetch, setZapFetch] = useState(null);
  const commentsToShow = [...comments];
  const addComment = async (e) => {
    e.preventDefault();
    try {
      if (comment.length >= 3) {
        const data = await axios.post(`/comments/add`, {
          pKodAuthor: userData?.KOD,
          pKodZap: selectedZap.KOD,
          pComment: comment,
        });
        if (data.status === 200) {
          setComment("");
          socket.emit("newComment", {
            PIP: userData?.PIP,
            pKodAuthor: userData?.KOD,
            pKodZap: selectedZap?.KOD,
            pComment: comment,
            zapAuthor: selectedZap.KOD_OS,
            pKodComment: data.data.outBinds.pKodCom,
            telegramId:selectedZap.TELEGRAMID
          });
          socket.emit("myZapComment", {
            PIP: userData?.PIP,
            pKodAuthor: userData?.KOD,
            pKodZap: selectedZap?.KOD,
            pComment: comment,
            zapAuthor: selectedZap.KOD_OS,
            pKodComment: data.data.outBinds.pKodCom,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = async (e) => {
    // e.preventDefault();
    try {
      if ((e.key === "Enter") & (comment.length >= 3)) {
        const data = await axios.post(`/comments/add`, {
          pKodAuthor: userData?.KOD,
          pKodZap: selectedZap?.KOD,
          pComment: comment,
        });
        if (data.status === 200 && userData) {
          setComment("");
          socket.emit("newComment", {
            PIP: userData?.PIP,
            pKodAuthor: userData?.KOD,
            pKodZap: selectedZap?.KOD,
            pComment: comment,
            zapAuthor: selectedZap.KOD_OS,
            pKodComment: data.data.outBinds.pKodCom,
            telegramId:selectedZap.TELEGRAMID
          });
          socket.emit("myZapComment", {
            PIP: userData?.PIP,
            pKodAuthor: userData?.KOD,
            pKodZap: selectedZap?.KOD,
            pComment: comment,
            zapAuthor: selectedZap.KOD_OS,
            pKodComment: data.data.outBinds.pKodCom,
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    socket.on("deleteCommAllUsers", (data) => {
      dispatch(deleteReduxComments(data));
    });
  }, [commentsToShow]);

  useEffect(() => {
    dispatch(fetchComments(selectedZap.KOD));
  }, []);
  useEffect(() => {}, [comments]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({
      // block: "end",
      behavior: "smooth",
      // inline: "nearest",
    });
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [commentsToShow]);

  return (
    <div className={"zap__comments-show"}>
      <div onClick={showComments} className="exit__modal">
        <CgClose />
      </div>
      <div className="comments__item">
        <div className="comments__item-author" title="Автор запиту">
          <FcManager /> <span style={{ color: "blue" }}>{selectedZap.PIP}</span>
        </div>
        <div className="comments__item-zap-info">
          <div className="cities">
            <FaCity title="Місто завантаження" />{" "}
            <AiOutlineArrowRight title="Місто завантаження" /> {selectedZap.ZAV}{" "}
            <br /> <br /> <FaCity title="Місто вивантаження" />{" "}
            <AiOutlineArrowLeft title="Місто вивантаження" /> {selectedZap.ROZV}
          </div>
          <div className="zap-text">
            <FcInfo /> <br />
            {selectedZap.ZAPTEXT}
          </div>
        </div>
        <div className="comments__item-block">
          {comments.length > 0 ? (
            commentsToShow
              .sort((a, b) => a.KOD - b.KOD)
              .filter(item => item.KOD_ZAP === selectedZap.KOD)
              .map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <CommentItem
                      ref1={bottomRef}
                      comments={commentsToShow}
                      item={item}
                    />
                  </React.Fragment>
                );
              })
          ) : (
            <div className="disabled__comments">
              <FcComments className="no__comments" />
            </div>
          )}
        </div>
      </div>
      <div className="comments__item-create">
        <div className="comments__control">
          <input
            type="text"
            placeholder="Фрахт,Перевізник,К-сть авто (мінімум 2 символа)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: "60%" }}
          />
          <div onClick={addComment} className="comments__control-send">
            <BiSend className="comments__control-button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZapComments;
