import {
  FcAssistant,
  FcAutomotive,
  FcBusinessman,
  FcConferenceCall,
  FcSalesPerformance,
  FcShipped,
  FcDocument,
  FcNews,
} from "react-icons/fc";
import { FaCarCrash } from "react-icons/fa";
import { MdCarCrash } from "react-icons/md";
import { SiAdminer } from "react-icons/si";

export const navbar_menu = [
  // { label: "Чат", link: "/chat", icon: <FcAssistant /> },
  // {
  //   label: "Новини",
  //   link: "/",
  //   icon: <FcNews />,
  //   // submenu: [
  //   //   { label: "Актуальні завантаження", link: "/current-transportation" },
  //   //   { label: "Тендери", link: "/tenders" },
  //   //   { label: "Закриті завантаження", link: "/closed-transportation" },
  //   //   { label: "Запит ціни", link: "/transportation-price" },
  //   // ],
  // },
  {
    label: "Документи",
    link: "/ict-files",
    icon: <FcDocument />,
    // submenu: [
    //   { label: "Актуальні завантаження", link: "/current-transportation" },
    //   { label: "Тендери", link: "/tenders" },
    //   { label: "Закриті завантаження", link: "/closed-transportation" },
    //   { label: "Запит ціни", link: "/transportation-price" },
    // ],
  },
  {
    label: "Завантаження",
    link: "/logistic-work",
    icon: <FcShipped />,
    // submenu: [
    //   { label: "Актуальні завантаження", link: "/current-transportation" },
    //   { label: "Тендери", link: "/tenders" },
    //   { label: "Закриті завантаження", link: "/closed-transportation" },
    //   { label: "Запит ціни", link: "/transportation-price" },
    // ],
  },
  // {
  //   label: "Експедиція",
  //   icon: <FcSalesPerformance />,
  //   submenu: [
  //     { label: "Перевезення актуальні", link: "/transportation" },
  //     { label: "Перевезення закриті", link: "/closed-transportation" },
  //     { label: "Необхідно провести номери", link: "/transport-numbers" },
  //   ],
  // },
  {
    label: "Контрагенти",
    link: "/carriers",
    icon: <FcConferenceCall />,
  },
  {
    label: "Працівники",
    link: "/workers",
    icon: <FcBusinessman />,
    isDir: true,
  },
  {
    label: "Закриті завантаження",
    link: "/closed-cargos",
    icon: <MdCarCrash />,
    status: "red",
    isDir: true,
  },
  {
    label: "Адміністрування",
    link: "/admin",
    icon: <SiAdminer />,
    status: "red",
    isDir: true,
  },
];

// export const navbar_dir__menu = [
//   // { label: "Чат", link: "/chat", icon: <FcAssistant /> },
//   {
//     label: "Завантаження",
//     link: "/logistic-work",
//     icon: <FcShipped />,
//     // submenu: [
//     //   { label: "Актуальні завантаження", link: "/current-transportation" },
//     //   { label: "Тендери", link: "/tenders" },
//     //   { label: "Закриті завантаження", link: "/closed-transportation" },
//     //   { label: "Запит ціни", link: "/transportation-price" },
//     // ],
//   },
//   // {
//   //   label: "Експедиція",
//   //   icon: <FcSalesPerformance />,
//   //   submenu: [
//   //     { label: "Перевезення актуальні", link: "/transportation" },
//   //     { label: "Перевезення закриті", link: "/closed-transportation" },
//   //     { label: "Необхідно провести номери", link: "/transport-numbers" },
//   //   ],
//   // },
//   {
//     label: "Контрагенти",
//     link: "/carriers",
//     icon: <FcConferenceCall />,
//   },
//   {
//     label: "Працівники",
//     link: "/workers",
//     icon: <FcBusinessman />,
//     isDir: true,
//   },
// ];
