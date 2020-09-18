import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TopNav from './components/TopNav/TopNav';
import Home from './components/home/Home';
import BookingDetails from './components/BookingDetails/BookingDetails';
import HotelPage from './components/HotelPage/HotelPage';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
         
          <Route exact path="/place/:placeId">
            <TopNav />
            <BookingDetails />
          </Route>
          <PrivateRoute exact path="/hotelpage">
            <TopNav />
            <HotelPage />
          </PrivateRoute>
          <Route exact path="/login">
            <TopNav />
            <Login />
          </Route>
          <Route exact path="/">
            <TopNav />
            <Home />
          </Route>

          <Route exact path="*">
          <TopNav />
          <NotFound/>
          </Route>
        </Switch>


      </Router>

    </userContext.Provider>

  );
}

export default App;
