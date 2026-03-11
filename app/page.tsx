"use client";

import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ClientSideRowModelModule,
  RowSelectionModule,
  themeQuartz,
} from "ag-grid-community";

// Register the required modules
ModuleRegistry.registerModules([ClientSideRowModelModule, RowSelectionModule]);

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
const generateData = () => {
  return names.map((name, i) => {
    const row: any = { sno: i + 1, name };
    dates.forEach((_, j) => {
      row[`d${j}_m`] = (Math.random() * 20 + 3).toFixed(2);
      row[`d${j}_e`] = (Math.random() * 20 + 3).toFixed(2);
    });
    return row;
  });
};

export default function Home() {
  const [rowData] = useState(generateData());

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
    { field: "sno", headerName: "S.No", pinned: "left", width: 70 },
    { field: "name", headerName: "Name", pinned: "left", width: 130 },
    ...dateColumns,
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
    }),
    [],
  );

  return (
    <div style={{ padding: "1rem", height: "100vh", width: "100%" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          theme={themeQuartz}
          rowSelection={{ mode: "multiRow" }}
        />
      </div>
    </div>
  );
}
