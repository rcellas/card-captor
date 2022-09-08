import React, { useEffect, useState, useReducer } from "react";
import Search from "../Search/Search";

// estado inicial del reducer
const initalState = {
  favorites: [],
};

// reducer para guardar los favoritos o desaparecidas
const favoriteReducer = (state, action) => {
  // busca los tipode de acciones que se pueden hacer
  switch (action.type) {
    // añade a favoritos
    case "ADD_TO_FAVORITE":
      // deconstruye el estado y vuelvo a crear el estado
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};
function Card() {
  // crea un estado para guardar los datos de la api
  const [cards, setCards] = useState([]);
  // crea un reducer para guardar los favoritos
  const [favorites, dispatch] = useReducer(favoriteReducer, initalState);
  // crear un search con hooks que me encuentre las cartas
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");

  // paso la información de la api a un estado a través del useEffect
  useEffect(() => {
    fetch("https://protected-taiga-89091.herokuapp.com/api/card")
    .then((res) => res.json())
    .then((data) => setCards(data.data));
  }, []);
  
  // al hacer click en el boton de favoritos se guarda en el reducer
  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  // crear una funcion que me busque las cartas por nombre
  const handleSearch = (searchCard) => {
    setSearch(searchCard);
    // si el search no esta vacio devuelve las cartas que coincidan con el search
    if(search !== ""){
      // busca las cartas que coincidan con el search pero solo el valor spanishName
      const result = cards.filter((card) => Object.values(card).join("").toLowerCase().includes(searchCard.toLowerCase()));
      setSearchResult(result);
    }
    // si el search esta vacio devuelve todas las cartas
    else{
      setSearchResult(cards);
    }
  };
  return (
    <div>
     <Search handleSearch={handleSearch} search={search} />
      <div className="wrapper">
        {search.length > 1 ? searchResult.map((card) => {
          return(
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
          )
          })
          : cards.map((card) => {
            return(
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
