import React, { PropTypes, Component } from 'react';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: 'showAll',
      activeSubcategory: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  //
  handleClick(e) {
    this.setState({
      activeCategory: e.target.id,
    });
    this.props.filterBy(e.target.id);
  }

  render() {
    return (
      <div className="nav-side-menu">
        <div className="brand">Search By Category</div>
        <i
          className="fa fa-bars fa-2x toggle-btn"
          data-toggle="collapse"
          data-target="#menu-content"
        >
        </i>

        <div className="menu-list">
          <ul id="menu-content" className="menu-content collapse out">
            <li
              id={'showAll'}
              key="0"
              data-toggle="collapse"
              className="category collapsed"
              className={this.state.activeCategory
                === 'showAll' ? 'active' : ''}
              onClick={this.handleClick}
            >
              {'  Show All'}
            </li>
            {
              this.props.categories.map(category => {
              // only list parent categories
                if (category.CategoryId === null) {
                  return (
                    <div key={category.id}>
                      <li
                        id={category.categoryName}
                        data-toggle="collapse"
                        data-target={`#${category.categoryName}Subs`}
                        className="category collapsed"
                        className={this.state.activeCategory
                          === category.categoryName ? 'active' : ''}
                        onClick={this.handleClick}
                      >
                        {`  ${category.categoryName}`}
                        {category.subCategory.length ? <span className="arrow"></span> : null}
                      </li>
                      <ul
                        className="category sub-menu collapse"
                        id={`${category.categoryName}Subs`}
                      >
                        {
                          category.subCategory.map(subcategory => (
                            <li
                              id={subcategory.categoryName}
                              key={subcategory.id}
                              onClick={this.handleClick}
                              className="category"
                              className={this.state.activeCategory
                                  === subcategory.categoryName ? 'active' : ''}

                            >
                              {subcategory.categoryName}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  );
                }
                return null;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  filterBy: PropTypes.func.isRequired,
};

export default Filters;
