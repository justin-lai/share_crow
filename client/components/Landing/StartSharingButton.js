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
        <section className="buttons">
          <div className="sharing-button-container">
            <a className="btn btn-1">
            Start Sharing</a>
          </div>
        </section>
      </div>
    );
  }
}

StartSharingButton.propTypes = {
  searchFor: PropTypes.func.isRequired,
};

export default StartSharingButton;
