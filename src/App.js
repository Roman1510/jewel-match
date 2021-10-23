import {useState, useEffect} from "react";

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

    const checkForCol = () =>{
        for (let i=0; i<47; i++){
            const colOfThree = [i, i+width,i+width*2]
            const decidedColor = currColorArr[i]

            if(colOfThree.every(square=>currColorArr[square] === decidedColor)){
                colOfThree.forEach(square => currColorArr[square] = '')
            }
        }
    }

    const createBoard = () =>{
        const colorsArray = []
        for(let i = 0; i<width*width;i++){
            const randomNumber = Math.random()*candyColors.length
            const randomColor = candyColors[Math.floor(randomNumber)]
            colorsArray.push(randomColor)
        }
        setCurrColorArr(colorsArray)
    }

    useEffect(()=>{
        createBoard()
    }, [])

    useEffect(()=>{
       const timer = setInterval(()=>{
           checkForCol()
           setCurrColorArr([...currColorArr])
       }, 100)
        return () =>clearInterval(timer)
    },[checkForCol])

    console.log(currColorArr)
  return (
    <div className="app">
        <div className="game">
            {currColorArr.map((color, index)=>(
                <img
                    key={index}
                    style={{backgroundColor: color}}
                    alt={color}
                />
            ))}
        </div>
    </div>
  );
}

export default App;
