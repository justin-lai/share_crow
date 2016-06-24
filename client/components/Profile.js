import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getMessage, postMessage, putMessage, deleteMessage } from '../actions/messageActions.js';
import { getSession, isLoggedIn } from '../actions/sessionActions.js';
// import NavBar from './NavBar.js';
// import Footer from './Footer.js';
// import ProfileCard from './ProfileCard.js';
// import ProductList from './ProductList.js';
// import MessageInbox from './MessageInbox.js';
import LoadingBar from './LoadingBar.js';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.products = [];
    this.messages = [];
    this.profile = props.session;
  }

  componentDidMount() {
    this.methods = this.props.methods;
    this.methods.isLoggedIn();
    // this.methods.getListing(`name=${this.props.session.username}`);
    // get user's info
    // this.methods.getUser(`id=${this.props.session.id}`);
    // get user's messages
    this.methods.getMessage('recipient_id=1');
    // get user's items
    // this.methods.getListing('owner_id=4');
  }

  componentWillReceiveProps(nextProps) {
    console.log('profile next', nextProps);
    if (!nextProps.isAuth) {
      console.log('GO BACK');
      nextProps.history.push('/');
    }

    this.products = nextProps.listing;
    this.messages = nextProps.message;
    // re-render with new props
  }

  render() {
    return (
      <LoadingBar />
    );
    // return (
    //   <div id="profile">
    //     <NavBar isLoggedIn={this.props.isAuth} />
    //     <div className="row">
    //       <div className="col-xs-6 col-md-4">
    //         <ProfileCard profile={this.profile} />
    //         <MessageInbox messages={this.messages} />
    //       </div>
    //       <div>
    //         <h3>My Items</h3>
    //         <ProductList products={this.products} />
    //       </div>
    //     </div>
    //     <Footer />
    //   </div>
    // );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, message, session, isAuth } = state;

  return {
    user,
    listing,
    message,
    session,
    isAuth,
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
      getMessage: (id) => {
        dispatch(getMessage(id));
      },
      postMessage: (data) => {
        dispatch(postMessage(data));
      },
      putMessage: (data) => {
        dispatch(putMessage(data));
      },
      deleteMessage: (data) => {
        dispatch(deleteMessage(data));
      },
      getSession: (data) => {
        dispatch(getSession(data));
      },
      isLoggedIn: () => {
        dispatch(isLoggedIn());
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
