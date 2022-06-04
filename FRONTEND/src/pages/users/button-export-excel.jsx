import React from "react";
import ReactExport from "react-export-excel";
import Button from "@material-ui/core/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ButtonExportExcel({ filename, data, text, style }) {
  return (
    <span style={style}>
      <ExcelFile
        filename={filename}
        element={
          <Button variant="outlined" color="primary">
            {text}
          </Button>
        }
      >
        <ExcelSheet data={data} name="Data Penghuni">
          <ExcelColumn label="#" value="no" />
          <ExcelColumn label="Nama" value="name" />
          <ExcelColumn label="Kamar" value="room_name" />
          <ExcelColumn label="No HP" value="phone" />
          <ExcelColumn label="Role" value="role" />
          <ExcelColumn label="Status" value="status" />
        </ExcelSheet>
      </ExcelFile>
    </span>
  );
}
