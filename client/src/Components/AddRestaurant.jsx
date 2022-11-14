import React, {useContext, useState} from 'react';
import styles from "./styles/Addrestaurant.module.scss";
// import toast, {Toaster} from 'react-hot-toast';
import axios from "../apis/RestaurantFinder";
import {RestaurantsContext} from "../context/RestaurantsContext";
import {useNavigate} from "react-router-dom";


const AddRestaurant = () => {
  const navigate = useNavigate();
  const {addRestaurants} = useContext(RestaurantsContext);
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('')

  // const router = useRouter();


  const addRestaurant = async (e) => {
    e.preventDefault()
    try{
      const response =  await axios.post('/', {
        name: name,
        location: location,
        price_range: priceRange
      })
     addRestaurants(response?.data?.data?.restaurant)
      navigate('/');
      setName("")
      setLocation("")
      setPriceRange("")
    }catch (err){
      console.log(err)
    }
  }
  return (
      <div className={styles.main}>
        <form>
          <div className={styles.input}>
            <input type={'text'}
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder={'Name'}/>
          </div>
          <div className={styles.input}>
            <input type={'text'}
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   placeholder={'Location'}/>
          </div>
          <div className={styles.select}>
            <select placeholder={'Price_range'}
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}>
              <option value={'1'}>$</option>
              <option value={'2'}>$$</option>
              <option value={'3'}>$$$</option>
              <option value={'4'}>$$$$</option>
              <option value={'5'}>$$$$$</option>
            </select>
          </div>
          <div className={styles.btn}>
            <button onClick={addRestaurant}>Add</button>
          </div>
        </form>
      </div>
  );
};

export default AddRestaurant;