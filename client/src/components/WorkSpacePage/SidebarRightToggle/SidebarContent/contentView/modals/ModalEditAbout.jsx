import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ButtonInline } from "@/components/common";
import FormEditAbout from "./FormEditAbout.jsx";

class ModalEditFeeling extends React.Component {
  handleSave = () => {
    const {
      formFields,
      fieldsValidation,
      toggleModal,
      currentTeam,
      fetchEditTeam
    } = this.props;
    const fieldErrors = fieldsValidation();
    this.setState({ fieldErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      fetchEditTeam({
        brief_description: formFields.about,
        teamId: currentTeam.id
      });
      toggleModal();
    }
  };

  render() {
    const {
      formFields,
      isModalOpen,
      fieldErrors,
      currentAbout,

      toggleModal,
      handleFieldChange
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Content>
              <FormEditAbout
                formFields={formFields}
                handleFieldChange={handleFieldChange}
                handleSave={this.handleSave}
                fieldErrors={fieldErrors}
              />
            </Modal.Content>
          </Modal>
        )}
        {!isModalOpen && currentAbout ? (
          <ButtonInline
            title={currentAbout}
            cssClass="lightgrey"
            displayText="edit"
            icon={<i className="fas fa-pencil-alt" />}
            handleClick={toggleModal}
          />
        ) : (
          <ButtonInline
            cssClass="lightgrey"
            title={currentAbout}
            displayText="add about team"
            icon={<i className="fas fa-pencil-alt" />}
            handleClick={toggleModal}
          />
        )}
      </React.Fragment>
    );
  }
}

ModalEditFeeling.propTypes = {
  formFields: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentAbout: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default ModalEditFeeling;
