import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

class ChannelHeader extends React.Component {
  state = {};

  render() {
    const { currentTeam, toggleAddChannelModal } = this.props;
    return (
      <React.Fragment>
        <h1 className="leftsidebar__List__header">
          <span className="leftsidebar__List__header__title">Channels</span>
          <Icon
            className="leftsidebar__List__header__icon"
            onClick={toggleAddChannelModal}
            name="plus circle"
          />
        </h1>
      </React.Fragment>
    );
  }
}
ChannelHeader.propTypes = {
  currentTeam: PropTypes.object.isRequired,
  toggleAddChannelModal: PropTypes.func.isRequired
};

export default ChannelHeader;
