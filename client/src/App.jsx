import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantdetailPage from "./routes/RestaurantdetailPage";
import { RestaurantsContextProvider } from './context/RestaurantsContext'


const App = () => {
  return (
      <RestaurantsContextProvider>
      <div>
          <BrowserRouter>
            <Routes>
              <Route  path={'/'} element={<Home/>}/>
              <Route  path={'/restaurants/:id/update'} element={<UpdatePage/>}/>
              <Route  path={'/restaurants/:id'} element={<RestaurantdetailPage/>}/>
            </Routes>
          </BrowserRouter>
      </div>
      </RestaurantsContextProvider>
  );
};

export default App;