import React from 'react';
import {useSelector} from 'react-redux'

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.fav);
  console.log(favorites);
  return (
      favorites.map(favor => <p>{favor.name.common}</p>)
    
    
  )
}

export default Favorites