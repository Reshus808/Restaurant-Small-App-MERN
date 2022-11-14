import React, {useContext, useEffect, useState} from 'react';
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import {useParams, useNavigate} from "react-router-dom";
import styles from './styles/Update.module.scss';

const UpdatePage = (props) => {

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  // const {restaurants} = useContext(RestaurantsContext)

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('Price Range')

  useEffect(() => {
    const fetchData = async () => {
      const res = await RestaurantFinder.get(`/${id}`)
      console.log(res?.data?.data);
      setName(res.data.data.restaurant.name);
      setLocation(res.data.data.restaurant.location);
      setPriceRange(res.data.data.restaurant.price_range);
    }
    fetchData();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRes = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    });
    navigate('/')
    console.log(updatedRes)
  };
  return (
      <div className={styles.main}>
        <h1>Update Restaurant</h1>
        <form>
          <label>Name</label>
          <input type={'text'}
                 value={name}
                 onChange={(e) => setName(e.target.value)}/>

          <label>Location</label>
          <input type={'text'}
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}/>


          <label>Price Range</label>
          <select value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>

          </select>
          <button type={'submit'} value={'submit'} onClick={handleSubmit}>Submit</button>
        </form>
      </div>
  );
};

export default UpdatePage;