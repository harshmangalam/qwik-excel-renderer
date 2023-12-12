import { $, NoSerialize, useSignal } from "@builder.io/qwik";
import * as XLSX from "xlsx";

export type XLSXData = {
  rows: any[];
  cols: any[];
};
export const useXLSXRenderer = () => {
  const data = useSignal<XLSXData>();
  const error = useSignal(null);

  const xlsxRenderer = $((file: NoSerialize<File>) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = function (e) {
        const bstr = e.target?.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const json = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const o = [];

        if (ws["!ref"]) {
          const c = XLSX.utils.decode_range(ws["!ref"]).e.c + 1;
          for (let i = 0; i < c; ++i) {
            o[i] = { name: XLSX.utils.encode_col(i), key: i };
          }
        }

        const result = { rows: json, cols: o };
        data.value = result;
        resolve(result);
      };
      if (file && rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file as Blob);
    });
  });
  return {
    xlsxRenderer,
    data: data.value,
    error: error.value,
  };
};
