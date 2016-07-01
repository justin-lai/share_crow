import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getMessage, postMessage, putMessage, deleteMessage } from '../actions/messageActions.js';
import { getSession, isLoggedIn } from '../actions/sessionActions.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import ProfileCard from './ProfileCard.js';
import LoadingBar from './LoadingBar.js';
import ProfileGridView from './ProfileGridView';

require('../assets/styles/app.scss');


class Profile extends Component {
  constructor(props) {
    super(props);
    this.products = [];
    this.methods = props.methods;
    this.methods.isLoggedIn();
    this.profile = props.isAuth.userInfo;
    if (this.props.isAuth.status) {
      // console.log('CHECK: ', `owner_id=${this.props.isAuth.userInfo.id}`);
      this.methods.getListing(`owner_id=${this.props.isAuth.userInfo.id}`);
      this.methods.getUser(`id=${this.props.isAuth.userInfo.id}`);
    }
  }

  componentDidMount() {
    console.log('profile mount: ', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('profile nextProps', nextProps);
    if (nextProps.isAuth.status) {
      this.profile = nextProps.isAuth.userInfo;
    } else {
      this.props.history.push('/');
    }
    console.log('profile nextProps', nextProps);
    this.products = nextProps.listing;
    if (nextProps.user.Image) {
      this.profile.photo = nextProps.user.Image.listingImage;
    }
  }

  render() {
    console.log(this.products);
    return (
      !this.props.isAuth.status ?
        <LoadingBar /> :
        <div id="profile">
          <NavBar
            isLoggedIn={this.props.isAuth.status}
            username={this.props.isAuth.username}
          />
          <div className="row">
            <div className="col-xs-6 col-md-4">
              <span>
                <ProfileCard profile={this.profile} />
                <ProfileGridView products={this.products} />
              </span>
            </div>
          </div>
          <Footer />
        </div>
    );
  }
}


Profile.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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

// Profile.willTransitionTo = () => {
//   console.log('STUFF HAPPENED');
//   router.getCurrentPath();
// };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
