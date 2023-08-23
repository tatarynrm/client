import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import socket from "../../utils/socket";
import moment from "moment";
import "moment/locale/uk";
import axios from "axios";
const ZapReminder = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [yes,setYes] = useState(false)
  const userData = useSelector((state) => state.auth.data);
  const zap = useSelector((state) => state.zap.zap.items);
  const myZap = zap?.filter((item) => item.KOD_OS === userData?.KOD);

  useEffect(()=>{
   
    const checkZapLifeTime = () => {
      const someZap = myZap?.some((item) => {
        let ol;
         ol = Date.now() - moment(item.DATUPDATE).valueOf() > 86400000;
         if (ol === true) {
          setYes(true)
         }
      });
    };
    checkZapLifeTime()
  },[userData,myZap])
  useEffect(() => {
 if (yes === true) {
    setTimeout(()=>{
        setOpen(true)
        axios.get(`https://api.telegram.org/bot5733508440:AAHyqrinKscVQcQsA7istfD3-roQpzgazZs/sendMessage?chat_id=${userData?.TELEGRAMID}&text=Ви не оновляли одну з заявок більш ніж 24 години.Прошу перевірити актуальність ваших завантажень.Оновіть заявки, або видаліть їх (якщо вони втратили актуальність.)`)
    },600000)
 }
  }, [yes]);
  return (
    <>
      <Modal
        title={`Повідомлення від Адміністратора`}
        centered
        open={open}
        onOk={() => {
            setOpen(false);
            setYes(false)
        }}
        // onCancel={() => setOpen(false)}
        width={1000}
        cancelButtonProps={{
          disabled: true,
          style: {
            display: "none",
          },
        }}
      >
        <p>{`${userData?.IMJA}, перевірте акутальність ваших завантажень!`}</p>
      </Modal>
    </>
  );
};

export default ZapReminder;
