import { useEffect, useState } from "react";

function random() {
    return Math.floor(Math.random() * 3);
}
function randomPlayer() {
    return Math.floor(Math.random() * 11) > 5 ? "X" : "O";
}


export default function GameBot({playerType, setWarn, level, score, stop, setPoints}){
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

    useEffect(()=>{
        if(turn !== playerType) robotPlayer()

    }, [turn])

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

    function robotPlayer(){
        if(hasFull() || !turn){
            return;
        }
        let c, i;                
        let played = false;

        switch (level) {
            case 0:
                randomPlay()

                break;
            case 1:
                for(let c = 0; c < 3; c++){
                    const col = matrix[c]
                    if(col[0] === playerType && col[1] === playerType && !col[2]){
                        played = true;
                        play(c, 2)
                        break
                    }else if(col[0] === playerType && col[2] === playerType && !col[2]){
                        played = true;
                        play(c, 1)
                        break
                    }else if(col[1] === playerType && col[2] === playerType && !col[2]){
                        played = true;
                        play(c, 0)
                        break
                    }
                }

                randomPlay()

                break
            case 2:
                if(matrix[0][0] === playerType && matrix[0][1] === playerType && !matrix[0][2]){
                    played = true;
                    play(0, 2)
                    break
                }else if(matrix[0][1] === playerType && matrix[0][2] === playerType && !matrix[0][0]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[0][0] === playerType && matrix[0][2] === playerType && !matrix[0][1]){
                    played = true;
                    play(0, 1)
                    break
                }else if(matrix[1][0] === playerType && matrix[1][1] === playerType && !matrix[1][2]){
                    played = true;
                    play(1, 2)
                    break
                }else if(matrix[1][1] === playerType && matrix[1][2] === playerType && !matrix[1][0]){
                    played = true;
                    play(1, 0)
                    break
                }else if(matrix[1][0] === playerType && matrix[1][2] === playerType && !matrix[1][1]){
                    played = true;
                    play(1, 1)
                    break
                }else if(matrix[2][0] === playerType && matrix[2][1] === playerType && !matrix[2][2]){
                    played = true;
                    play(2, 2)
                    break
                }else if(matrix[2][1] === playerType && matrix[2][2] === playerType && !matrix[2][0]){
                    played = true;
                    play(2, 0)
                    break
                }else if(matrix[2][0] === playerType && matrix[2][2] === playerType && !matrix[2][1]){
                    played = true;
                    play(2, 1)
                    break
                }else if(matrix[0][0] === playerType && matrix[1][1] === playerType && !matrix[2][2]){
                    played = true;
                    play(2, 2)
                    break
                }else if(matrix[2][2] === playerType && matrix[0][0] === playerType && !matrix[1][1]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[2][0] === playerType && matrix[1][1] === playerType && !matrix[0][2]){
                    played = true;
                    play(0, 2)
                    break
                }else if(matrix[2][0] === playerType && matrix[0][2] === playerType && !matrix[1][1]){
                    played = true;
                    play(1, 1)
                    break
                }else if(matrix[2][2] === playerType && matrix[1][1] === playerType && !matrix[0][0]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[0][2] === playerType && matrix[1][1] === playerType && !matrix[2][0]){
                    played = true;
                    play(2, 0)
                    break
                }else if(matrix[0][0] === playerType && matrix[1][0] === playerType && !matrix[2][0]){
                    played = true;
                    play(2, 0)
                    break
                }else if(matrix[0][0] === playerType && matrix[2][0] === playerType && !matrix[1][0]){
                    played = true;
                    play(1, 0)
                    break
                }else if(matrix[1][0] === playerType && matrix[2][0] === playerType && !matrix[0][0]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[1][1] === playerType && matrix[2][1] === playerType && !matrix[0][1]){
                    played = true;
                    play(0, 1)
                    break
                }else if(matrix[1][2] === playerType && matrix[2][2] === playerType && !matrix[0][2]){
                    played = true;
                    play(0, 2)
                    break
                }else if(matrix[0][2] === playerType && matrix[1][2] === playerType && !matrix[2][2]){
                    played = true;
                    play(2, 2)
                    break
                }else if(matrix[0][2] === playerType && matrix[2][2] === playerType && !matrix[1][2]){
                    played = true;
                    play(1, 2)
                    break
                }else if(matrix[0][0] === turn && matrix[0][1] === turn && !matrix[0][2]){
                    played = true;
                    play(0, 2)
                    break
                }else if(matrix[0][1] === turn && matrix[0][2] === turn && !matrix[0][0]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[0][0] === turn && matrix[0][2] === turn && !matrix[0][1]){
                    played = true;
                    play(0, 1)
                    break
                }else if(matrix[1][0] === turn && matrix[1][1] === turn && !matrix[1][2]){
                    played = true;
                    play(1, 2)
                    break
                }else if(matrix[1][1] === turn && matrix[1][2] === turn && !matrix[1][0]){
                    played = true;
                    play(1, 0)
                    break
                }else if(matrix[1][0] === turn && matrix[1][2] === turn && !matrix[1][1]){
                    played = true;
                    play(1, 1)
                    break
                }else if(matrix[2][0] === turn && matrix[2][1] === turn && !matrix[2][2]){
                    played = true;
                    play(2, 2)
                    break
                }else if(matrix[2][1] === turn && matrix[2][2] === turn && !matrix[2][0]){
                    played = true;
                    play(2, 0)
                    break
                }else if(matrix[2][0] === turn && matrix[2][2] === turn && !matrix[2][1]){
                    played = true;
                    play(2, 1)
                    break
                }else if(matrix[0][0] === turn && matrix[1][1] === turn && !matrix[2][2]){
                    played = true;
                    play(2, 2)
                    break
                }else if(matrix[2][2] === turn && matrix[0][0] === turn && !matrix[1][1]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[2][0] === turn && matrix[1][1] === turn && !matrix[0][2]){
                    played = true;
                    play(0, 2)
                    break
                }else if(matrix[2][0] === turn && matrix[0][2] === turn && !matrix[1][1]){
                    played = true;
                    play(1, 1)
                    break
                }else if(matrix[2][2] === turn && matrix[1][1] === turn && !matrix[0][0]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[0][2] === turn && matrix[1][1] === turn && !matrix[2][0]){
                    played = true;
                    play(2, 0)
                    break
                }else if(matrix[0][0] === turn && matrix[1][0] === turn && !matrix[2][0]){
                    played = true;
                    play(2, 0)
                    break
                }else if(matrix[0][0] === turn && matrix[2][0] === turn && !matrix[1][0]){
                    played = true;
                    play(1, 0)
                    break
                }else if(matrix[1][0] === turn && matrix[2][0] === turn && !matrix[0][0]){
                    played = true;
                    play(0, 0)
                    break
                }else if(matrix[1][1] === turn && matrix[2][1] === turn && !matrix[0][1]){
                    played = true;
                    play(0, 1)
                    break
                }else if(matrix[1][2] === turn && matrix[2][2] === turn && !matrix[0][2]){
                    played = true;
                    play(0, 2)
                    break
                }else if(matrix[0][2] === turn && matrix[1][2] === turn && !matrix[2][2]){
                    played = true;
                    play(2, 2)
                    break
                }else if(matrix[0][2] === turn && matrix[2][2] === turn && !matrix[1][2]){
                    played = true;
                    play(1, 2)
                    break
                }
                
                
                randomPlay()
                
                break
        }

        console.log('bot played');

        function randomPlay(){
            if(!played){
                do {
                    c = random();
                    i = random();
                } while (matrix[c][i]);
            }
            play(c, i)
        }

        function play(c, i){
            if(!matrix){
                setWarn('Erro interno, reinicie!')
            }
            if(!matrix[c]){
                setWarn('Erro interno, reinicie!')
            }

            if(matrix[c][i]){
                robotPlayer()
                return
            }
            setMatrix(m => {
                const mm = [...m];
    
                mm[c][i] = turn;
    
                return mm
            })
    
            nextTurn()
        }
    }
    
    function end(win){
        if(reset) return;

        if(win === playerType){
            setPoints(p => {
                const score = {...p}

                score.player1 += 5;

                return score
            })

            setWarn(`Jogador ganhou`)
        }else if(win){
            setPoints(p => {
                const score = {...p}

                score.bot += 5;

                return score
            })
            setWarn(`Robô ganhou`)
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
        if(turn !== playerType) return;

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
            <p>Vez de/o {turn === playerType? "Jogador": turn? "Robô": "Escolhendo"}</p>
            <p>
                Pontos
                <br/>
                {"Jogador"}: {score.player1}
                <br/>
                {"Robô"}: {score.bot}
            </p>

            <p> 
                Nível: {level === 0? 'Fácil': level == 1? "Médio": level === 2? "Difícil": "Erro"}
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