import React, { PropTypes, Component } from 'react';
import { store } from '../../index';
const debounce = require('debounce');

class LandingSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.debounceSubmit = debounce(this.handleSubmit, 200);
  }

  componentDidMount() {
    document.getElementById('search-input').onkeypress = e => {
      if (e.keyCode === 13) {
        this.handleSubmit();
      }
    };
  }

  handleSubmit() {
    const query = document.getElementById('search-input').value;
    store.dispatch({
      type: 'SEARCH_FILTER',
      search: query,
    });
    this.props.history.push('/marketplace');
  }

  render() {
    return (
      <div className="search">
        <input
          type="text"
          id="search-input"
          placeholder="What are you looking for?"
        />
        <button type="submit" onClick={this.handleSubmit} id="search-button">
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </div>
    );
  }
}

LandingSearch.propTypes = {
  history: PropTypes.object.isRequired,
  // searchFor: PropTypes.func.isRequired,
};

export default LandingSearch;
