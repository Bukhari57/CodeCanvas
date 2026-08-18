import React from 'react'

const Card = (props) => {
  return (
    <div className="card" style={props.style}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
};

export default Card
