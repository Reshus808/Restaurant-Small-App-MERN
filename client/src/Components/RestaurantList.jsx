import React, {useContext, useEffect, useState} from 'react';
import styles from './styles/RestaurantList.module.scss'
import RestaurantFinder from "../apis/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";
import {useNavigate} from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        console.log("response", response.data.data.restaurant)
        setRestaurants(response.data.data.restaurant)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
      );
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`)
  }

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
  }


  const showRating = (id) => {
    navigate(`/restaurants/${id}`)
  }

  const renderRating = (r) => {
    if(!r.count){
      return <p>0 Reviews</p>
    }
    return (
        <>
          <StarRating rating={r.average_rating}/>
          <span>({r.count})</span>
        </>
    )
  }
  return (
      <div className={styles.main}>
        <div className={styles.container}>
          <table>
            <thead>
            <tr>
              <th>Restaurant</th>
              <th>Location</th>
              <th>Price Range</th>
              <th>Rating</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {restaurants &&
                restaurants.map((r) => {
                  return (
                      <tr key={r.id} onClick={() => handleRestaurantSelect(r.id)}>
                        <td>{r.name}</td>
                        <td>{r.location}</td>
                        <td>{"$".repeat(r.price_range)}</td>
                        <td className={styles.setRating}>{renderRating(r)}</td>
                        <td>
                          <button className={styles.btn1} onClick={(e) => handleUpdate(e, r.id)}>Update</button>
                        </td>
                        <td>
                          <button className={styles.btn2} onClick={(e) => handleDelete(e, r.id)}>Delete</button>
                        </td>
                      </tr>
                  )
                })
            }
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default RestaurantList;