const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db/index')


require("dotenv").config();
const port = process.env.PORT || 3001;

// app.get('/' , (req, res) =>{
//   res.send('hello world!');
// });
//
// app.get('/about' , (req, res) =>{
//   res.send('hello world!');


// });
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"))

// middleware
// app.use((req, res,next) => {
//   // res.status(404).json({
//   //   status: "fail"
//   // })
//   console.log('somthing');
//   next();
// })

// Get all restaurant
app.get('/api/v1/restaurants', async (req, res) => {

  try {
    // const results = await db.query(`select * from restaurants`)
    const restaurantRatingsData = await db.query(
        `select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) 
as average_rating from reviews group by restaurant_id) 
reviews on restaurants.id = reviews.restaurant_id;`
    );
    // console.log("result", results)
    return res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurant: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err)
  }
})


//Get one restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  const resId = req.params.id;
  try {
    // const restaurant = await db.query(`select * from restaurants where id = $1`, [resId]);
    const restaurant = await db.query(
        `select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) 
              as average_rating from reviews group by restaurant_id)
              reviews on restaurants.id = reviews.restaurant_id where id = $1`,
        [resId]
    );
    // select * from restaurants where id = req.params.id

    const reviews = await db.query(`select * from reviews where restaurant_id = $1`, [resId]);


    return res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      },
    });
    // console.log(results.rows[0])
  } catch (err) {
    console.log(err)
  }
});


// for testing only
// app.use((req, res,next) => {
//   console.log('yeah our middleare')
//   next();
// })
//
// app.get('/api/v1/res' , (req, res) =>{
//   console.log("hfkdjn")
// });


// Create Restaurants
app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body)
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;
  try {
    const results = await db.query(`INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *`, [name, location, price_range]);
    // select * from restaurants where id = req.params.id
    return res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err)
  }
});

//update a restaurant

app.put('/api/v1/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;
  try {
    const results = await db.query(`UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *`, [name, location, price_range, id]);
    // select * from restaurants where id = req.params.id
    return res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err)
  }
});


//delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const results = await db.query(`DELETE from restaurants where id = $1`, [id]);
    // select * from restaurants where id = req.params.id
    return res.status(200).json({
      status: "success",
      message: "Deleted Restaurant"
    });
  } catch (err) {
    console.log(err)
  }
});

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  const id = req.params.id;
  const {name, review, rating} = req.body
  try {
    const newReview = await db.query(`INSERT INTO reviews (restaurant_id, name, review, rating) 
            values ($1, $2, $3, $4) returning *;`, [id, name, review, rating]);

    return res.status(200).json({
      status: "success",
      message: "Review add successful",
      data: {
        addReview: newReview.rows[0],
      }
    });
  } catch (e) {
    console.log(e)
  }
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
});