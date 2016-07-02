/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
const Sequelize = require('sequelize');

module.exports = {
	// //////////////////////////// RENTAL LISTING FUNCTIONS ////////////////////////////
  // expects none or 1 filter parameter
  getListings: (req, res) => {
    console.log('GET //// getListings route');
    req.session.cookie.path = '/main/listing';
    // if no parameters, return all listings
    const searchFilters = {
      name: req.query.name || null,
      ownerId: req.query.owner_id || null,
      maxFee: req.query.max_fee || null,
      rentalFee: req.query.rental_fee || null,
      rented: req.query.rented || null,
      renterId: req.query.renterId || null,
    };

    const categoryFilter = req.query.categoryId ?
      Sequelize.or({ id: req.query.categoryId }, { CategoryId: req.query.categoryId })
        : {};

    if (!req.query.name) {
      delete searchFilters.name;
    }
    if (!req.query.owner_id) {
      delete searchFilters.ownerId;
    }
    if (!req.query.max_fee) {
      delete searchFilters.maxFee;
    }
    if (!req.query.rental_fee) {
      delete searchFilters.rentalFee;
    }
    if (!req.query.rented) {
      delete searchFilters.rented;
    }
    if (!req.query.renterId) {
      delete searchFilters.renterId;
    }
    // if parameters provided, only return a filtered list
    db.Listings.findAll({
      where: searchFilters,
      include: [{
        model: db.User,
        as: 'owner',
      },
      {
        model: db.User,
        as: 'renter',
      },
      {
        model: db.Category,
        where: categoryFilter,
      },
      {
        model: db.Images,
        as: 'listingImage',
      }],
    }).then(items => {
      const results = [];
      items.forEach(entry => {
        results.push(entry.dataValues);
      });
      res.status(200).send(results);
    });
  },
  // expects item, owner_id, max_fee, rental_fee, image
  createListing: (req, res) => {
    // adds a new listing entry in database
    console.log('POST //// createListing route');
    req.session.cookie.path = '/main/listing';
    // item name, owner_id, max_fee, and rental_fee required. image is optional
    if (req.body.item && req.body.owner_id && req.body.max_fee && req.body.rental_fee) {
      db.Listings.create({
        name: req.body.item,
        ownerId: req.body.owner_id,
        maxFee: req.body.max_fee,
        rentalFee: req.body.rental_fee,
        rented: false,
        itemReturned: false,
      })
      .then(listing => {
        db.Category.findOne({ where: { id: req.body.category } })
          .then(category => {
            listing.addCategory(category);
          });
        return listing;
      })
      .then(queryData => res.status(201).send(queryData));
    } else {
      res.status(400).send({ message: 'a required parameter was not provided' });
    }
  },
  // expects listingId and an arbitrary number of parameters
  changeListing: (req, res) => {
    // modifies entry with 'listing id' in database
    console.log('PUT //// changeListing Route');
    req.session.cookie.path = '/main/listing';
    if (req.body.removeListing) {
      db.Listings.destroy({
        where: {
          id: req.body.listingId,
        },
      })
        .then(() => res.status(200).send({ message: 'deletion sucessful' }));
    } else {
      // change database entry depending on parameters
      if (!req.body.listingId) {
        res.status(400).send({ message: 'listingId was not provided' });
      } else {
        let updateListing = {
          renterId: req.body.renterId || null,
          maxFee: req.body.maxFee || null,
          rentalFee: req.body.rentalFee || null,
          rentedOn: req.body.rentedOn || null,
          itemImage: req.body.itemImage || null,
          returnedOn: req.body.returnedOn || null,
          itemReturned: req.body.itemReturned || null,
          rented: req.body.rented || null,
        };

        if (!req.body.renterId) {
          delete updateListing.renterId;
        }
        if (!req.body.maxFee) {
          delete updateListing.maxFee;
        }
        if (!req.body.rentalFee) {
          delete updateListing.rentalFee;
        }
        if (!req.body.rentedOn) {
          delete updateListing.rentedOn;
        }
        if (!req.body.returnedOn) {
          delete updateListing.returnedOn;
        }
        if (!req.body.rented) {
          delete updateListing.rented;
        }
        if (!req.body.itemReturned) {
          delete updateListing.itemReturned;
        }
        if (!req.body.itemImage) {
          delete updateListing.itemImage;
        }
        if (req.body.reset) {
          updateListing = {
            renterId: null,
            rentedOn: null,
            returnedOn: null,
            itemReturned: true,
            rented: false,
          };
        }
        db.Listings.find(
          {
            where: {
              id: req.body.listingId,
            },
          })
          .then(queryData => queryData.updateAttributes(updateListing))
          .then(() => {
            db.Listings.find({
              where: {
                id: req.body.listingId,
              },
            }).then(newEntry => res.status(200).send(newEntry));
          });
      }
    }
  },
  // expects listing id
  returnedListing: (req, res) => {
    // call change listing to change renting period to 'complete'
    console.log('DELETE //// returnedListing route');
    req.session.cookie.path = '/main/listing';
    if (!req.body.listingId) {
      res.status(400).send({ message: 'listingId was not provided' });
    } else {
      db.Listings.find(
        {
          where: {
            id: req.body.listingId,
          },
        })
        .then(queryData => {
          queryData.updateAttributes({
            itemReturned: true,
            returnedOn: new Date().toISOString(),
          });
          console.log(queryData);
        })
        .then(() => {
          db.Listings.find({
            where: {
              id: req.body.listingId,
            },
          }).then(newEntry => res.status(200).send(newEntry));
        });
    }
  },


  // //////////////////////////// UNIQUE LISTING ACQUIRE FUNCTIONS ////////////////////////////
  getUniqueListing: (req, res) => {
    console.log('GET //// getUniqueListing route');
    req.session.cookie.path = '/main/listing/unique';
    if (!req.query.id) {
      res.status(400).send({ message: 'id not sent with request' });
    } else {
      db.Listings.find({
        where: {
          id: req.query.id,
        },
      }).then((listing) => {
        if (listing) {
          res.status(200).send(listing.dataValues);
        } else {
          res.status(400).send({ message: `listing is empty at id: ${req.query.id}` });
        }
      });
    }
  },

};
