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
  date: {
    type: Sequelize.DATE,
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
  date: {
    type: Sequelize.DATE,
  },
});

const Items = sequelize.define('Items', {
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
    type: Sequelize.INTEGER,
  },
  rentalFee: {
    type: Sequelize.INTEGER,
  },
  rentalPeriod: {
    type: Sequelize.INTEGER,
  },
});

const Images = sequelize.define('Images', {
  url: {
    type: Sequelize.STRING,
  },
});


User.hasMany(Items);
User.hasMany(Messages);
User.hasMany(Reviews);
User.hasMany(Payments);
Items.hasMany(Images);
Items.belongsTo(User);
Messages.belongsTo(User);
Reviews.belongsTo(User);
Payments.belongsTo(User);

module.exports = { User, Messages, Reviews, Items, Payments, sequelize };
