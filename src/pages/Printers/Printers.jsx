import { useDispatch } from "react-redux";
import "./Printers.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSelector } from "react-redux";
import { fetchCart, fetchCartModels, fetchCartriges, fetchPrinters } from "../../redux/slices/cartriges";
import { useEffect } from "react";
import axios from '.././../utils/axios'
import { useState } from "react";
const Printers = () => {
  const cart = useSelector((state) => state.cart.cart.items);
  const dispatch = useDispatch();
  const [imageBlob, setImageBlob] = useState(null);
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
// const getPhoto = async (req,res) =>{
//   try {
//     const data =await axios.get('/photo')
//     console.log(data.data);
//     setImageBuffer(data.data)
//   } catch (error) {
//     console.log(error);
//   }
// }
useEffect(() => {
  axios.get('/photo', { responseType: 'arraybuffer' })
    .then(response => {
      setImageBlob(new Blob([response.data], { type: 'image/jpeg' }));
    })
    .catch(error => {
      console.error('Error fetching LOB data:', error);
    });
}, []);
  return (
    <div className="printers container">
      <Tabs>
        <TabList>
          <Tab>Моделі принтерів</Tab>
          <Tab onClick={() => dispatch(fetchPrinters())}>Принтери</Tab>
          <Tab onClick={() => dispatch(fetchCartModels())}>Моделі картриджів</Tab>
          <Tab onClick={() => dispatch(fetchCartriges())}>Картриджі</Tab>
          <Tab>Заміна картриджів</Tab>
        </TabList>
        {imageBlob && (
        <img
          src={URL.createObjectURL(imageBlob)}
          alt="LOB Image"
        />
      )}
        <TabPanel>
          {cart &&
            cart.map((item, idx) => {
              return (
                <div key={idx} className="printer__model">
                  <div>{idx + 1}</div>
                  <div>{item.model}</div>
                </div>
              );
            })}
        </TabPanel>
        <TabPanel>
          {cart &&
            cart.map((item, idx) => {
              return (
                <div key={idx} className="printer">
                  <div>{item.prn_inv}</div>
                  <div>{item.model}</div>
                  <div>{item.prnid}</div>
                  <div>{item.prn_serial}</div>
                </div>
              );
            })}
        </TabPanel>
        <TabPanel>
        {cart &&
            cart.map((item, idx) => {
              return (
                <div key={idx} className="printer">
                  <div>{idx + 1}</div>
                  <div>{item.model}</div>

                </div>
              );
            })}
        </TabPanel>
        <TabPanel>
        {cart &&
            cart.map((item, idx) => {
              return (
                <div key={idx} className="printer">
                  <div>{idx + 1}</div>
                  <div>{item.model}</div>
                  <div>{item.cart_ser}</div>

                </div>
              );
            })}
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Printers;
