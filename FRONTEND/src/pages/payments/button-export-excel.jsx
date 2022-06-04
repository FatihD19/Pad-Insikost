import React from "react";
import ReactExport from "react-export-excel";
import Button from "@material-ui/core/Button";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ButtonExportExcel({ data }) {
  return (
    <ExcelFile
      filename="Data Pembayaran"
      element={
        <Button variant="outlined" color="primary">
          Export Excel
        </Button>
      }
    >
      <ExcelSheet data={data} name="Data Pembayaran">
        <ExcelColumn label="#" value="no" />
        <ExcelColumn label="Penghuni" value="penghuni" />
        <ExcelColumn label="Kamar" value="kamar" />
        <ExcelColumn label="Harga kamar" value="harga_kamar" />
        <ExcelColumn label="Uang diterima" value="uang_diterima" />
        <ExcelColumn label="Uang kembalian" value="uang_kembalian" />
        <ExcelColumn label="Periode" value="periode" />
        <ExcelColumn label="Tanggal" value="tanggal" />
      </ExcelSheet>
    </ExcelFile>
  );
}
