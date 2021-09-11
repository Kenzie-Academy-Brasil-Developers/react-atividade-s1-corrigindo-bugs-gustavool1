import CardsList from "./components/cards-list";
import { useEffect } from "react";
import { useState  } from "react";

import "./App.css";

const App = () => {
  const [showDeck, setShowDeck] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [deck, setDeck] = useState(null);

  const handleDeckRequest = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/")
      .then((res) => res.json())
      .then((res) => setDeck(res))
  };

  const handleCardsRequest = (deckId) => {
    console.log(`deck id --> ${deckId}`)
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
      .then((res) => res.json())
      .then((res) => setCardsList(res.cards))
      .catch((err)=>console.log(err))
  };

  const handleShowDeck = () => {
    setShowDeck(true);
  };

  useEffect(() => {
    if(showDeck){
      handleDeckRequest();
     
    }
  }, [showDeck]);

  useEffect(() => {
    if(deck !== null && deck.lentgh !== 0 ){
      handleCardsRequest(deck.deck_id)
    }
   
  }, [deck]);

  return (
    <div className="main-container">
      <h1 className="main-title">Debugue para ver o baralho</h1>
      <button onClick={handleShowDeck} className="new-deck-button">
        Mostrar baralhos
      </button>
      {showDeck && <CardsList cardsList={cardsList} />}
    </div>
  );
};
export default App