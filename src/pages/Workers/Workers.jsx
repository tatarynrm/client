import "./Workers.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import {
  fetchActiveUsers,
  fetchFiredUsers,
  fetchUsers,
} from "../../redux/slices/users";
import Loader from "../../components/loader/Loader";
import moment from "moment";
import "moment/locale/uk";
const Workers = () => {
  const location = useLocation();
  const { users } = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const filterLocation = location.search.split("=");
  const pageLocation = filterLocation[filterLocation.length - 1];
  const userData = useSelector((state) => state.auth.data);
  const showActiveUsers = () => {
    setSearchParams({ filter: "active" });
    dispatch(fetchActiveUsers());
  };
  const showFiredUsers = () => {
    setSearchParams({ filter: "fired" });
    dispatch(fetchFiredUsers());
  };
  const resetUsersFilter = () => {
    setSearchParams({});
    dispatch(fetchUsers());
  };
  // useEffect(() => {
  //   switch (pageLocation) {
  //     case "active":
  //       dispatch(fetchActiveUsers());
  //       setSearchParams({ filter: "active" });
  //       break;
  //     case "fired":
  //       dispatch(fetchFiredUsers());
  //       setSearchParams({ filter: "fired" });
  //       break;

  //     default:
  //       break;
  //   }
  // }, []);
useEffect(()=>{
  dispatch(fetchActiveUsers())
},[])

  return (
    <div className="workers container">
      <div className="workers__list container">
        <div
          className={
            userData?.ISDIR === 1 ||
            userData?.KOD === 38231 ||
            userData?.KOD === 24011 ||
            userData?.KOD === 4611
              ? "search__input"
              : "search__input.active"
          }
        >
          {userData?.ISDIR === 1 ||
          userData?.KOD === 38231 ||
          userData?.KOD === 24011 ||
          userData?.KOD === 4611 ? (
            <>
              <button className="normal" onClick={showActiveUsers}>Діючі</button>
              <button className="normal" onClick={showFiredUsers}>Звільнені</button>
              <button className="normal" onClick={resetUsersFilter}>Скинути фільтр</button>
            </>
          ) : null}
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Ім'я,Прізвище"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p>Працівників:{users.items.length}</p>
        {users.items.length > 0 ? (
          users?.items
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.PRIZV.toLowerCase().includes(search) ||
                  item.PRIZV.toUpperCase().includes(search) ||
                    item.IMJA.toLowerCase().includes(search) ||
                    item.IMJA.toUpperCase().includes(search);
            })
            .sort((a, b) => {
              let fa = a.PRIZV?.toLowerCase(),
                fb = b.PRIZV?.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
            .map((item, idx) => (
              <div key={idx} className={`user user-${item.KOD}`}>
                <p>{item.PIPFULL}</p>
                <Link to={`/workers/${item.KOD}`}>
                  <button>Докладна інформація</button>
                </Link>
              </div>
            ))
        ) : (
          <p>Оберіть категорію</p>
        )}
      </div>
    </div>
  );
};

export default Workers;
