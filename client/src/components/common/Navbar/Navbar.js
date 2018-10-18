import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userAction } from "@/actions";
import { authSelector, userSelector } from "@/reducers/";
import Navbar from "./Navbar.jsx";

class NavbarContainer extends React.Component {
  handleLogout = () => {
    const { fetchLogoutUser, history } = this.props;
    fetchLogoutUser();
    history.push("/");
  };

  render() {
    const { isUserLoggedIn, currentUser, history } = this.props;

    return (
      <Navbar
        isUserLoggedIn={isUserLoggedIn}
        history={history}
        currentUser={currentUser}
        handleLogout={this.handleLogout}
      />
    );
  }
}

NavbarContainer.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  fetchLogoutUser: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  fetchLogoutUser: () => {
    dispatch(userAction.fetchLogoutUser());
  }
});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavbarContainer)
);
