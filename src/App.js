import {useState} from "react";

const width = 8
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
]

const  App = ()=> {
    const [currColorArr, setCurrColorArr] = useState([])
    const createBoard = () =>{
        const colorsArray = []
        for(let i = 0; i<width*width;i++){
            const randomNumber = Math.random()*candyColors.length
            const randomColor = candyColors[Math.floor(randomNumber)]
            colorsArray.push(randomColor)
        }

    }

    createBoard()

  return (
    <div></div>
  );
}

export default App;
