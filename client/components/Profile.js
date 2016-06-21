import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getSession } from '../actions/sessionActions.js';
// import Landing from './Landing.js';
// import Navbar from './NavBar.js';
import NavbarLoggedIn from './NavbarLoggedIn.js';
import Footer from './Footer.js';
import ProfileCard from './ProfileCard.js';
import ProductList from './ProductList.js';
import MessageInbox from './MessageInbox.js';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.products = [
      {
        name: 'tent',
        price: '$Tree Fitty',
        owner: 'C AA Thee',
        image: 'http://ecx.images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg',
      },
      {
        name: 'Gimme yo waffle fries',
        price: 'Fo Free',
        owner: 'Scrum Vader',
        image: 'https://cdn.meme.am/instances/500x/65033790.jpg',
      },
    ];

    this.messages = [
      {
        sender: 'Arthur',
        recipient: 'Ben',
        subject: 'This be yo prof, pal',
        text: "I'm not yo pal, friend",
      },
      {
        sender: 'Arthur',
        recipient: 'Ben',
        subject: "I'm not yo friend, guy",
        text: "But it's coo",
      },
    ];
  }

  componentDidMount() {
    console.log(this.props);
    this.methods = this.props.methods;
    // get user's info
    // get user's messages
    // get user's items
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // re-render with new props
  }

  render() {
    return (
      <div>
        <NavbarLoggedIn />
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <ProfileCard />
            <MessageInbox messages={this.messages} />
          </div>
          <div className="col-xs-12 col-md-2">
            <ProductList products={this.products} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, session } = state;

  return {
    user,
    listing,
    session,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
      postUser: (data) => {
        dispatch(postUser(data));
      },
      putUser: (data) => {
        dispatch(putUser(data));
      },
      deleteUser: (data) => {
        dispatch(deleteUser(data));
      },
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
      getSession: () => {
        dispatch(getSession());
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
