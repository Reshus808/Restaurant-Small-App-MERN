import React from 'react';
import styles from './styles/Reviews.module.scss'
import image from '../logo192.png'
import StarRating from "./StarRating";
import axios from "../apis/RestaurantFinder";


const Reviews = ({reviews}) => {
  return (
      <>
        <div className={styles.main}>
          {
            reviews?.map((review) => (
                    <div className={styles.card} key={review.id}>
                      <div className={styles.container}>
                      <div className={styles.cont_1}>
                        <h4><b>{review.name}</b></h4>
                      </div>
                      <div className={styles.cont_2}>
                        <span><StarRating rating={review.rating}/></span>
                      </div>
                      </div>
                      <div className={styles.review}>
                        <p>{review.review}</p>
                      </div>
                    </div>
                )
            )
          }
        </div>
      </>

  );
};

export default Reviews;