import React from "react";
import { Link } from "react-router-dom";

const TrnasportationItem = ({ item }) => {
  return (
    <div className="current__transportation-item">
      <div className="decor__line-div"></div>
      <div className="current__transportation-item-info">
        <div className="current__transportation-item-author">
          <span>{item.MANAGER}</span>
        </div>
        <div className="current__transportation-item-date">
          <p>{item.CREATE_DATE}</p>
        </div>
      </div>
      <div className="current__transportation-item-text">{item.TEXT}</div>
      <div className="current__transportation-item-propsals">
        <Link to={`/current-transportation/${item.ID}`}>
          <button className="current__transportation-item-text">
            Запропонувати транспорт
          </button>
        </Link>
      </div>
      <div className="current__transportation-item-edit">
        <button>Редагувати</button>
        <button>Видалити</button>
      </div>
    </div>
  );
};

export default TrnasportationItem;
