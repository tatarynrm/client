import { useDispatch } from "react-redux";
import "./Printers.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useSelector } from "react-redux";
import { fetchCart, fetchPrinters } from "../../redux/slices/cartriges";
import { useEffect } from "react";
const Printers = () => {
  const cart = useSelector((state) => state.cart.cart.items);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchCart());
  }, []);


  return (
    <div className="printers container">
      <Tabs>
        <TabList>
          <Tab>Моделі принтерів</Tab>
          <Tab onClick={()=>dispatch(fetchPrinters())}>Принтери</Tab>
          <Tab>Моделі картриджів</Tab>
          <Tab>Картриджі</Tab>
          <Tab>Заміна картриджів</Tab>
        </TabList>

        <TabPanel>
          {cart &&
            cart.map((item, idx) => {
              return <div key={idx} className="printer__model">{item.model}</div>;
            })}
        </TabPanel>
        <TabPanel>
          {cart &&
            cart.map((item, idx) => {
              return <div key={idx} className="printer">
                <div>{item.prn_inv}</div>
                <div>{item.model}</div>
                <div>{item.prn_serial}</div>
              </div>;
            })}
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Printers;
