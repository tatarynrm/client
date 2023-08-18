import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";
import DataTable from "react-data-table-component";

const ZapStatusTable = ({data}) => {
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
        color:'#223336',
        backgroundColor: '#e7eef0'
      },
    },
    rows: {
      style: {
        color: "black",
        backgroundColor: "lightgrey"
      },
      stripedStyle: {
        color: "white",
        backgroundColor: "black"
      }
    }
  }
  const conditionalRowStyles = [
    {
      when: row => row.calories < 300,
      style: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    // You can also pass a callback to style for additional customization
    {
      when: row => row.calories < 400,
      style: row => ({ backgroundColor: row.isSpecial ? 'pink' : 'inerit' }),
    },
  ];
  
  const columns = [
    { name: "№", selector: (row) => row.KOD,width:"100px" },
    { name: "Дата", selector: (row) => row.DAT, sortable: true,maxWidth:"150px" },
    { name: "Автор", selector: (row) => row.PIP, sortable: true,maxWidth:"150px" },
    { name: "Статус", selector: (row) => clsXlsxStatus(row.STATUS), sortable: true,maxWidth:"150px" },
    { name: "Завантаження", selector: (row) => row.ZAV, sortable: true,maxWidth:"150px" },
    { name: "Вигрузка", selector: (row) => row.ZAV, sortable: true,maxWidth:"150px" },
    { name: "Інформація", selector: (row) => row.ZAPTEXT, sortable: true,maxWidth:"300px", },
    { name: "Замовник", selector: (row) => row.ZAM ?row.ZAM : "-" , sortable: true,maxWidth:"100px", },
    { name: "К-сть коментарів", selector: (row) =>  row.COUNTCOMM , sortable: true,maxWidth:"50px", },
    // { name: "Коментарі", selector: (row) => row.COMMENTS , sortable: true,maxWidth:"50px", },

  ];
//   const data = [
//     { DAT: "231321", CITY_FROM: "Lviv", CITY_TO: "Kyiv" },
//     { DAT: "1234", CITY_FROM: "321", CITY_TO: "Kyi3232v" },
//   ];
const expandedComponent = ({data}) =>{
   return <pre>{data.ZAPTEXT}</pre>
}
  return (
    <>
      <h1>Таблиця статусів заявок</h1>

      <DataTable
        columns={columns}
        
        data={data}
        fixedHeader
        // pagination={1000}
        customStyles={tableCustomStyles}
        // conditionalRowStyles={conditionalRowStyles}
responsive={true}
expandableRows={true}
expandableRowsComponent={expandedComponent}
      ></DataTable>

      {/* <table>
        {tableData.getHeaderGroups().map(headerGroup =>(
            <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
            </tr>
        ))}
    </table> */}
    </>
  );
};

export default ZapStatusTable;
