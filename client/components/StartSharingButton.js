import React, { PropTypes, Component } from 'react';

class StartSharingButton extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const query = document.getElementById('search-input').value;
    this.props.searchFor(query);
  }

  render() {
    return (
      <div className="start-sharing">
        <a
          href="#"
          className="btn btn-1"
        >
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          Start Sharing
        </a>
      </div>
    );
  }
}

StartSharingButton.propTypes = {
  searchFor: PropTypes.func.isRequired,
};

export default StartSharingButton;
