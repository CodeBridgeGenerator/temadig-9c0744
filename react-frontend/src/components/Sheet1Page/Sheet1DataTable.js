import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const Sheet1DataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const p_numberTemplate0 = (rowData, { rowIndex }) => <p >{rowData.titleNo}</p>
const p_numberTemplate1 = (rowData, { rowIndex }) => <p >{rowData.area}</p>
const p_numberTemplate2 = (rowData, { rowIndex }) => <p >{rowData.planNo}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.location}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.uomAreaDesc}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.ownerName}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.address1}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.telNo}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.address2}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.address3}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!true}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "sheet1"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="titleNo" header="TITLE_NO" body={p_numberTemplate0} filter={selectedFilterFields.includes("titleNo")} hidden={selectedHideFields?.includes("titleNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="area" header="AREA" body={p_numberTemplate1} filter={selectedFilterFields.includes("area")} hidden={selectedHideFields?.includes("area")}  sortable style={{ minWidth: "8rem" }} />
<Column field="planNo" header="PLAN_NO" body={p_numberTemplate2} filter={selectedFilterFields.includes("planNo")} hidden={selectedHideFields?.includes("planNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="location" header="LOCATION" body={pTemplate3} filter={selectedFilterFields.includes("location")} hidden={selectedHideFields?.includes("location")}  sortable style={{ minWidth: "8rem" }} />
<Column field="uomAreaDesc" header="UOM_AREA_DESC" body={pTemplate4} filter={selectedFilterFields.includes("uomAreaDesc")} hidden={selectedHideFields?.includes("uomAreaDesc")}  sortable style={{ minWidth: "8rem" }} />
<Column field="ownerName" header="OWNER_NAME" body={pTemplate5} filter={selectedFilterFields.includes("ownerName")} hidden={selectedHideFields?.includes("ownerName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="address1" header="ADDRESS_1" body={pTemplate6} filter={selectedFilterFields.includes("address1")} hidden={selectedHideFields?.includes("address1")}  sortable style={{ minWidth: "8rem" }} />
<Column field="telNo" header="TEL_NO" body={pTemplate7} filter={selectedFilterFields.includes("telNo")} hidden={selectedHideFields?.includes("telNo")}  sortable style={{ minWidth: "8rem" }} />
<Column field="address2" header="TEL_NO" body={pTemplate8} filter={selectedFilterFields.includes("address2")} hidden={selectedHideFields?.includes("address2")}  sortable style={{ minWidth: "8rem" }} />
<Column field="address3" header="address3" body={pTemplate9} filter={selectedFilterFields.includes("address3")} hidden={selectedHideFields?.includes("address3")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>
        <Dialog header="Upload Sheet1 Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="sheet1"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Sheet1" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default Sheet1DataTable;