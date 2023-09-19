import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
const ZapStatusTable = ({ data }) => {
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    setMyData(data);
  }, []);
  const clsXlsxStatus = (status) => {
    switch (status) {
      case 0:
        return "Актуальна";

      case 1:
        return "Видалена";

      case 2:
        return "Закрита нами";
      case 3:
        return "Не закрита нами";
      case 4:
        return "Відмінена замовником";
      case 5:
        return "Закрита замовником";
      case 6:
        return "Запит ціни";

      default:
        break;
    }
  };
  const tableCustomStyles = {
    headRow: {
      style: {
        color: "#223336",
        backgroundColor: "#e7eef0",
      },
    },
    rows: {
      style: {
        color: "black",
        backgroundColor: "lightgrey",
      },
      stripedStyle: {
        color: "white",
        backgroundColor: "black",
      },
    },
  };
  const conditionalRowStyles = [
    {
      when: (row) => row.calories < 300,
      style: {
        backgroundColor: "green",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    // You can also pass a callback to style for additional customization
    {
      when: (row) => row.calories < 400,
      style: (row) => ({ backgroundColor: row.isSpecial ? "pink" : "inerit" }),
    },
  ];

  const columns = [
    {
      name: "№",
      selector: (row) => row.KOD,
      cellExport: (row) => row.KOD,
      width: "100px",
    },
    {
      name: "Дата",
      selector: (row) => moment(row.DAT).format("LLL"),
      cellExport: (row) => moment(row.DAT).format("LLL"),
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Автор",
      selector: (row) => row.PIP,
      cellExport: (row) => row.PIP,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Статус",
      selector: (row) => clsXlsxStatus(row.STATUS),
      cellExport: (row) => clsXlsxStatus(row.STATUS),
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Завантаження",
      selector: (row) => row.ZAV,
      cellExport: (row) => row.ZAV,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Вигрузка",
      selector: (row) => row.ROZV,
      cellExport: (row) => row.ROZV,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Інформація",
      selector: (row) => row.ZAPTEXT,
      cellExport: (row) => row.ZAPTEXT,
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Замовник",
      selector: (row) => (row.ZAM ? row.ZAM : "-"),
      cellExport: (row) => (row.ZAM ? row.ZAM : "-"),
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "К-сть коментарів",
      selector: (row) => row.COUNTCOMM,
      cellExport: (row) => row.COUNTCOMM,
      sortable: true,
      maxWidth: "50px",
    },
    // { name: "Коментарі", selector: (row) => row.COMMENTS.PIP ?row.COMMENTS.PIP : null  , cellExport:row=> row.COMMENTS.PIP ?row.COMMENTS.PIP : null  ,sortable: true,maxWidth:"50px", },
    // // { name: 'Folio', selector: row => row.Cfdi_Folio, cellExport: row => row.Cfdi_Folio, sortable: true },
  ];
  //   const data = [
  //     { DAT: "231321", CITY_FROM: "Lviv", CITY_TO: "Kyiv" },
  //     { DAT: "1234", CITY_FROM: "321", CITY_TO: "Kyi3232v" },
  //   ];
  const tableData = {
    columns,
    data,
  };

  const expandedComponent = ({ data }) => {
    return (
      <pre>
        {data.COMMENTS !== null
          ? data.COMMENTS.map(
              (item) => `${moment(item.DAT).format('LLL')} ${item.PIP}-${item.PRIM}\n`
            )
          : "---"}
      </pre>
    );
  };
  return (
    <>
      <h1>Таблиця статусів заявок</h1>

      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          customStyles={tableCustomStyles}
          responsive={true}
          expandableRows={true}
          expandableRowsComponent={expandedComponent}
        ></DataTable>
      </DataTableExtensions>
    </>
  );
};

export default ZapStatusTable;
