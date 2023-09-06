import { useEffect, useState } from "react";

function randomPlayer() {
    return Math.floor(Math.random() * 11) > 5 ? "X" : "O";
}

export default function GamePVP({playerType, setWarn, p1, p2, stop, setPoints}){
    const [matrix, setMatrix] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ])
    const [turn, setTurn] = useState('');
    const [reset, setReset] = useState(false);

    useEffect(() => {
        setTurn(randomPlayer());
    }, []);


    useEffect(() => {
        let winner;
    
        for (let i = 0; i < 3; i++) {
            const colWinner = verifyCol(i);
    
            if (colWinner) {
                winner = colWinner;
                break;
            }
    
            const rowWinner = verifyRow(i);
            if (rowWinner) {
                winner = rowWinner;
                break;
            }
        }
    
        if (winner) {
            end(winner);
        } else {
            const dig = verifyDiagonal();
    
            if (dig) {
                end(dig);
            } else if (hasFull()) {
                end(undefined);
            }
        }
    }, [matrix]);
    

    function end(win){
        if(reset) return;

        if(win === playerType){
            setPoints(p => {
                const score = {...p}

                score.player1 += 5;

                return score
            })

            setWarn(`${p1.n || "Jogador 1"} ganhou`)
        }else if(win){
            setPoints(p => {
                const score = {...p}

                score.player2 += 5;

                return score
            })
            setWarn(`${p2.n || "Jogador 2"} ganhou`)
        }else{
            setWarn(`Empate! Ninguém ganhou`)
        }

        setReset(true)
    }

    function verifyCol(c){
        if(matrix[c][0] === matrix[c][1] && matrix[c][1] === matrix[c][2]) {
            return matrix[c][0]
        }
    }

    function verifyRow(i){
        if(matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
            return matrix[0][i]
        }
    }

    function verifyDiagonal(){
        if(matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
            return matrix[0][0]
        }

        if(matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
            return matrix[0][2]
        }
    }

    function hasFull(){
        let isFull = true;

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === '') {
                    isFull = false;
                    break; 
                }
            }
            if (!isFull) {
                break;
            }
        }

        return isFull;
    }

    function again(){
        setMatrix([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ])

        setReset(false)
        setWarn('')
    }

    function choice(c, i){
        if(reset || !turn) return;

        if(matrix[c][i]){
            setWarn(`A posição ${i + 1} da coluna ${c} já foi preenchida: ${matrix[c][i]}`)
            return
        }

        setMatrix(m => {
            const mm = [...m];

            mm[c][i] = turn;

            return mm
        })

        nextTurn()
    }

    function nextTurn(){
        setTurn(turn === "X"? "O": "X")
    }

    return (
        <article>
            <p>Vez de/o {turn === playerType? p1.n || "Jogador 1": turn? p2.n || "Jogador 2": "Escolhendo"}</p>
            <p>
                Pontos
                <br/>
                {p1.n || "Jogador 1"}: {p1.p}
                <br/>
                {p2.n || "Jogador 2"}: {p2.p}
            </p>

            <div className="flex jc-c ai-c col table">
                {
                    matrix.map((row, rowIndex) => (
                        <div className="flex t-col" key={`row-${rowIndex}`}>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={`cell-${rowIndex}-${colIndex}`}
                                    onClick={() => choice(rowIndex, colIndex)}
                                    className={`flex ai-c jc-c ${cell && "not"}`}
                                >
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
            {
                reset && (
                    <>
                        <button onClick={again}>Jogar novamente</button>
                        <button onClick={stop}>Voltar ao menu</button>
                    </>
                )
            }
        </article>
    )
}