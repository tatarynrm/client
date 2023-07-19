import "./CompanyFiles.scss";
import { GrDocumentZip } from "react-icons/gr";
import { FcDocument } from "react-icons/fc";
const ict_docs = [
  {
    title: "ДТЕП",
    link: "https://noris-dev.space/files/DTEP.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Логістик",
    link: "https://noris-dev.space/files/LOGISTIC.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Фрахт",
    link: "https://noris-dev.space/files/FRAKHT.zip",
    img: <GrDocumentZip />,
  },
];
const fop_docs = [
  {
    title: "Гладій Л.О.",
    link: "https://noris-dev.space/files/GLADIY.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Рубель О.М.",
    link: "https://noris-dev.space/files/RYBEL.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Сніжко Н.М.",
    link: "https://noris-dev.space/files/SNIZHKO.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Соломенцева З.Ю.",
    link: "https://noris-dev.space/files/SOLOMENCEVA.zip",
    img: <GrDocumentZip />,
  },
  {
    title: "Теклишин Г.І.",
    link: "https://noris-dev.space/files/TEKLYSHYN.zip",
    img: <GrDocumentZip />,
  },
];
const doc__word = [
  {
    title: "Опитувальний лист",
    link: "https://noris-dev.space/files/ICT_LIST.doc",
    img: <FcDocument />,
  },
  {
    title: "Заява про ... персональних даних",
    link: "https://noris-dev.space/files/OPD_ZAY.doc",
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
