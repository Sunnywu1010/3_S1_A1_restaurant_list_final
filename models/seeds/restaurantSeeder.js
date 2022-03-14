const bcrypt = require('bcryptjs')
const User = require('../user')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const UserList = require('./user.json')
const RestaurantList = require('./restaurant.json')


db.once('open', () => {
    UserList.forEach(item => {
        User.findOne({ email: item.email })
            .then(user => {
                if (!user) {
                    return bcrypt.genSalt(10)
                        .then(salt => bcrypt.hash(item.password, salt))
                        .then(hash => User.create({
                            email: item.email,
                            password: hash
                        }))
                        .catch(err => console.log(err))
                }
                return user
            })
            .then(user => {
                item.restaurants.forEach(restaurantId => {
                    const restaurant = RestaurantList.results.find(restaurant => restaurant.id === restaurantId)
                    Restaurant.create({
                        name: restaurant.name,
                        name_en: restaurant.name_en,
                        category: restaurant.category,
                        image: restaurant.image,
                        location: restaurant.location,
                        phone: restaurant.phone,
                        google_map: restaurant.google_map,
                        rating: restaurant.rating,
                        description: restaurant.description,
                        userId: user._id
                    })
                })
            })
    })
    db.close()
    console.log('done')
    process.exit()
  })