import React, {useContext, useEffect} from 'react';
import {RestaurantsContext} from "../context/RestaurantsContext";
import {useParams} from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../Components/StarRating";
import Reviews from "../Components/Reviews";
import styles from './styles/ResDetails.module.scss'
import AddReviews from "../Components/AddReviews";

const RestaurantdetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(res?.data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])
  return (
      <div className={styles.main}>
        {/*<h1>Cheesecake Factory</h1>*/}
        <div className={styles.container}>
          {
              selectedRestaurant &&
              (
                  <>
                    <div className={styles.resName}>{selectedRestaurant.restaurant.name}</div>
                    <div className={styles.startRate}>
                      <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                         <span>
                        {
                          selectedRestaurant.restaurant.count ?
                              `(${selectedRestaurant.restaurant.count})`
                              : "(0)"
                        }
                      </span>
                    </div>
                    <div className={styles.showReview}>
                      <Reviews reviews={selectedRestaurant.reviews}/>
                    </div>
                    <div className={styles.addReview}>
                      <AddReviews/>
                    </div>
                  </>
              )}

        </div>
      </div>
  );
};

export default RestaurantdetailPage;