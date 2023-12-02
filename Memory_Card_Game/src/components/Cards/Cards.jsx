import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import "../Cards/Cards.modules.css";
import { data } from "/src/utils/game_data";
import { fill } from "../../redux/action_types";

export default function Cards({ order_cards }) {
  const play_order = useSelector((state) => state.full);
  const winning = useSelector((state) => state.success);
  const dispatch = useDispatch();

  function generateUniqueShuffledNumbers(count) {
    const numbers = Array.from({ length: count }, (_, index) => index + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }

  const cards = [];
  const uniqueShuffledNumbers = generateUniqueShuffledNumbers(
    order_cards.length
  );

  for (let i = 0; i < order_cards.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (order_cards[i] === data[j].id) {
        cards.push({ ...data[j], position: uniqueShuffledNumbers[i] });
      }
    }
  }

  const handleStart = () => {
    cards.map((element) => {
      dispatch(fill(element));
    });
  };

  const startGame = () => {
    if (play_order.length === 0) {
      return (
        <div id="cards-start">
          <button onClick={handleStart}>START</button>
        </div>
      );
    } else if (play_order.length > 1 && winning.length < 23) {
      return (
        <div id="cards-conteiner">
          {play_order.map((element, index) => (
            <Card
              key={index}
              name={element.name}
              image={element.image}
              id={element.id}
              position={element.position}
              status={element.status}
              buttonActive={element.buttonActive}
            />
          ))}
        </div>
      );
    } else if (play_order.length > 1 && winning.length > 22) {
      return(
        <div id="cards-finish">
          
          <div id="finish-title">
          <h1>Congratulations !</h1>
          <h1>You caught 'em all !!</h1>
          <button></button>
          </div>
  
      </div>
      )
    }
    return null;
  };

  return (
    <div id="main-cards">
      <div id="title-game">
        <img src="./src/img/pokeball.png" alt="title-pokeball" />
        <p>Pokemon Card Game</p>
        <img src="./src/img/pokeball.png" alt="title-pokeball" />
      </div>
      {startGame()}
    </div>
  );
}
