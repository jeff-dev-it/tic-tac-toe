import { useState } from 'react'
import './App.scss'
import Settings from '../components/settings'
import GamePVP from '../components/GamePvP'
import GameBot from '../components/GameBot'

function App() {
  const [settings, setSettings] = useState({
    playerType: "X",
    level: 0
  })
  const [warn, setWarn] = useState('')
  const [started, setStarted] = useState(false)
  const [score, setScore] = useState({
    player1: 0,
    player2: 0,
    bot: 0,
  })

  function start(e){
    e.preventDefault()


    setStarted(true)
  }

  function stop(){
    setStarted(false)
    setScore({
      player1: 0,
      player2: 0,
      bot: 0,
    })
    setWarn('')
  }

  return (
    <main>
        <section className='flex jc-c ai-c col'>
          <h1>Jogo da Velha</h1>

          {!started && <Settings setSettings={setSettings} settings={settings} start={start}/>}
          {(started && settings.pvp) && <GamePVP 
            warn={warn}
            setWarn={setWarn}
            playerType={settings.playerType}
            p1={{n: settings.name1, p: score.player1}}
            p2={{n: settings.name2, p: score.player2}}
            setPoints={setScore}
            stop={stop}
          />}
          {
            (started && !settings.pvp) &&  <GameBot
              warn={warn}
              setWarn={setWarn}
              playerType={settings.playerType}
              setPoints={setScore}
              score={score}
              level={settings.level}
              stop={stop}
          />}
          
          {warn && <p className="warn">{warn}</p>}
          
        <p>
          Desenvolvido por Jefferson Silva:
          <br/>
          <a href='https://github.com/jeff-dev-it/' target='_blank'>Github</a>
          <br/>
          <a href='https://www.instagram.com/jeff.silva_souza/' target='_blank'>Instagram @jeff.silva_souza</a>
          <br/>
          <a href='https://www.instagram.com/jeff.developer' target='_blank'>Instagram @jeff.developer</a>
        </p>
        </section>
    </main>
  )
}

export default App
