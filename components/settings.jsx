export default function Settings({setSettings, settings, start}){
    
    function selectType(x){
      setSettings({...settings, playerType: x})
    }

    return (
        <form onSubmit={start} className='flex jc-c ai-c col settings'>
            <h3>Configurações</h3>

            <div className='flex jc-c ai-c'>
                <input 
                    onChange={({target})=> setSettings({...settings, pvp: target.checked})}
                    
                    type='checkbox'
                    name='pvp'/>
                <label htmlFor='pvp'>Player vs Player</label>
            </div>

            {
                !settings.pvp && (
                    <>
                        <label>Nível</label>
                        <select onChange={({target})=> setSettings({...settings, level: Number(target.value)})} defaultValue={settings.level}>
                            <option value={"0"}>Fácil</option>
                            <option value={"1"}>Médio</option>
                            <option value={"2"}>Difícil</option>
                        </select>
                    </>
                )
            }
            
            {
                settings.pvp && (
                    <div>

                        <input
                            placeholder='Nome Player 1'
                            onChange={({target})=> setSettings({...settings, name1: target.value})}
                            name='player1-name'/>
                        <input
                            placeholder='Nome Player 2'
                            onChange={({target})=> setSettings({...settings, name2: target.value})}
                            name='player2-name'/>

                    </div>
                )
            }
            
            <label>O Jogador {settings.pvp && "(player 1)"} irá jogar com</label>
            <div className='flex jc-c ai-c'>
                <button 
                    type='button'
                    onClick={()=> selectType("X")}
                    className={`opt-type ${settings.playerType === "X" && "opt-type-selected"}`}>
                    <p>X</p>
                </button>
                <button 
                    type='button'
                    onClick={()=> selectType("O")}
                    className={`opt-type ${settings.playerType === "O" && "opt-type-selected"}`}>
                    <p>O</p>
                </button>
            </div>
            <button type='submit'>Jogar</button>
        </form>
    )
}