import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import axios from "../../utils/axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCargos } from "../../redux/slices/cargos";
import socket from "../../utils/socket";
import moment from "moment";
import "moment/locale/uk";
import { io } from "socket.io-client";
import ReactPlayer from "react-player/youtube";
import docsGIF from "../../assets/docs__.gif";
import colorsGIF from "../../assets/colors__.gif";
import sitePNG from "../../assets/site__push.png";
import tgPNG from "../../assets/telegram__push.png";
import refreshGIF from "../../assets/refresh__.gif";
import commentsCountPNG from "../../assets/comments__count.png";
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: [
    "Міжнародні перевезення",
    "Відділ внтрішніх перевезень",
    "Ужгород",
    "Вінниця",
    "Суми",
    "Тернопіль",
    "Дніпропетровськ",
  ],
  datasets: [
    {
      label: "грн",
      data: [124000, 54000, 45000, 32321, 22333, 44555, 57000],
      backgroundColor: [
        "rgba(29, 196, 205, 0.45)",
        "rgba(8, 55, 86, 0.45)",
        "rgba(255, 206, 86, 0.45)",
        "rgba(75, 192, 192, 0.45)",
        "rgba(153, 102, 255, 0.45)",
        "rgba(255, 159, 64, 0.45)",
        "rgba(31, 203, 54, 0.45)",
      ],
      borderColor: ["rgba(0,0,0,0.1)"],
      borderWidth: 2,
    },
  ],
};

const Home = () => {
  const startOfMonth = moment().startOf("month").format("DD.MM.YYYY");
  const endOfMonth = moment().endOf("month").format("DD.MM.YYYY");
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      socket.emit("newUser", userData);
    }
  }, [userData]);
  const now = Date.now();

  return (
    <div className="home container">
      <div className="home__inner">
        <div>
          {/* <h1>
            Доброго дня {userData?.IMJA ? userData?.IMJA : "Користувач"} <br />{" "}
          </h1> */}
        </div>
        <div className="news">
          <code>
            <h2>Додано оновлення заявок👇👇👇</h2>
            <p>
              Ви можете оновити заявку,якщо пройшло більше ніж 30хв. Такий самий
              принцип як на lardi.
            </p>
            <img style={{ width: "90%" }} src={refreshGIF} alt="png" />
          </code>
          <code>
            <h2>Додано виділення переглянутих заявок 👇👇👇</h2>
            <p>
              Якщо ви вже ставили коментар в заявці, кількість коментарів
              виділяється синім кольором!
            </p>
            <p>
              Якщо ж не приймали участь у коментуванні,колір залишається чорним!
            </p>
            <img style={{ width: "20%" }} src={commentsCountPNG} alt="png" />
          </code>
          <code>
            <h2>Додано сповіщення 👇👇👇 на сайті + телеграм</h2>
            <img style={{ width: "40%" }} src={sitePNG} alt="png" />
            <img style={{ width: "40%" }} src={tgPNG} alt="png" />
          </code>
          <code>
            <h2>Додано Колірні схеми 👇👇👇</h2>
            <img style={{ width: "90%" }} src={colorsGIF} alt="gif" />
          </code>
          <code>
            <h2>Додано документи 👇👇👇</h2>
            <img style={{ width: "90%" }} src={docsGIF} alt="gif" />
          </code>
          <br />
          <br />
          <code>
            Усім привіт. Запускаємо в тестовий режим сайт,для внутрішньої роботи
            менеджерів з логістики. Посилання для входу{" "}
            <a style={{ color: "blue" }} href="http://192.168.5.180/">
              http://192.168.5.180/
            </a>
            <br />
            <br />
            ::: На даний момент на сайт можна буде зайти лише у мережі VPN.
            Тобто лише з робочого ноутбука (пк). ::: На відео записана невеличка
            інструкція по користуванню. Для коректного відображення інформації
            на сайті, необхідно буде час від часу натискати клавішу F5 або ж
            перезавантажити сторінку. ::: <br />
            <br />
            <b>
              {" "}
              Усі побажання щодо покращення функціоналу або якщо замітили якісь
              недоліки,баги,помилки,-прошу писати мені в телеграм: @rtictlviv
              --- Або ж телефонуйте на мій робочий номер телефону : 050 500 11
              07 ---{" "}
            </b>{" "}
            <br />
            <br /> (Доступ до сайту буду зараз надавати кожному менеджеру
            окремо, це займе деякий час)
          </code>
          <div className="video">
            <ReactPlayer
              width="100%"
              height="100%"
              controls={true}
              url="https://youtu.be/S9VN2BenU4M"
            />
          </div>
        </div>
      </div>
      {/* <Doughnut data={data} /> */}
    </div>
  );
};

export default Home;
