import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../../actions/userActions';
import { getListing, postListing, putListing, deleteListing } from '../../actions/listingActions';
import { getMessage, postMessage, putMessage, deleteMessage } from '../../actions/messageActions';
import { getSession, isLoggedIn, refreshComponent } from '../../actions/sessionActions';
import { signup, login, signout } from '../../helpers/authHelpers';
import NavBar from './../Navigation/NavBar';
import ProfileCard from './../Profile/ProfileCard';
import Footer from './../Shared/Footer';
import LoadingBar from './../Shared/LoadingBar';
import IncomingRequestsGridView from '../IncomingRequestsGridView';
import OutgoingRequestsGridView from '../OutgoingRequestsGridView';
import AvailableItemsGridView from '../AvailableItemsGridView';
import RentedOutItemsGridView from '../RentedOutItemsGridView';
import CurrentlyRentingGridView from '../CurrentlyRentingGridView';
import PaymentsDueGridView from '../PaymentsDueGridView';
import PaymentsReceivedGridView from '../PaymentsReceivedGridView';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';
import ProductList from './../Marketplace/ProductList';

class Profile extends Component {
  constructor(props) {
    super(props);
    // console.log('USER ID: ~~~~~~~~~~~', userID);
    this.products = [];
    this.methods = props.methods;
    this.profile = {};
    if (props.isAuth.username === props.params.username) {
      this.profileType = 'private';
    } else {
      this.profileType = 'public';
    }
  }

  componentDidMount() {
    // if logged in get listings associated with you and your user information
    this.methods.isLoggedIn();
    this.methods.getUser(`username=${this.props.params.username}`, user => {
      this.methods.getListing(`owner_id=${user.id}`);
    });
  }

  componentWillReceiveProps(nextProps) {
    // re-logs you to dashboard if not logged in
    // if (nextProps.isAuth.status) {
    //   this.profile = nextProps.isAuth.userInfo;
    // } else {
    //   this.props.history.push('/');
    // }

    // checks if a database change was made and refreshes component
    if (nextProps.componentNeedsRefresh) {
      this.methods.refreshComponent(false);
      this.componentDidMount();
    }

    this.profile = nextProps.user;
    this.products = nextProps.listing;
    if (nextProps.user.Image) {
      this.profilePhoto = nextProps.user.Image.image;
    }
  }

  isFetchingData() {
    return Object.keys(this.props.isFetching).some(key => this.props.isFetching[key]);
  }

  render() {
    if (this.profileType === 'private') {
      return (
        <div id="profile">
          <NavBar
            isLoggedIn={this.props.isAuth.status || false}
            username={this.props.isAuth.username || ''}
            login={login}
            signup={signup}
            signout={signout}
          />
          {this.isFetchingData() ?
            <LoadingBar /> :
            <div>
              <div className="row">
                <div className="col-xs-6 col-md-4">
                  <ProfileCard profile={this.profile} profilePhoto={this.profilePhoto} />
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
                        />
                      }
                    />
                  </section>
                </div>
              </div>
              <IncomingRequestsGridView />
              <OutgoingRequestsGridView />
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
            </div>
          }
          <Footer />
        </div>
      );
    }
    return (
      <div id="profile">
        <NavBar
          isLoggedIn={this.props.isAuth.status || false}
          username={this.props.isAuth.username || ''}
          login={login}
          signup={signup}
          signout={signout}
        />
        {this.isFetchingData() ?
          <LoadingBar /> :
          <div>
            <div className="row">
              <div className="col-xs-6 col-md-4">
                <ProfileCard profile={this.profile} profilePhoto={this.profilePhoto} />
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
                      />
                    }
                  />
                </section>
              </div>
            </div>
            <div id="profile-products">
              <ProductList products={this.products} />
            </div>
          </div>
        }
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
  isFetching: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, message, session, isAuth, isFetching, componentNeedsRefresh } = state;

  return {
    user,
    listing,
    message,
    session,
    isAuth,
    isFetching,
    componentNeedsRefresh,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (query, cb) => {
        dispatch(getUser(query, cb));
      },
      postUser: (data, cb) => {
        dispatch(postUser(data, cb));
      },
      putUser: (data, cb) => {
        dispatch(putUser(data, cb));
      },
      deleteUser: (data, cb) => {
        dispatch(deleteUser(data, cb));
      },
      getListing: (id, cb) => {
        dispatch(getListing(id, cb));
      },
      postListing: (data, cb) => {
        dispatch(postListing(data, cb));
      },
      putListing: (data, cb) => {
        dispatch(putListing(data, cb));
      },
      deleteListing: (data, cb) => {
        dispatch(deleteListing(data, cb));
      },
      getMessage: (id, cb) => {
        dispatch(getMessage(id, cb));
      },
      postMessage: (data, cb) => {
        dispatch(postMessage(data, cb));
      },
      putMessage: (data, cb) => {
        dispatch(putMessage(data, cb));
      },
      deleteMessage: (data, cb) => {
        dispatch(deleteMessage(data, cb));
      },
      getSession: (data, cb) => {
        dispatch(getSession(data, cb));
      },
      isLoggedIn: () => {
        dispatch(isLoggedIn());
      },
      refreshComponent: (bool) => {
        dispatch(refreshComponent(bool));
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
