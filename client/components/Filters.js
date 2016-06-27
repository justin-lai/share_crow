import React, { PropTypes, Component } from 'react';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: '',
      activeSubcategory: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  //
  handleClick(e) {
    this.setState({
      activeCategory: e.target.id,
    });
    // document.getElementById(e.target.id).className += ' active';
    // e.target.className += ' active';
    // console.log(e.target);
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

            {
              this.props.categories.map(category => {
              // only list parent categories
                if (category.CategoryId === null) {
                  return (
                    <div>
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
                        <span className="arrow"></span>
                      </li>
                      <ul
                        className="category sub-menu collapse"
                        id={`${category.categoryName}Subs`}
                      >
                        {
                          category.subCategory.map(subcategory => (
                            <li
                              id={subcategory.categoryName}
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
//   <ul id="filters">
//     <div id="filters-header">Browse by Category</div>
//     {
//       props.categories
//       .filter(category => category.CategoryId === null)
//       .map(category => (
//         <li
//           id={`${category.categoryName}`}
//           className="category"
//           onClick={props.filterBy}
//         >
//           {category.categoryName}
//         </li>
//       ))
//     }
//   </ul>
                    // <li className="active"><a href="#">CSS3 Animation</a></li>
}

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  filterBy: PropTypes.func.isRequired,
};

export default Filters;
