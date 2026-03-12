"use client";

import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ClientSideRowModelModule,
  RowSelectionModule,
  PinnedRowModule,
  ValidationModule,
  themeQuartz,
} from "ag-grid-community";
import { data } from "@/data";

// Register the required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowSelectionModule,
  PinnedRowModule,
  ValidationModule,
]);

const names = [
  "APPA",
  "RAMAYE",
  "ANAMAAL",
  "MALIKA",
  "KARTHI",
  "POONGODI",
  "RASAMMAL",
  "GOPI",
  "PAPATHI",
  "GUNASEKAR",
  "KARTHIKRAJ",
  "MURUGESH",
  "RANI",
  "SANTHI",
  "KALIYAMMAL",
  "REVATHI",
];
const dates = [
  "01/01/2026",
  "02/01/2026",
  "03/01/2026",
  "04/01/2026",
  "05/01/2026",
  "06/01/2026",
  "07/01/2026",
  "08/01/2026",
  "09/01/2026",
  "10/01/2026",
];

// Generate dummy rows matching the format roughly
// const generateData = () => {
//   return [...names, ...names, ...names, ...names, ...names, ...names].map(
//     (name, i) => {
//       const row: any = { sno: i + 1, name };
//       dates.forEach((_, j) => {
//         row[`d${j}_m`] = (Math.random() * 20 + 3).toFixed(2);
//         row[`d${j}_e`] = (Math.random() * 20 + 3).toFixed(2);
//       });
//       return row;
//     },
//   );
// };

export default function Home() {
  const [rowData] = useState(data);

  const pinnedBottomRowData = useMemo(() => {
    const totals: any = {
      sno: undefined,
      name: "Total Liters",
    };

    let grandTotal = 0;
    dates.forEach((_, index) => {
      const fieldM = `d${index}_m`;
      const fieldE = `d${index}_e`;

      const sumM = rowData.reduce(
        (acc, row: any) => acc + parseFloat(row[fieldM] || "0"),
        0,
      );
      const sumE = rowData.reduce(
        (acc, row: any) => acc + parseFloat(row[fieldE] || "0"),
        0,
      );

      totals[fieldM] = sumM.toFixed(2);
      totals[fieldE] = sumE.toFixed(2);
      grandTotal += sumM + sumE;
    });

    // Explicitly set the total for the pinned row if needed,
    // although valueGetter should handle it, this ensures it's correct.
    totals.total = grandTotal.toFixed(2);

    return [totals];
  }, [rowData]);

  const dateColumns: ColGroupDef[] = dates.map((date, index) => ({
    headerName: date,
    children: [
      {
        field: `d${index}_m`,
        headerName: "M",
        width: 85,
        valueFormatter: (p) => (p.value ? `${p.value} L` : "-"),
      },
      {
        field: `d${index}_e`,
        headerName: "E",
        width: 85,
        valueFormatter: (p) => (p.value ? `${p.value} L` : "-"),
      },
    ],
  }));

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      field: "sno",
      headerName: "S.No",
      pinned: "left",
      width: 70,
    },
    {
      field: "name",
      headerName: "Name",
      pinned: "left",
      width: 130,
    },
    ...dateColumns,
    {
      headerName: "Total",
      pinned: "right",
      width: 120,
      valueGetter: (p: any) => {
        if (!p.data) return "0.00";
        let total = 0;
        dates.forEach((_, index) => {
          total += parseFloat(p.data[`d${index}_m`] || "0");
          total += parseFloat(p.data[`d${index}_e`] || "0");
        });
        return total.toFixed(2);
      },
      valueFormatter: (p: any) => (p.value ? `${p.value} L` : "-"),
    },
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: false,
      resizable: false,
    }),
    [],
  );

  return (
    <>
      {" "}
      <div
        style={{ padding: "1rem", height: "100vh", width: "100%" }}
        className="bg-amber-500"
      >
        <div style={{ height: "100%", width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            theme={themeQuartz.withParams({
              columnBorder: { style: "solid", color: "#e2e8f0" },
              headerColumnBorder: { style: "solid", color: "#e2e8f0" },
              headerColumnBorderHeight: "100%",
              rowVerticalPaddingScale: 0.8,
              headerVerticalPaddingScale: 0.5,
              cellHorizontalPadding: 8,
              fontSize: 12,
            })}
            rowSelection={{ mode: "multiRow" }}
            selectionColumnDef={{
              pinned: "left",
              width: 32,
            }}
            pinnedBottomRowData={pinnedBottomRowData}
          />
        </div>
      </div>
    </>
  );
}
