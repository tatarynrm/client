import React from "react";
import "./ClosedZap.scss";
import { AiOutlineComment } from "react-icons/ai";
import { FaCommentSlash } from "react-icons/fa";
import moment from "moment";
import uk from "date-fns/locale/uk";
import { useState } from "react";
const ClosedZap = ({ item, gradient, cls }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const handleOpenComments = () => {
    setCommentsOpen((value) => !value);
  };
  return (
    <div
      onClick={handleOpenComments}
      className={`close__zap close__zap-${item.KOD} ${
        gradient && cls(item.STATUS)
      }`}
    >
      <div className="close__zap__inner">
        <div className="close__zap-item">
        {/* <div className="">{`${moment(item.DAT)
            .startOf("minute")
            .fromNow()}`}</div> */}
        <div className="">{`${moment(item.DAT).format('L')}`} {item.DATSTATUS != null ? `- ${moment(item.DATSTATUS).format('L')}`: null}</div>
          <div className="">{item.PIP}</div>
          <div className="">
            <div className="">
              {item.COUNTCOMM <= 0 ? (
                <FaCommentSlash title="Коментарів немає" />
              ) : (
                <>
                  <AiOutlineComment />
                  {item.COUNTCOMM}
                </>
              )}
            </div>
          </div>

          <div className="">
            <div>
              {item.ZAV} -{item.ROZV}
            </div>
          </div>
          <div className="close__item-text">{item.ZAPTEXT}</div>
        </div>
      </div>

      {commentsOpen & (item.COMMENTS?.length > 0) ? (
        <div className="comments__closed">
          <span>Коментарі:</span>
          {item.COMMENTS !== null
            ? item.COMMENTS.map((item, idx) => {
                return (
                  <div className="comment_to_closed" key={idx}>
                    <span>{item.PIP}</span> <span>{item.PRIM}</span>
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default ClosedZap;
