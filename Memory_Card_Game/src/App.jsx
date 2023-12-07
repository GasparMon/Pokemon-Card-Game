import "./App.css";
import Cards from "./components/Cards/Cards";

function App() {
  // const numeros = [];
  // var order_cards

  // function getRandomInt(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }


    // while (numeros.length < 12) {
    //   const newNumero = getRandomInt(1, 30);
    //   if (!numeros.includes(newNumero)) {
    //     numeros.push(newNumero);
    //   }
    // }
  
    // const arrayDuplicado = numeros.flatMap((numero) => [numero, numero]);
  
    // order_cards = arrayDuplicado.sort(() => Math.random() - 0.5);

  return (
    <div id="land-page">
      <Cards />
    </div>
  );
}

export default App;
