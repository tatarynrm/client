import "./NotificationMail.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMessAll } from "../../redux/slices/events";
import toTimestamp from "../../helpers/functions";
import moment from "moment";
import "moment/locale/uk";
const NotificationMail = () => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events.items);
  const [buttonFilter, setButtonFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const commentFilter = () => {
    setButtonFilter("Коментар до заявки");
  };
  const zapFilter = () => {
    setButtonFilter("Заявка (запит)");
  };
  const allFilter = () => {
    setButtonFilter("");
  };

  useEffect(() => {
    userData && dispatch(fetchMessAll());
  }, [userData]);
  return (
    <div className="notifications__panel">
      <input
        className="notifications__panel-search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        type="text"
        placeholder="Ключові слова"
      />

      {events &&
        events
 
          .filter(item => {
            return searchFilter.toLowerCase() === ""
            ? item
            : item.MESS.toLowerCase().includes(searchFilter) ||
              item.MESS.toUpperCase().includes(searchFilter) ||
             item.PIP.toLowerCase().includes(searchFilter)

          })
          .map((item, idx) => {
            return (
              <div
                key={idx}
                className="notification notification__item"
                title={item.HINT}
              >
                <div className="notification__left">
                  <div className="notification__author">{item.PIP}</div>
                  <div className="notification__date">
                    {moment(toTimestamp(item.DAT)).format("LLL")}
                  </div>
                </div>
                <div className="notification__center">
                  <div className="notification__title">{item.MESS}</div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default NotificationMail;
