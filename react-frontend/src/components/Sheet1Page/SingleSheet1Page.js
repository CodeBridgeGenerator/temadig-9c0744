import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleSheet1Page = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("sheet1")
            .get(urlParams.singleSheet1Id, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Sheet1", type: "error", message: error.message || "Failed get sheet1" });
            });
    }, [props,urlParams.singleSheet1Id]);


    const goBack = () => {
        navigate("/sheet1");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Sheet1</h3>
                </div>
                <p>sheet1/{urlParams.singleSheet1Id}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">TITLE_NO</label><p className="m-0 ml-3" >{Number(_entity?.titleNo)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">AREA</label><p className="m-0 ml-3" >{Number(_entity?.area)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">PLAN_NO</label><p className="m-0 ml-3" >{Number(_entity?.planNo)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">LOCATION</label><p className="m-0 ml-3" >{_entity?.location}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">UOM_AREA_DESC</label><p className="m-0 ml-3" >{_entity?.uomAreaDesc}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">OWNER_NAME</label><p className="m-0 ml-3" >{_entity?.ownerName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ADDRESS_1</label><p className="m-0 ml-3" >{_entity?.address1}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">TEL_NO</label><p className="m-0 ml-3" >{_entity?.telNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">TEL_NO</label><p className="m-0 ml-3" >{_entity?.address2}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">address3</label><p className="m-0 ml-3" >{_entity?.address3}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleSheet1Page);
