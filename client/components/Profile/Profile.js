import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../../actions/userActions';
import { getListing, postListing, putListing, deleteListing } from '../../actions/listingActions';
import { getMessage, postMessage, putMessage, deleteMessage } from '../../actions/messageActions';
import { getSession, isLoggedIn } from '../../actions/sessionActions';
import NavBar from './../Navigation/NavBar';
import ProfileCard from './../Profile/ProfileCard';
import Footer from './../Shared/Footer';
import LoadingBar from './../Shared/LoadingBar';
import AvailableItemsGridView from '../AvailableItemsGridView';
import RentedOutItemsGridView from '../RentedOutItemsGridView';
import CurrentlyRentingGridView from '../CurrentlyRentingGridView';
import PaymentsDueGridView from '../PaymentsDueGridView';
import PaymentsReceivedGridView from '../PaymentsReceivedGridView';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

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
  }

  componentWillReceiveProps(nextProps) {
    // re-logs you to dashboard if not logged in
    if (nextProps.isAuth.status) {
      this.profile = nextProps.isAuth.userInfo;
    } else {
      this.props.history.push('/');
    }

    this.products = nextProps.listing;
    if (nextProps.user.Image) {
      this.profile.photo = nextProps.user.Image.image;
    }
  }

  isFetchingData() {
    const isFetching = Object.keys(this.props.isFetching).some(key => this.props.isFetching[key]);
    if (!isFetching) console.log('profile props: ', this.props);
    return isFetching;
  }

  render() {
    return this.isFetchingData() ?
      <div id="profile">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
        />
        <LoadingBar />;
      </div>
    :
      <div id="profile">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
        />
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <ProfileCard profile={this.profile} />
          </div>
          <div className="col-xs-6 col-md-3 gMaps" style={{ marginLeft: '5%' }}>
            <section style={{ height: '300px', width: '250%' }}>
              <GoogleMapLoader
                query={{ libraries: 'geometry,drawing,places,visualization' }}
                containerElement={
                  <div
                    style={{
                      height: '100%',
                    }}
                  />
                }
                googleMapElement={
                  <GoogleMap
                    ref={(map) => console.log(map)}
                    defaultZoom={12}
                    defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                  >
                    })}
                  </GoogleMap>
                }
              />
            </section>
          </div>
        </div>
        <AvailableItemsGridView
          id={this.props.isAuth.userInfo.id}
          products={this.products}
        />
        <RentedOutItemsGridView
          id={this.props.isAuth.userInfo.id}
          products={this.products}
        />
        <CurrentlyRentingGridView
          id={this.props.isAuth.userInfo.id}
        />
        <PaymentsDueGridView
          id={this.props.isAuth.userInfo.id}
        />
        <PaymentsReceivedGridView
          id={this.props.isAuth.userInfo.id}
        />
        <Footer />
      </div>;
  }
}


Profile.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
  isAuth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isFetching: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, message, session, isAuth, isFetching } = state;

  return {
    user,
    listing,
    message,
    session,
    isAuth,
    isFetching,
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
