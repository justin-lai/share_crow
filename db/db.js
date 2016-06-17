const Sequelize = require('sequelize');
const sequelize = new Sequelize('sharecrow', 'root', 'null', {
  dialect: 'postgres',
  port: 5432,
});
sequelize
  .authenticate()
  .then((response) => {
    console.log('Connection has been established successfully', response);
  }, (response) => {
    console.log('Unable to connect to the database:', response);
  });

module.exports = sequelize;
