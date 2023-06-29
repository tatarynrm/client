import "./CompanyFiles.scss";
import { GrDocumentZip } from "react-icons/gr";
import { FcDocument } from "react-icons/fc";
const ict_docs = [
  {
    title: "ДТЕП",
    link: "http://192.168.5.180/files/DTEP.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Логістик",
    link: "http://192.168.5.180/files/LOGISTIC.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Фрахт",
    link: "http://192.168.5.180/files/FRAKHT.zip",
    img: <GrDocumentZip />,
  },
];
const fop_docs = [
  {
    title: "Гладій Л.О.",
    link: "http://192.168.5.180/files/GLADIY.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Рубель О.М.",
    link: "http://192.168.5.180/files/RYBEL.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Сніжко Н.М.",
    link: "http://192.168.5.180/files/SNIZHKO.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Соломенцева З.Ю.",
    link: "http://192.168.5.180/files/SOLOMENCEVA.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Теклишин Г.І.",
    link: "http://192.168.5.180/files/TEKLYSHYN.zip",
    img: <GrDocumentZip />,
  },
];
const doc__word = [
  {
    title: "Опитувальний лист",
    link: "http://192.168.5.180/files/ICT_LIST.doc",
    img: <FcDocument />,
  },
  {
    title: "Заява про ... персональних даних",
    link: "http://192.168.5.180/files/OPD_ZAY.doc",
    img: <FcDocument />,
  },
];
const CompanyFiles = () => {
  return (
    <div className="company__files container">
      <div className="ict__docs">
        <h3>Документи ICT</h3>
        <div className="docs__block">
          {ict_docs.map((item, idx) => {
            return (
              <a
                key={idx}
                className="document__link-container"
                href={item.link}
                download
              >
                <div className="document__info-container">
                  {item.img}

                  <span className="document__name">{item.title}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div className="ict__docs">
        <h3>Документи ФОП</h3>
        <div className="docs__block">
          {fop_docs.map((item, idx) => {
            return (
              <a
                key={idx}
                className="document__link-container"
                href={item.link}
                download
              >
                <div className="document__info-container">
                  {item.img}

                  <span className="document__name">{item.title}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div className="ict__docs">
        <h3>Документи для контраентів</h3>
        <div className="docs__block">
          {doc__word.map((item, idx) => {
            return (
              <a
                key={idx}
                className="document__link-container"
                href={item.link}
                download
              >
                <div className="document__info-container">
                  {item.img}

                  <span className="document__name">{item.title}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyFiles;
