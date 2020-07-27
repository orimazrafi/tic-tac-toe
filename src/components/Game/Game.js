import React, { useState, useEffect, useRef } from 'react';
import "./Game.scss"
import { Row, Col } from 'react-bootstrap';
export const Game = (props) => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(1);
    const [gameBoard, setGameBoard] = useState(props.boardGame);
    const isWinner = useRef(false)
    useEffect(() => {
        checkForRow(gameBoard[0])
        checkForRow(gameBoard[1])
        checkForRow(gameBoard[2])
        checkForColumn(0)
        checkForColumn(1)
        checkForColumn(2)
        checkForCrossWinning()
        checkForFullBoard()
        // eslint-disable-next-line
    }, [gameBoard])
    const handlePaint = (columnIndex, index) => {

        if (currentlyPlaying === 1 && gameBoard[columnIndex][index] === "") {
            paintWithX(columnIndex, index);
            changePlayerTurn()
        } else if (currentlyPlaying === 2 && gameBoard[columnIndex][index] === "") {
            paintWith0(columnIndex, index);
            changePlayerTurn()
        }
    }
    const changePlayerTurn = () => {
        setCurrentlyPlaying(pre => pre === 1 ? 2 : 1)
    }
    const paintWithX = (columnIndex, index) => {
        setGameBoard((pre) => {
            const duplicate = JSON.parse(JSON.stringify(pre));
            duplicate[columnIndex][index] = "X"
            return [...duplicate]
        })
    }
    const paintWith0 = (columnIndex, index) => {
        setGameBoard((pre) => {
            const duplicate = JSON.parse(JSON.stringify(pre));
            duplicate[columnIndex][index] = "0";
            return [...duplicate]
        }
        )
    }
    const checkForRow = (row) => {
        if (row[0] === row[1] && row[1] === row[2] && row[2] !== "") {
            announceWinner(row[2])
        }
    }
    const checkForColumn = columnIndex => {
        if (gameBoard[0][columnIndex] === gameBoard[1][columnIndex] && gameBoard[1][columnIndex] === gameBoard[2][columnIndex] && gameBoard[2][columnIndex] !== "") {
            announceWinner(gameBoard[2][columnIndex])

        }
    }
    const checkForCrossWinning = () => {
        if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[2][2] !== "") {
            announceWinner(gameBoard[2][2])
        }
        if (gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2] && gameBoard[0][2] !== "") {
            announceWinner(gameBoard[0][2])
        }
    }
    const announceWinner = (XOrO) => {
        if (XOrO === "no Winner") {
            if (isWinner.current) return
            alert(`No winner`)
        } else {
            alert(`winner is: ${XOrO}`)
            isWinner.current = true
        }
        setTimeout(() => {
            setGameBoard(props.boardGame);
            setCurrentlyPlaying(1)
            isWinner.current = false
        }, 0)
    }
    const checkForFullBoard = () => {
        const sumOfPaintBoard = gameBoard.reduce((a, b) => {
            const sumOfRow = b.reduce((c, d) => {
                return checkForColumnPaint(c, d)
            }, 0)
            return checkForTotalPaint(a, sumOfRow)

        }, 0)
        if (sumOfPaintBoard === 9) {
            announceWinner("no Winner")
        }
    }
    const checkForColumnPaint = (c, d) => {
        c += d !== "" ? 1 : 0
        return c
    }
    const checkForTotalPaint = (a, sumOfRow) => {
        a += sumOfRow
        return a
    }

    return (gameBoard.map((row, columnIndex) =>
        <div key={Math.random()}>
            <Row className="row-wrapper" >{row.map((board, index) =>
                <Col key={Math.random()} className="board-row-column-wrapper" onClick={() => handlePaint(columnIndex, index)}>
                    {board === "" ? <div className="board-row-column" ></div> : <div className="board-row-column" >{board}</div>}
                </Col>)}
            </Row></div>
    ))
}




