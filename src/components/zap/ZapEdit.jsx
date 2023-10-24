import { useDispatch, useSelector } from "react-redux";
import "./ZapEdit.scss";
import { AiFillDelete, AiFillEdit, AiOutlineCopy } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import axios from "../../utils/axios";
import {
  editZapDeleteData,
  editZapDeleteStatus,
  editZapEditData,
  editZapRedux,
  editZapZakrStatus,
} from "../../redux/slices/edit";
import { useEffect } from "react";
import socket from "../../utils/socket";
import { useState } from "react";
import moment from "moment";
import { MdDoneOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
const ZapEdit = ({ item, showAddZap, setZapMenu, setEditZap, openZapMenu }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const userData = useSelector((state) => state.auth.data);
  const zap = useSelector((state) => state.zap.items);
  const refreshAccessTime = Date.now() - moment(item.DATUPDATE).valueOf();
  const dispatch = useDispatch();
  const zapEditStatus = useSelector((state) => state.edit.zapEdit);
  const zapDeleteStatus = useSelector((state) => state.edit.zapDeleteStatus);
  const [zapDelete, setZapDelete] = useState(false);
  const editCurrentZap = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(editZapRedux());
    setZapMenu(false);
    dispatch(
      editZapEditData({
        zav: item.ZAV,
        rozv: item.ROZV,
        zapText: item.ZAPTEXT,
        zapKod: item.KOD,
        zapKodOs: item.KOD_OS,
        zapCina: item.ZAPCINA,
        zapGroup: item.KOD_GROUP,
        zapKodZam: item.KOD_ZAM,
        pKilAm: item.KILAMACT,
      })
    );
  };
  const refreshZap = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {

        if (refreshAccessTime < 1800000) {
          alert("Заявку можна оновити після 30хв");
          setZapMenu(false);
        } else {
          const data = await axios.post("/zap/refresh", {
            pKodAuthor: userData?.KOD,
            pKodZap: item.KOD,
          });
          setZapMenu(false);
          // const date = new Date().toDateString();
          if (data.status === 200) {
            socket.emit("refreshZap", item.KOD);
          }
        }
   
    } catch (error) {
      console.log(error);
    }
  };
  const submitEditForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const showDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(editZapDeleteStatus());
    dispatch(
      editZapDeleteData({
        pKodAuthor: item.KOD_OS,
        pKodZap: item.KOD,
        zav: item.ZAV,
        rozv: item.ROZV,
      })
    );
  };
  const showZakr = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(editZapZakrStatus());
    dispatch(
      editZapDeleteData({
        pKodAuthor: item.KOD_OS,
        pKodZap: item.KOD,
        zav: item.ZAV,
        rozv: item.ROZV,
      })
    );
  };
  // const deleteZap = async (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   try {
  //     if (window.confirm("Ви впевнені що хочете видалити дану заявку?")) {
  //       const data = await axios.post("/zap/delete", {
  //         pKodAuthor: userData?.KOD,
  //         pStatus: 1,
  //         pKodZap: item.KOD,
  //       });
  //       setZapMenu(false);
  //       if (data.status === 200) {
  //         socket.emit("deleteZap", item.KOD);
  //       }
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmitAddZap = async (e) => {
    console.log(item);
    e.preventDefault();
    const object = {
      pKodAutor: userData.KOD,
      pKodZap: item.KOD,
      pKilAm:2

    };

    try {
      if (window.confirm("Створити копію ?")) {
        const data = await axios.post("/zap/copy", object);
        if (data.status === 200) {
          console.log('COPY');
          // socket.emit("newZap", {
          //   ...object,
          //   ZAP_KOD: dataKod,
          //   ZAM_NAME: zamName,
          // });
          // dispatch(editZapAddSlice());
          // dispatch(changeAddZapSuccess());
          // setTimeout(() => {
          //   dispatch(changeAddZapSuccess());
          // }, 4000);
        }
      } else {
        alert("Виникла якась помилка");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [zap]);
  return (
    <>
      <div className="zap__menu-buttons">
        <i onClick={editCurrentZap} className="zap__edit-block  zap__edit-edit">
          <AiFillEdit />
          <span>Редагувати</span>
        </i>
        <i onClick={refreshZap} className="zap__edit-block  zap__edit-edit">
          <BiRefresh />
          <span>Оновити заявку</span>
        </i>
        <i onClick={showZakr} className="zap__edit-block zap__edit-delete">
          <MdDoneOutline />
          <span>Закрита нами</span>
        </i>
        <i onClick={showDelete} className="zap__edit-block zap__edit-delete">
          <GiCancel />
          <span>Відмінена</span>
        </i>
        <i
          onClick={handleSubmitAddZap}
          className="zap__edit-block zap__edit-delete"
        >
          <AiOutlineCopy />
          <span>Стоврити копію</span>
        </i>
      </div>
    </>
  );
};

export default ZapEdit;
