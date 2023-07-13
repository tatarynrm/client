import "./Carriers.scss";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const Carriers = () => {
  const [carriers, setCarriers] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search.length > 2) {
      const getContrAgents = async (search) => {
        try {
          const { data } = await axios.post("/ur/all", { search: search });
          setCarriers(data);
        } catch (error) {
          console.log(error);
        }
      };
      getContrAgents(search);
    }
    if (search.length === 0) {
      setTimeout(() => {
        setCarriers([]);
      }, 500);
    }
  }, [search]);

  return (
    <div className="carriers container">
      <div className="carriers__inner">
        <input
          className="search__input"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="carriers__items">
          {carriers.length > 1
            ? carriers.map((item, idx) => {
                return (
                  <div className="carriers__item" key={idx}>
                    <p className="">{item.NDOV}</p>
                    <Link to={`/carriers/${item.KOD}`}>
                      <button>Докладна інформація</button>
                    </Link>
                  </div>
                );
              })
            : "Напишіть назву компанії"}
        </div>
      </div>
    </div>
  );
};

export default Carriers;
