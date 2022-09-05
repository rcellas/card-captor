import React, { useEffect, useState } from "react";

function Card() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("https://protected-taiga-89091.herokuapp.com/api/card")
      .then((res) => res.json())
      .then((data) => setCards(data.data));
  }, []);
  return (
    <div className="wrapper">
      {cards.map((card) => {
        return (
          <div key={card._id} className="card">
            <img src={card.clowCard} className="card-img" alt={card.spanishName} />
            <div className="card-body">
              <h2 className="card-title">Nombre en español: {card.spanishName} </h2>
            </div>
            {/* <button onClick={()=>handleClick(card)}>Agregar a favorito</button> */}
          </div>
        );
      })} 
    </div>
  );
}

export default Card;
