import React from "react";
import PropTypes from "prop-types";

class DirectMessageList extends React.Component {
  state = {};

  render() {
    const { directMessageMemberList } = this.props;
    return (
      <React.Fragment>
        {directMessageMemberList.map(directMessageMember => (
          <li
            key={directMessageMember.id}
            className="leftsidebar__List__item leftsidebar__List__item--link"
          >
            <Bubble /> {directMessageMember.username}
          </li>
        ))}
      </React.Fragment>
    );
  }
}
const Bubble = ({ on = true }) =>
  on ? <span className="leftsidebar__List__bubble">●</span> : "○";

DirectMessageList.propTypes = {
  directMessageMemberList: PropTypes.array.isRequired
};

export default DirectMessageList;
