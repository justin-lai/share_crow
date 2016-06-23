const Sequelize = require('sequelize');
const config = require('../config.js');
const sequelize = new Sequelize('sharecrow', config.dbUsername, config.dbPassword, {
  host: config.host,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    //eslint-disable-next-line
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    //eslint-disable-next-line
    console.log('Unable to connect to the database:', err);
  });

const User = sequelize.define('User', {
  password: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  about: {
    type: Sequelize.STRING,
  },
  userImage: {
    type: Sequelize.INTEGER,
  },
  verification: {
    type: Sequelize.INTEGER,
  },
  verified: {
    type: Sequelize.BOOLEAN,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

const Reviews = sequelize.define('Reviews', {
  text: {
    type: Sequelize.STRING,
  },
  lenderId: {
    type: Sequelize.INTEGER,
  },
  reviewerId: {
    type: Sequelize.INTEGER,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
});

const Payments = sequelize.define('Payments', {
  $Amount: {
    type: Sequelize.INTEGER,
  },
  startDate: {
    type: Sequelize.DATE,
  },
  paymentDate: {
    type: Sequelize.DATE,
  },
  itemId: {
    type: Sequelize.INTEGER,
  },
  payerId: {
    type: Sequelize.INTEGER,
  },
  paidId: {
    type: Sequelize.INTEGER,
  },
});

const Messages = sequelize.define('Messages', {
  text: {
    type: Sequelize.STRING,
  },
  senderId: {
    type: Sequelize.INTEGER,
  },
  recipientId: {
    type: Sequelize.INTEGER,
  },
  subject: {
    type: Sequelize.STRING,
  },
});

const Listings = sequelize.define('Listings', {
  name: {
    type: Sequelize.STRING,
  },
  ownerId: {
    type: Sequelize.INTEGER,
  },
  renterId: {
    type: Sequelize.INTEGER,
  },
  maxFee: {
    type: Sequelize.FLOAT,
  },
  rentalFee: {
    type: Sequelize.FLOAT,
  },
  rented: {
    type: Sequelize.BOOLEAN,
  },
  rentedOn: {
    type: Sequelize.DATE,
  },
  returnedOn: {
    type: Sequelize.DATE,
  },
  itemReturned: {
    type: Sequelize.BOOLEAN,
  },
  itemImage: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.STRING,
  },
});

const Images = sequelize.define('Images', {
  userImage: {
    type: Sequelize.STRING,
  },
  listingImage: {
    type: Sequelize.STRING,
  },
});

const Category = sequelize.define('Category', {
  categoryName: Sequelize.STRING,
});

const categoryListings = sequelize.define('categoryListings');

Category.hasMany(Category, { as: 'subCategory' });

Listings.belongsToMany(Category, { through: categoryListings });
Category.belongsToMany(Listings, { through: categoryListings });

Listings.belongsTo(User, {
  as: 'owner',
  foreignKey: 'ownerId',
});
Listings.belongsTo(User, {
  as: 'renter',
  foreignKey: 'renterId',
});
Images.belongsTo(User);
Images.belongsTo(Listings);
Messages.belongsTo(User, {
  as: 'sender',
  foreignKey: 'senderId',
});
Messages.belongsTo(User, {
  as: 'recipient',
  foreignKey: 'recipientId',
});
Reviews.belongsTo(User, {
  as: 'lender',
  foreignKey: 'lenderId',
});
Reviews.belongsTo(User, {
  as: 'reviewer',
  foreignKey: 'reviewerId',
});
Payments.belongsTo(User, {
  as: 'paid',
  foreignKey: 'paidId',
});
Payments.belongsTo(User, {
  as: 'payer',
  foreignKey: 'payerId',
});
User.hasOne(Images);

module.exports = { User, Messages, Reviews, Listings, Payments, sequelize };
