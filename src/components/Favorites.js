import React from 'react';
import {useSelector} from 'react-redux'
import CountryCard from './CountryCard';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.fav);
  return (
    <>
      {
        favorites.map((favor, i) => 
          <CountryCard country={favor} key={i}/>
        )
      }
    </>
  )
}

export default Favorites