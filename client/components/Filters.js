import React, { PropTypes } from 'react';

const Filters = (props) => (
  <ul id="filters">
    <div id="filters-header">Browse by Category</div>
    {
      props.categories.map(category => (
        <li id={`${category}`} className="category" onClick={props.filterBy}>{category}</li>
      ))
    }
  </ul>
);

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  filterBy: PropTypes.func.isRequired,
};

export default Filters;
