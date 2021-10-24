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

const App = () => {
    const [currColorArr, setCurrColorArr] = useState([])
    const [beingDragged,setBeingDragged] = useState(null)
    const [beingReplaced,setBeingReplaced] = useState(null)

    const checkForCol3 = () => {
        for (let i = 0; i <= 47; i++) {
            const colOf3 = [i, i + width, i + width * 2]
            const decidedColor = currColorArr[i]

            if (colOf3.every(square => currColorArr[square] === decidedColor)) {
                colOf3.forEach(square => currColorArr[square] = '')
            }
        }
    }
    const checkForCol4 = () => {
        for (let i = 0; i <= 39; i++) {
            const colOf4 = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currColorArr[i]

            if (colOf4.every(square => currColorArr[square] === decidedColor)) {
                colOf4.forEach(square => currColorArr[square] = '')
            }
        }
    }

    const checkForRow3 = () => {
        for (let i = 0; i < 64; i++) {
            const rowOf3 = [i, i + 1, i + 2]
            const decidedColor = currColorArr[i]
            const endList = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if (endList.includes(i)) continue
            if (rowOf3.every(square => currColorArr[square] === decidedColor)) {
                rowOf3.forEach(square => currColorArr[square] = '')
            }
        }
    }
    const checkForRow4 = () => {
        for (let i = 0; i < 64; i++) {
            const rowOf4 = [i, i + 1, i + 2, i + 3]
            const decidedColor = currColorArr[i]
            const endList = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if (endList.includes(i)) continue
            if (rowOf4.every(square => currColorArr[square] === decidedColor)) {
                rowOf4.forEach(square => currColorArr[square] = '')
            }
        }
    }


    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 64 - width; i++) {

            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && currColorArr[i] === '') {
                let randColor = Math.floor(Math.random() * candyColors.length)
                currColorArr[i] = candyColors[randColor]
            }

            if ((currColorArr[i + width]) === '') {
                currColorArr[i + width] = currColorArr[i]
                currColorArr[i] = ''
            }
        }
    }

    const dragStart = (e) => {
        setBeingDragged(e.target)
    }

    const dragDrop = (e) => {
        setBeingReplaced(e.target)
    }

    const dragEnd = (e) => {
        const beingReplacedId = beingReplaced.getAttribute('data-id')
        const beingDraggedId = beingDragged.getAttribute('data-id')

        console.log(beingReplacedId,beingDraggedId)
    }

    const createBoard = () => {
        const colorsArray = []
        for (let i = 0; i < width * width; i++) {
            const randomNumber = Math.random() * candyColors.length
            const randomColor = candyColors[Math.floor(randomNumber)]
            colorsArray.push(randomColor)
        }
        setCurrColorArr(colorsArray)
    }

    useEffect(() => {
        createBoard()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForCol4()
            checkForCol3()
            checkForRow4()
            checkForRow3()
            moveIntoSquareBelow()
            setCurrColorArr([...currColorArr])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForCol4, checkForCol3, checkForRow4, checkForRow3, moveIntoSquareBelow, currColorArr])


    return (
        <div className="app">
            <div className="game">
                {currColorArr.map((color, index) => (
                    <img
                        key={index}
                        style={{backgroundColor: color}}
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
                ))}
            </div>
        </div>
    );
}

export default App;
