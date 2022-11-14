import React, {useState} from 'react';
  import AddRestaurant from "../Components/AddRestaurant";
  import styles from "../Components/styles/Home.module.scss";
  import RestaurantList from "../Components/RestaurantList";



  const Home = () => {
    // const [res, setRes] = useState([] as any)

    // const addRes = () => {
    //   setRes([...res, addRes])
    // }

    return (
        // <RestaurantsContextProvider>
          <div className={styles.main}>
            <div className={styles.header}>
              <p>Restaurant Finder</p>
            </div>
            <div className={styles.add}>
              <AddRestaurant/>
            </div>
            <div className={styles.details}>
              <RestaurantList/>
            </div>
          </div>
        // </RestaurantsContextProvider>
    );
  };

export default Home;