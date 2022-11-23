const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  logging: false,
  dialect: 'mysql',
  pool: {
    max: 5, min: 0, idle: 10000
  },

});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.log(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.AdminTableDb = require('./adminModel')(sequelize, DataTypes, Model);

db.Student = require('./studentModel')(sequelize, DataTypes, Model);

db.MovingTime = require('./MovingTime')(sequelize, DataTypes, Model)

db.Student.hasOne(db.MovingTime, { foreignKey: 'id' });
db.MovingTime.belongsTo(db.Student);
try {
  db.sequelize.sync({ force: false })
  console.log("synchronized")
} catch (error) {
  console.error(error)
}

module.exports = db
