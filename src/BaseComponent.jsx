import React from "react";

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }
}

BaseComponent.contextTypes = {
  theme: React.PropTypes.object,
  labelIdService: React.PropTypes.object
};

export default BaseComponent;
