import { useState } from "react";

const ChatSelect = ({ department, setDepartment }) => {
  return (
    <div className="chat__select">
      <select
        onChange={(e) => setDepartment(e.target.value)}
        name="users__department"
        defaultValue={"Усі працівники"}
      >
        <option value="Усі працівники">Усі працівники</option>
        <option value="Відділ внутрішніх перевезень">
          Відділ внутрішніх перевезень
        </option>
        <option value="Відділ міжнародних перевезень">
          Відділ міжнародних перевезень
        </option>
        <option value="Відділ нестандартних перевезень">
          Відділ нестандартних перевезень
        </option>
      </select>
    </div>
  );
};

export default ChatSelect;
