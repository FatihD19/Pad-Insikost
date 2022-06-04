import React from "react";
import ReactExport from "react-export-excel";
import Button from "@material-ui/core/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ButtonExportExcel({ data }) {
  return (
    <ExcelFile
      filename="List kamar"
      element={
        <Button variant="outlined" color="primary">
          Export Excel
        </Button>
      }
    >
      <ExcelSheet data={data} name="List kamar">
        <ExcelColumn label="#" value="no" />
        <ExcelColumn label="Kamar" value="kamar" />
        <ExcelColumn label="Penghuni" value="penghuni" />
        <ExcelColumn label="Ukuran" value="ukuran" />
        <ExcelColumn label="Harga kamar" value="harga_kamar" />
        <ExcelColumn label="Fasilitas" value="fasilitas_text" />
        <ExcelColumn label="Kondisi kamar" value="status" />
      </ExcelSheet>
    </ExcelFile>
  );
}
