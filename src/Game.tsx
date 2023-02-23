import { useEffect, useState } from 'react'

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width': '60px',
    'height': '60px',

    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

interface IBoard {
    player: string,
    board: number,
    win: boolean
}

interface SquareProp {
    onClick: () => void,
    board: IBoard[],
}

function Square({ onClick, board }: SquareProp) {
    console.log(board[0]);

    let player = ''
    let color = 'white'
    const win = {
        color: 'white',
        backgroundColor: '#ddd',
    }

    if (board.length) {
        player = board[0].player
        win.color = board[0].win ? 'black' : 'white'
        win.backgroundColor = board[0].win ? 'rgb(0 248 55)' : '#ddd'
    }

    return (
        <div
            onClick={onClick}
            className="square"
            style={{
                ...squareStyle,
                ...win
            }}>
            {player}
        </div>
    );
}


function Board() {

    const [playerCurrent, setPlayerCurrent] = useState(true)
    const [board, setBoard] = useState<IBoard[]>([])
    const [winnerPlayer, setWinnerPlayer] = useState<string | null>(null);
    const [listWinner, setListWinner] = useState<string[]>([]);


    const winner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]



    function handleClick(value: number) {
        if (winnerPlayer) return
        const newBoard = board;
        const player = playerCurrent ? 'X' : 'O'
        newBoard.push({
            player,
            board: value,
            win: false
        })
        win(newBoard, player)
        setPlayerCurrent((p) => !p)
        setBoard(newBoard);
    }

    function win(board: IBoard[], player: string) {
        for (let i = 0; i < winner.length; i++) {
            const [a, b, c] = winner[i]
            const playerBoard = board.filter((b) => b.player == player).map((b) => b.board)
            if (playerBoard.includes(a) && playerBoard.includes(b) && playerBoard.includes(c)) {
                setWinnerPlayer(player)
                
                const newList = listWinner;
                newList.push(player);
                setListWinner(newList);

                const newBoard = board

                newBoard.map((board, i) => {
                    const win = [a, b, c].filter((v) => { if (board.board == v) return b })
                    return win.length ? newBoard[i] = { ...board, win: true } : newBoard[i]
                })
            }
        }
    }


    function handlePlayer(borderValue: number) {
        return board.filter((b) => {
            return borderValue == b.board
        })
    }

    function handleReset() {
        setBoard([])
        setPlayerCurrent(true)
            setWinnerPlayer(null)
    }

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{playerCurrent ? "X" : "O"}</span></div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winnerPlayer || 'None'}</span></div>
            <button style={buttonStyle} onClick={handleReset}>Reset</button>
            <div style={boardStyle}>
                <div className="board-row" style={rowStyle}>
                    <Square onClick={() => handleClick(0)} board={handlePlayer(0)} />
                    <Square onClick={() => handleClick(1)} board={handlePlayer(1)} />
                    <Square onClick={() => handleClick(2)} board={handlePlayer(2)} />
                </div>
                <div className="board-row" style={rowStyle}>
                    <Square onClick={() => handleClick(3)} board={handlePlayer(3)} />
                    <Square onClick={() => handleClick(4)} board={handlePlayer(4)} />
                    <Square onClick={() => handleClick(5)} board={handlePlayer(5)} />
                </div>
                <div className="board-row" style={rowStyle}>
                    <Square onClick={() => handleClick(6)} board={handlePlayer(6)} />
                    <Square onClick={() => handleClick(7)} board={handlePlayer(7)} />
                    <Square onClick={() => handleClick(8)} board={handlePlayer(8)} />
                </div>
            </div>
            <div style={{ width: '208px' }}>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                }}>
                    {listWinner.map((l,i) => (
                        <li key={i} style={{
                            padding: '10px',
                            background: '#ddd',
                            borderRadius: '5px',
                            marginTop: '10px'
                        }}>winner: {l}</li> 
                    ))}
                    
                </ul>
            </div>
        </div>
    );
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}




export default Game
