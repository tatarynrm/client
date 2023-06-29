import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RxDotsVertical } from "react-icons/rx";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "../../utils/axios";
import socket from "../../utils/socket";
import toTimestamp from "../../helpers/functions";
import moment from "moment";
import "moment/locale/uk";
const CommentItem = ({ ref1, item }) => {
  const userData = useSelector((state) => state.auth.data);
  const [showCommentEdit, setShowCommentEdit] = useState(false);
  const deleteComment = async (KOD_OS, KOD_COMM) => {
    try {
      const data = await axios.post(`/comments/delete`, {
        pKodAutor: KOD_OS,
        pKodComm: KOD_COMM,
      });
      if (data.status === 200) {
        socket.emit("deleteComm", KOD_COMM);
        setShowCommentEdit((value) => !value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      ref={ref1}
      className={
        item.KOD_OS === userData.KOD
          ? "manager__comment own"
          : "manager__comment"
      }
    >
      <div className="manager__comment-leftside">
        <span className="comment__author">
          {item.KOD_OS === userData.KOD ? "Ви" : item.PIP}
        </span>
        {item.KOD_OS === userData.KOD ? (
          <span className="comment__date">{moment(item.DAT).calendar()}</span>
        ) : (
          <span className="comment__date">{moment(item.DAT).calendar()}</span>
        )}
      </div>
      <div className="manager__comment-rightside">{item.PRIM}</div>
      {item.KOD_OS === userData.KOD ? (
        <div
          onClick={() => setShowCommentEdit(!showCommentEdit)}
          className="comments__edit"
        >
          <RxDotsVertical />
        </div>
      ) : null}
      {showCommentEdit ? (
        <div className="comment__edit-buttons">
          <button
            onClick={() => deleteComment(userData?.KOD, item.KOD)}
            className="normal delete"
          >
            Видалити
          </button>
          {/* <button className="normal edit">Редагувати</button> */}
        </div>
      ) : null}
    </div>
  );
};

export default CommentItem;
