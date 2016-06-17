'use strict';

const fetch = require('node-fetch');

module.exports = {

  // SIGN UP FUNCTIONS
  // expects username, password, email, phonenumber, address, aboutMe
  signup: (req, res) => {
    console.log('signup route: ', req.body);
  },

  // LOGIN FUNCTIONS
  // expects username, password
  login: (req, res) => {
    console.log('login route: ', req.params);
  },

  // PROFILE FUNCTIONS
  // expects username or id
  getProfile: (req, res) => {
    // query database for a specific profile
  },

  // expects call from signup route
  createProfile: (req, res) => {
    // create new profile entry in database
  },

  // expects username and id with an arbitrary number of parameters to change
  updateProfile: (req, res) => {
    // change database entry depending on parameters
    console.log('updateProfile route: ', req.body);
  },

  // PRIVATE MESSAGING FUNCTIONS
  // expects username and id
  getMessages: (req, res) => {
    // pulls all messages associated with username and id
    console.log('messages route: ', req.params);
  },

  // expects sender_id, recipient_id, text
  postMessages: (req, res) => {
    // adds a new message entry in database
  },

  // RENTAL LISTING FUNCTIONS
  // expects none or 1 filter parameter
  getListings: (req, res) => {
    // if no parameters, return all listings
    // if parameters provided, only return a filtered list 
    console.log('items route: ', req.body);
  },

  // expects name, owner_id, max_fee, rental_fee, rental_period
  createListing: (req, res) => {
    // adds a new listing entry in database
  },

  // expects listing id and an arbitrary number of parameters
  changeListing: (req, res) => {
    // modifies entry with 'listing id' in database
  },

  // expects listing id
  returnListing: (req, res) => {
    // call change listing to change renting period to 'complete'
  },

  // USER REVIEW FUNCTIONS
  // expects username and id
  getUserReviews: (req, res) => {
    // returns all entries associated with username and id from database
  },

  // expects reviewer id, reviewee id, rating, message
  createUserReview: (req, res) => {
    // add a new review entry in database
  },

  // expects review id, user id
  deleteUserReview: (req, res) => {
    // id associated with the review must match the user id
    // deletes a user review from database by id
  },


};