"use client";

import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  ClientSideRowModelModule,
  RowSelectionModule,
  RowSelectionOptions,
  SelectionColumnDef,
  themeQuartz,
} from "ag-grid-community";

// Register the required modules for Client-side Row Model and Selection
ModuleRegistry.registerModules([ClientSideRowModelModule, RowSelectionModule]);

export default function Home() {
  // Dummy data expanded to 10 rows with 10 fields
  const [rowData, setRowData] = useState([
    {
      id: "101",
      name: "John Doe",
      email: "john@example.com",
      age: 28,
      phone: "555-0101",
      country: "USA",
      city: "New York",
      department: "Engineering",
      role: "Developer",
      status: "Active",
    },
    {
      id: "102",
      name: "Jane Smith",
      email: "jane.smith@foo.com",
      age: 34,
      phone: "555-0102",
      country: "UK",
      city: "London",
      department: "Design",
      role: "UI/UX",
      status: "Active",
    },
    {
      id: "103",
      name: "Sam Johnson",
      email: "sam.j@test.org",
      age: 41,
      phone: "555-0103",
      country: "Canada",
      city: "Toronto",
      department: "Sales",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: "104",
      name: "Anna Lee",
      email: "anna@example.com",
      age: 29,
      phone: "555-0104",
      country: "Australia",
      city: "Sydney",
      department: "Marketing",
      role: "Specialist",
      status: "Active",
    },
    {
      id: "105",
      name: "Mike Davis",
      email: "mike.d@foo.com",
      age: 45,
      phone: "555-0105",
      country: "USA",
      city: "Chicago",
      department: "Engineering",
      role: "Lead",
      status: "Active",
    },
    {
      id: "106",
      name: "Linda Brown",
      email: "linda@test.org",
      age: 32,
      phone: "555-0106",
      country: "Germany",
      city: "Berlin",
      department: "HR",
      role: "Manager",
      status: "Active",
    },
    {
      id: "107",
      name: "David Wilson",
      email: "david.w@example.com",
      age: 39,
      phone: "555-0107",
      country: "UK",
      city: "Manchester",
      department: "Engineering",
      role: "QA Engineer",
      status: "Inactive",
    },
    {
      id: "108",
      name: "Chloe Taylor",
      email: "chloe@foo.com",
      age: 26,
      phone: "555-0108",
      country: "USA",
      city: "Austin",
      department: "Design",
      role: "Graphic Designer",
      status: "Active",
    },
    {
      id: "109",
      name: "Robert Anderson",
      email: "robert@example.com",
      age: 48,
      phone: "555-0109",
      country: "Canada",
      city: "Vancouver",
      department: "Finance",
      role: "Analyst",
      status: "Active",
    },
    {
      id: "110",
      name: "Sophia Martinez",
      email: "sophia@test.org",
      age: 31,
      phone: "555-0110",
      country: "Spain",
      city: "Madrid",
      department: "Marketing",
      role: "Manager",
      status: "Active",
    },
  ]);

  // Expanded to 10 data columns
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id", filter: true, minWidth: 100 },
    { field: "name", filter: true, minWidth: 150 },
    { field: "email", filter: true, minWidth: 200 },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 100 },
    { field: "phone", filter: true, minWidth: 130 },
    { field: "country", filter: true, minWidth: 120 },
    { field: "city", filter: true, minWidth: 120 },
    { field: "department", filter: true, minWidth: 150 },
    { field: "role", filter: true, minWidth: 150 },
    { field: "status", filter: true, minWidth: 100 },
  ]);

  // Global column definition options
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      flex: 1,
      minWidth: 120,
    };
  }, []);

  // Use the new v35 row selection configuration
  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  // Configure the built-in selection column to be strictly pinned to the left
  const selectionColumnDef = useMemo<SelectionColumnDef>(() => {
    return {
      pinned: "left",
      width: 50,
      suppressHeaderMenuButton: true,
    };
  }, []);

  return (
    <div style={{ padding: "2rem", height: "100vh", width: "100%" }}>
      <h2>AG Grid Example</h2>
      <div style={{ height: "60vh", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          selectionColumnDef={selectionColumnDef}
          theme={themeQuartz}
        />
      </div>
    </div>
  );
}
