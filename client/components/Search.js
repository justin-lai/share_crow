import React, { PropTypes, Component } from 'react';

class Search extends Component {
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
      <div className="search">
        <input type="text" id="search-input" placeholder="What are you looking for?" />
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
