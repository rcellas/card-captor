import React, { useEffect, useState, useReducer } from "react";

const initalState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
function Card() {
  const [cards, setCards] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initalState);

  useEffect(() => {
    fetch("https://protected-taiga-89091.herokuapp.com/api/card")
      .then((res) => res.json())
      .then((data) => setCards(data.data));
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };
  
  return (
    <div>
      <div className="wrapper">
        {cards.map((card) => {
          return (
            <div className="card" key={card._id}>
              <img
                className="card-img"
                src={favorites.favorites.includes(card) ? card.sakuraCard : card.clowCard}
                alt={card.spanishName}
              />
              <h2>{card.spanishName}</h2>
              <p>{card.description}</p>
              <button onClick={() => handleClick(card)}>
                {favorites.favorites.includes(card) ? 'Carta cazada': 'Carta desaparecida'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
