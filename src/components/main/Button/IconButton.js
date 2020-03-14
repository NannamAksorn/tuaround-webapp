import React from 'react';

export default ({title, onClick}) => {
  const handleClick = e => {
   return onClick ? onClick() : null
  }
  return (
    <div className="IconButton TU--Yellow" onClick={handleClick}>
      <span>{title}</span>
    </div>  
  )
}