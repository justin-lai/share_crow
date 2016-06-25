import React, { PropTypes } from 'react';

const Filters = (props) => {
  const handleClick = (e) => {
    props.filterBy(e.target.id);
  };

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
            props.categories.map(category => {
            // only list parent categories
              if (category.CategoryId === null) {
                return (
                  <div>
                    <li
                      id={category.categoryName}
                      data-toggle="collapse"
                      data-target={`#${category.categoryName}Subs`}
                      className="collapsed"
                      onClick={handleClick}
                    >
                      {`  ${category.categoryName}`}
                      <span className="arrow"></span>
                    </li>
                    <ul className="sub-menu collapse" id={`${category.categoryName}Subs`}>
                      {
                        category.subCategory.map(subcategory => (
                          <li
                            id={subcategory.categoryName}
                            onClick={handleClick}
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
};

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  filterBy: PropTypes.func.isRequired,
};

export default Filters;
