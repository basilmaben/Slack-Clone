import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userAction, errorAction } from "@/actions";
import { authSelector, errorSelector } from "@/reducers/";
import { HOCForm } from "@/components/common";
import RegisterPage from "./RegisterPage.jsx";

class RegisterPageContainer extends React.Component {
  redirectToLogin = () => {
    const { history } = this.props;
    history.push("/login");
  };

  handleRegister = () => {
    const {
      fetchRegisterUser,
      clearAllError,
      updateFieldErrors,
      fieldsValidation,
      formFields
    } = this.props;

    const fieldErrors = fieldsValidation();
    if (formFields.password !== formFields.confirmPassword) {
      // display error if confirm password does not match password
      updateFieldErrors({
        confirmPassword: "confirm password have to match with password"
      });
    }
    // fetch login if there are no errors
    if (Object.keys(fieldErrors).length === 0) {
      fetchRegisterUser({
        username: formFields.username,
        email: formFields.email,
        password: formFields.password
      });
      clearAllError();
    }
  };

  render() {
    const {
      isUserLoggedIn,
      error,
      fieldErrors,
      isLoading,
      formFields,

      handleFieldChange
    } = this.props;
    return (
      <RegisterPage
        isUserLoggedIn={isUserLoggedIn}
        error={error}
        fieldErrors={fieldErrors}
        isLoading={isLoading}
        formFields={formFields}
        handleFieldChange={handleFieldChange}
        handleRegister={this.handleRegister}
        redirectToLogin={this.redirectToLogin}
      />
    );
  }
}

RegisterPageContainer.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  updateFieldErrors: PropTypes.func.isRequired,
  fetchRegisterUser: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  fieldsValidation: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isLoading: authSelector.getAuthIsLoading(state),
  isUserLoggedIn: authSelector.getIsUserLoggedIn(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => dispatch(errorAction.clearAllError()),
  fetchRegisterUser: credential => {
    dispatch(userAction.fetchRegisterUser(credential));
  }
});

const formDataToProps = () => ({
  formFields: { username: "", email: "", password: "", confirmPassword: "" },
  fieldsToValidate: ["username", "email", "password"]
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCForm(formDataToProps)(RegisterPageContainer));
