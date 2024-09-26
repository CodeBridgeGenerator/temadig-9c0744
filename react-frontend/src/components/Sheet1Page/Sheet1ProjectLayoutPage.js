import React from "react";
import ProjectLayout from "../Layouts/ProjectLayout";
import { connect } from "react-redux";
import Sheet1Page from "./Sheet1Page";

const Sheet1ProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <Sheet1Page />
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

export default connect(mapState, mapDispatch)(Sheet1ProjectLayoutPage);