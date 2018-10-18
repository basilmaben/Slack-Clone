import React from "react";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import FormAddTeamMember from "./FormAddTeamMember.jsx";

class ModalAddTeamMember extends React.Component {
  checkDuplicateMember = () => {
    const { formFields, currentTeamMemberList } = this.props;
    const findMember = currentTeamMemberList.filter(
      member => member.username === formFields.username
    );
    if (findMember.length > 0) return true;
    return false;
  };

  handleSubmit = async () => {
    const {
      formFields,
      fieldsValidation,
      updateFieldErrors,
      toggleModal,
      emitSocketAddTeamMember,
      currentTeam
    } = this.props;

    const fieldErrors = fieldsValidation();
    const isMemberDuplicated = this.checkDuplicateMember();
    if (isMemberDuplicated) {
      // display error if the user is already member of the team
      updateFieldErrors({
        username: `${formFields.username} is already member of the team`
      });
    }
    // proceed to send data to server if there's no error
    if (Object.keys(fieldErrors).length === 0) {
      emitSocketAddTeamMember({
        teamId: currentTeam.id,
        targetUsername: formFields.username
      });
      toggleModal();
    }
  };

  render() {
    const {
      isModalOpen,
      formFields,
      fieldErrors,

      toggleModal,
      handleFieldChange
    } = this.props;
    return (
      <React.Fragment>
        {isModalOpen ? (
          <React.Fragment>
            <Modal size="small" open={isModalOpen} onClose={toggleModal}>
              <Modal.Header>Invite Team Member</Modal.Header>
              <Modal.Content>
                <FormAddTeamMember
                  formFields={formFields}
                  fieldErrors={fieldErrors}
                  handleFieldChange={handleFieldChange}
                  toggleModal={toggleModal}
                  handleSubmit={this.handleSubmit}
                />
              </Modal.Content>
            </Modal>
            <div className="invite-people-button" onClick={toggleModal}>
              <span className="invite-people-button__plus">+</span> Invite
              People
            </div>
          </React.Fragment>
        ) : (
          <div className="invite-people-button" onClick={toggleModal}>
            <span className="invite-people-button__plus">+</span> Invite People
          </div>
        )}
      </React.Fragment>
    );
  }
}

ModalAddTeamMember.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  updateFieldErrors: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  emitSocketAddTeamMember: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired
};

export default ModalAddTeamMember;
