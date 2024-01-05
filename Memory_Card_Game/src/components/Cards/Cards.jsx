import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import "../Cards/Cards.modules.css";
import { data } from "/src/utils/game_data";
import { clean, fill } from "../../redux/action_types";

function generateNumbers(count) {
  const numbers = Array.from({ length: count }, (_, index) => index + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Cards(props) {

  let play_order = useSelector((state) => state.full);
  let winning = useSelector((state) => state.success);
  let dispatch = useDispatch();
  let cards = [];
  let numeros = [];
  // var order_cards = []

  const handleStart = () => {

    dispatch(clean())
    cards = [];
    numeros = [];
    winning = [];

    while (numeros.length < 12) {
      const newNumero = getRandomInt(1, 90);
      if (!numeros.includes(newNumero)) {
        numeros.push(newNumero);
      }
    }

  

    const arrayDuplicado = numeros.flatMap((numero) => [numero, numero]);

    const order_cards = arrayDuplicado.sort(() => Math.random() - 0.5);

    const uniqueShuffledNumbers = generateNumbers(order_cards.length);

    for (let i = 0; i < order_cards.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (order_cards[i] === data[j].id) {
          cards.push({ ...data[j], position: uniqueShuffledNumbers[i] });
        }
      }
    }

    cards.map((element) => {
      dispatch(fill(element));
    });
  };

  const renderGame = () => {
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
      return (
        <div id="cards-finish">
          <div id="finish-title">
            <h1>Congratulations !</h1>
            <h1>You caught 'em all !!</h1>
            <button onClick={handleStart}>New Game</button>
          </div>
        </div>
      );
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
      {renderGame()}
    </div>
  );
}
