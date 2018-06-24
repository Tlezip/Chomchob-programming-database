const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  })
  
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('User', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
  },{
    classMethods: {
      associate: function(models) {
        User.hasMany(UserCard, { foreignKey: 'user_id' })
        User.hasMany(Order, { foreignKey: 'user_id' })
      }
    }
  })
  
  const UserCard = sequelize.define('UserCard', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: Sequelize.STRING,
    card_number: Sequelize.STRING,
    cvv: Sequelize.INTEGER
  },{
    classMethods: {
      associate: function(models) {
        UserCard.belongsTo(User, { foreignKey: 'user_id' })
      }
    }
  })

const Item = sequelize.define('Item', {
    id: { 
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    describe: Sequelize.STRING,
    price: Sequelize.INTEGER,
    start_sell: Sequelize.DATE,
    end_sell: Sequelize.DATE
},{
    classMethods: {
        associate: function(models) {
            Item.hasMany(Promotion, { foreignKey: 'item_id' })
            Item.hasMany(OrderDetail, { foreignKey: 'item_id' })
            Item.hasMany(Code, { foreignKey: 'item_id' })
        }
    }
})

const Promotion = sequelize.define('Promotion', {
    id: { 
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    item_id: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    price: Sequelize.INTEGER
},{
    classMethods: {
        associate: function(models) {
            Promotion.belongsTo(Item, { foreignKey: 'item_id' })
        }
    }
})

const Order = sequelize.define('Order', {
    id: { 
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    order_date: Sequelize.DATE
},{
    classMethods: {
        associate: function(models) {
            Order.belongsTo(User, { foreignKey: 'user_id' })
            Order.hasMany(OrderDetail, { foreignKey: 'order_id' })
            Order.hasMany(Code, { foreignKey: 'order_id' })
        }
    }
})

const OrderDetail = sequelize.define('OrderDetail', {
    order_id: {
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    item_id: {
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
    price: Sequelize.INTEGER
},{
    classMethods: {
        associate: function(models) {
            OrderDetail.belongsTo(Order, { foreignKey: 'order_id' })
            OrderDetail.belongsTo(Item, { foreignKey: 'item_id' })
        }
    }
})

const Code = sequelize.define('Code', {
    order_id: {
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    item_id: {
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    code: {
        type:Sequelize.STRING,
        primaryKey: true
    },
    is_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
},{
    classMethods: {
        associate: function(models) {
            OrderDetail.belongsTo(Order, { foreignKey: 'order_id' })
            OrderDetail.belongsTo(Item, { foreignKey: 'item_id' })
        }
    }
})

sequelize.sync({force: true}).then(() => {
    process.exit()
})