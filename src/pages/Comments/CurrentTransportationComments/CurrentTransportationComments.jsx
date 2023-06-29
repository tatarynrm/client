import "./CurrentTransportationComments.scss";
// const comments = [
//   { author: "Новосад О.", text: "Маю авто за 24000 грн" },
//   { author: "Жила М.", text: "Перевізник готовий їхати за 24500, дає 2 авто" },
//   { author: "Гриник Ю.", text: "Маю авто за 25000 грн" },
// ];
const CurrentTransportationComments = ({ comments }) => {
  return (
    <div className="comments">
      {comments.map((item, idx) => {
        return (
          <div key={idx} className="comment">
            <div className="comment__author comment__block">{item.author}</div>
            <div className="comment__text comment__block">{item.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentTransportationComments;
