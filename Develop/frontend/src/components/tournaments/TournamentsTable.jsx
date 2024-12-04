import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TEST_TOURNAMENTS } from "../../util/test/tournaments";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme (use any theme you like)
import "primereact/resources/primereact.min.css"; // PrimeReact core styles

export async function loader() {}

export default function TournamentsTable(props) {
  const { tournaments } = props;
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  useEffect(() => {
    setProducts(TEST_TOURNAMENTS);
  }, []);

  const header = renderHeader();

  return (
    <div className="card max-w-screen-xl mx-auto my-0 shadow-md rounded-lg p-8">
      <DataTable
        size="small"
        value={tournaments}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        header={header}
        filters={filters}
        globalFilterFields={[
          "tournamentName",
          "court.location",
          "date",
          "registrationFee",
          "reward",
          "playerLevel",
        ]}
        emptyMessage="No tournaments found."
      >
        <Column
          sortable
          field="tournamentName"
          header="Tournament name"
        ></Column>
        <Column sortable field="court.location" header="Location"></Column>
        <Column sortable field="date" header="Date"></Column>
        <Column
          sortable
          field="registrationFee"
          header="Registration fee"
        ></Column>
        <Column sortable field="reward" header="Reward"></Column>
        <Column sortable field="playerLevel" header="Player level"></Column>
      </DataTable>
    </div>
  );
}