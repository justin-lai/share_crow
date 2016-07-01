import React, { PropTypes, Component } from 'react';
const debounce = require('debounce');

class Search extends Component {
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
    this.props.searchFor(query);
  }

  render() {
    return (
      <div className="search">
        <input
          type="text"
          id="search-input"
          placeholder="What are you looking for?"
          onChange={this.debounceSubmit}
        />
        <button type="submit" onClick={this.handleSubmit} id="search-button">
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </div>
    );
  }
}
// const Search = ({ searchFor }) => (
//   <div id="marketplace-search">
//     <input type="text" className="searchTerm" placeholder="What are you looking for?" />
//     <button type="submit" onClick={searchFor} className="searchButton">
//       <i className="glyphicon glyphicon-search"></i>
//     </button>
//   </div>
// );

Search.propTypes = {
  searchFor: PropTypes.func.isRequired,
};

export default Search;
