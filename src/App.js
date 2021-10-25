import {useState, useEffect} from "react";
import Scores from "./components/Scores";
import blueJewel from './images/blue.png'
import greenJewel from './images/green.png'
import redJewel from './images/red.png'
import orangeJewel from './images/orange.png'
import yellowJewel from './images/yellow.png'
import purpleJewel from './images/purple.png'
import blankJewel from './images/blank.png'
import background from './images/1624.jpg'

const width = 8
const jewelColors = [
    blueJewel,
    greenJewel,
    orangeJewel,
    purpleJewel,
    redJewel,
    yellowJewel
]

const App = () => {
    const [currColorArr, setCurrColorArr] = useState([])
    const [beingDragged, setBeingDragged] = useState(null)
    const [beingReplaced, setBeingReplaced] = useState(null)
    const [currentScore, setCurrentScore] = useState(0)
    const [alreadyDragged, setAlreadyDragged] = useState(false)


    const checkForCol3 = () => {
        for (let i = 0; i <= 47; i++) {
            const colOf3 = [i, i + width, i + width * 2]
            const decidedColor = currColorArr[i]
            const isBlank = currColorArr[i] === blankJewel
            if (colOf3.every(square => currColorArr[square] === decidedColor && !isBlank)) {
                if (alreadyDragged) {
                    setCurrentScore((score) => score + 3)
                }
                colOf3.forEach(square => currColorArr[square] = blankJewel)
                return true
            }
        }
    }
    const checkForCol4 = () => {
        for (let i = 0; i <= 39; i++) {
            const colOf4 = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currColorArr[i]
            const isBlank = currColorArr[i] === blankJewel
            if (colOf4.every(square => currColorArr[square] === decidedColor && !isBlank)) {
                if (alreadyDragged) {
                    setCurrentScore((score) => score + 4)
                }
                colOf4.forEach(square => currColorArr[square] = blankJewel)
                return true
            }
        }
    }

    const checkForRow3 = () => {
        console.log(alreadyDragged)
        for (let i = 0; i < 64; i++) {
            const rowOf3 = [i, i + 1, i + 2]
            const decidedColor = currColorArr[i]
            const isBlank = currColorArr[i] === blankJewel
            const endList = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if (endList.includes(i)) continue
            if (rowOf3.every(square => currColorArr[square] === decidedColor && !isBlank)) {
                if(alreadyDragged){
                    setCurrentScore((score) => score + 3)
                }
                rowOf3.forEach(square => currColorArr[square] = blankJewel)
                return true
            }
        }
    }
    const checkForRow4 = () => {
        for (let i = 0; i < 64; i++) {
            const rowOf4 = [i, i + 1, i + 2, i + 3]
            const decidedColor = currColorArr[i]
            const isBlank = currColorArr[i] === blankJewel
            const endList = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if (endList.includes(i)) continue
            if (rowOf4.every(square => currColorArr[square] === decidedColor && !isBlank)) {
                if(alreadyDragged){
                    setCurrentScore((score) => score + 4)
                }
                rowOf4.forEach(square => currColorArr[square] = blankJewel)
                return true
            }
        }
    }


    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 64 - width; i++) {

            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && currColorArr[i] === blankJewel) {
                let randColor = Math.floor(Math.random() * jewelColors.length)
                currColorArr[i] = jewelColors[randColor]
            }

            if ((currColorArr[i + width]) === blankJewel) {
                currColorArr[i + width] = currColorArr[i]
                currColorArr[i] = blankJewel
            }
        }
    }

    const dragStart = (e) => {
        setAlreadyDragged(true)
        setBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        setBeingReplaced(e.target)
    }

    const dragEnd = () => {

        const beingReplacedId = parseInt(beingReplaced.getAttribute('data-id'))
        const beingDraggedId = parseInt(beingDragged.getAttribute('data-id'))

        currColorArr[beingReplacedId] = beingDragged.getAttribute('src')
        currColorArr[beingDraggedId] = beingReplaced.getAttribute('src')

        const validMoves = [
            beingDraggedId - 1,
            beingDraggedId - width,
            beingDraggedId + 1,
            beingDraggedId + width
        ]

        const validMove = validMoves.includes(beingReplacedId)
        const col3 = checkForCol3()
        const col4 = checkForCol4()
        const row3 = checkForRow3()
        const row4 = checkForRow4()

        if (beingReplacedId && validMove && (col3 || col4 || row3 || row4)) {
            setBeingDragged(null)
            setBeingReplaced(null)
        } else {
            currColorArr[beingReplacedId] = beingReplaced.getAttribute('src')
            currColorArr[beingDraggedId] = beingDragged.getAttribute('src')
            setCurrColorArr([...currColorArr])
        }

        gameLogic()

    }

    const createBoard = () => {
        const colorsArray = []
        for (let i = 0; i < width * width; i++) {
            const randomNumber = Math.random() * jewelColors.length
            const randomColor = jewelColors[Math.floor(randomNumber)]
            colorsArray.push(randomColor)
        }
        setCurrColorArr(colorsArray)
    }

    const gameLogic = () => {
        checkForCol4()
        checkForCol3()
        checkForRow4()
        checkForRow3()
        moveIntoSquareBelow()
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            gameLogic()
            setCurrColorArr([...currColorArr])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForCol4, checkForCol3, checkForRow4, checkForRow3, moveIntoSquareBelow, currColorArr])


    return (
        <div className="app" style={{ backgroundImage: `url(${background})`}} >
            <div className="game" >
                {currColorArr.map((color, index) => (
                    <div className="grid">
                        <img
                            key={index}
                            src={color}
                            alt={color}
                            data-id={index}
                            draggable={true}
                            onDragStart={dragStart}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDrop={dragDrop}
                            onDragEnd={dragEnd}
                        />
                    </div>

                ))}
            </div>
            <Scores score={currentScore}/>
        </div>
    );
}

export default App;
// 1. get rid of 'key' error, get rid of infinite timer of the game
// 2. Center the whole game