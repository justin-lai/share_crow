import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getCategory } from '../actions/categoryActions.js';
import NavBar from './NavBar.js';
import Search from './Search.js';
import Filters from './Filters.js';
import ProductList from './ProductList.js';
import Footer from './Footer.js';

class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.products = [  // change this later with listings from database
      {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
      },
      {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
      }, {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
      }, {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
      }, {
        name: 'Tent',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
        ownerId: 1,
        rentalFee: 25,
        User: { username: 'Cathy' },
      },
      {
        name: 'Grill',
        price: '$20/day',
        owner: 'caathylee',
        image: 'http://cdn.charbroil.com/media/catalog/product/cache/1/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/1/2/12301672_charcoal-grill-800_001.png',
        ownerId: 2,
        rentalFee: 30,
        User: { username: 'Justin' },
      },
      {
        name: 'Fishing Rod',
        price: '$10/day',
        owner: 'caathylee',
        image: 'http://www.clipartkid.com/images/52/use-these-free-images-for-your-websites-art-projects-reports-and-ECSktZ-clipart.jpg',
        ownerId: 3,
        rentalFee: 15,
        User: { username: 'Arthur' },
      },
    ];
    this.categories = [];

    this.filterBy = this.filterBy.bind(this);
    this.searchFor = this.searchFor.bind(this);
  }

  componentDidMount() {
    // this.props.methods.getListing();
    this.props.methods.getCategory();
  }

  componentWillReceiveProps(nextProps) {
    this.categories = nextProps.category;
    // this.categories = {};
    // const context = this;
    // nextProps.category
    //   .filter(category => category.CategoryId === null)
    //   .forEach(category => {
    //     const name = category.categoryName;
    //     const id = category.id;
    //     context.categories[id] = { name, children: [] };
    //   });
    // nextProps.category
    //   .filter(category => category.CategoryId !== null)
    //   .forEach(category => {
    //     const name = category.categoryName;
    //     const id = category.id;
    //     const parentId = category.CategoryId;
    //     context.categories[parentId].children.push({ name, id });
    //   });

    // console.log(this.categories);
  }

  filterBy(e) {
    console.log(e.target.id);
    // this.props.methods.getListing() by category
  }

  searchFor(query) {
    console.log(query);
    // this.props.methods.getListing() by query
  }

  render() {
    return (
      <div id="marketplace">
        <NavBar isLoggedIn={Boolean(true)} />
        <Filters categories={this.categories} filterBy={this.filterBy} />
        <Search searchFor={this.searchFor} />
        <h3>Items</h3>
        <ProductList products={this.products} />
        <Footer />
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { listing, category } = state;

  return {
    listing,
    category,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getListing: (id) => {
        dispatch(getListing(id));
      },
      postListing: (data) => {
        dispatch(postListing(data));
      },
      putListing: (data) => {
        dispatch(putListing(data));
      },
      deleteListing: (data) => {
        dispatch(deleteListing(data));
      },
      getCategory: () => {
        dispatch(getCategory());
      },
    },
  };
};

Marketplace.propTypes = {
  methods: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);

