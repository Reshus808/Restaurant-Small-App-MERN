import React, {useState} from 'react';
import styles from './styles/AddReview.module.scss'
import axios from "../apis/RestaurantFinder";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const AddReviews = () => {
  const location = useLocation();
  console.log(location);
  const {id} = useParams();
  const navigate = useNavigate();


  const [name, setName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("")


  const handleSubmitReview = async (e) => {
      e.preventDefault()

     try {
       const response = await axios.post(`/${id}/addReview`, {
         name,
         review: reviewText,
         rating,
       })
       navigate(`/restaurants/${id}`);
       console.log(`/restaurants/${id}`)
     }catch (e){
       console.log(e)
     }
  }
  return (
      <div className={styles.main}>
        <form>
          <label>Name</label>
          <input type={'text'}
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder={'name'}/>

          <label>Rating</label>
          <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}>
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label>Review</label>
          <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}/>
          <button type={'submit'} value={'submit'} onClick={handleSubmitReview}>Submit</button>

        </form>
      </div>
  );
};

export default AddReviews;