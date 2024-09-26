import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const Sheet1CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            titleNo: _entity?.titleNo,area: _entity?.area,planNo: _entity?.planNo,location: _entity?.location,uomAreaDesc: _entity?.uomAreaDesc,ownerName: _entity?.ownerName,address1: _entity?.address1,telNo: _entity?.telNo,address2: _entity?.address2,address3: _entity?.address3,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("sheet1").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Sheet1 created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Sheet1" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create Sheet1" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="sheet1-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="titleNo">TITLE_NO:</label>
                <InputNumber id="titleNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.titleNo} onChange={(e) => setValByKey("titleNo", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["titleNo"]) ? (
              <p className="m-0" key="error-titleNo">
                {error["titleNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="area">AREA:</label>
                <InputNumber id="area" className="w-full mb-3 p-inputtext-sm" value={_entity?.area} onChange={(e) => setValByKey("area", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["area"]) ? (
              <p className="m-0" key="error-area">
                {error["area"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="planNo">PLAN_NO:</label>
                <InputNumber id="planNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.planNo} onChange={(e) => setValByKey("planNo", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["planNo"]) ? (
              <p className="m-0" key="error-planNo">
                {error["planNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="location">LOCATION:</label>
                <InputText id="location" className="w-full mb-3 p-inputtext-sm" value={_entity?.location} onChange={(e) => setValByKey("location", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["location"]) ? (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="uomAreaDesc">UOM_AREA_DESC:</label>
                <InputText id="uomAreaDesc" className="w-full mb-3 p-inputtext-sm" value={_entity?.uomAreaDesc} onChange={(e) => setValByKey("uomAreaDesc", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["uomAreaDesc"]) ? (
              <p className="m-0" key="error-uomAreaDesc">
                {error["uomAreaDesc"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ownerName">OWNER_NAME:</label>
                <InputText id="ownerName" className="w-full mb-3 p-inputtext-sm" value={_entity?.ownerName} onChange={(e) => setValByKey("ownerName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["ownerName"]) ? (
              <p className="m-0" key="error-ownerName">
                {error["ownerName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address1">ADDRESS_1:</label>
                <InputText id="address1" className="w-full mb-3 p-inputtext-sm" value={_entity?.address1} onChange={(e) => setValByKey("address1", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address1"]) ? (
              <p className="m-0" key="error-address1">
                {error["address1"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="telNo">TEL_NO:</label>
                <InputText id="telNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.telNo} onChange={(e) => setValByKey("telNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["telNo"]) ? (
              <p className="m-0" key="error-telNo">
                {error["telNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address2">TEL_NO:</label>
                <InputText id="address2" className="w-full mb-3 p-inputtext-sm" value={_entity?.address2} onChange={(e) => setValByKey("address2", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address2"]) ? (
              <p className="m-0" key="error-address2">
                {error["address2"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address3">address3:</label>
                <InputText id="address3" className="w-full mb-3 p-inputtext-sm" value={_entity?.address3} onChange={(e) => setValByKey("address3", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address3"]) ? (
              <p className="m-0" key="error-address3">
                {error["address3"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(Sheet1CreateDialogComponent);
