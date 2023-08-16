import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExcelFile = ({ item,userData }) => {
  const fileType = "xlsx";
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(item);
    const wb = { Sheets: { data: ws }, SheetNames: ["zvbit"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Звіт для ${userData.PIP ?userData.PIP :''}`+`${new Date().toLocaleDateString()}` + ".xlsx");
  };
  return <button onClick={exportToCSV}>Скачати звіт</button>;
};

export default ExcelFile;
