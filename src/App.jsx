import { useState } from 'react';
import './App.css'

const API_KEY = 'b0a276daf292b30e22439b0fca835ba4';
function App() {

  const [inputValue, setInputValue] = useState(null);
  const [temp, setTemp] = useState();
  const [loc, setLoc] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleInputChange(e){
    setInputValue(e.target.value);
  }

  function handleClick(e){
      e.preventDefault();
      setLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`).then((res)=>{
          return res.json();
      }).then((res)=>{
          console.log(res);
          setLoading(false);
          setTemp(res.main.temp);
          setLoc(res.name);
          setError('');
      }).catch((err)=>{
          setLoading(false);
          setError('Write true name of city');
      })
      setInputValue('')
  }

  return (
    <div className="App">
      <form action="" onSubmit={handleClick}>
        <input type="text" placeholder="City"  value={inputValue} onChange={handleInputChange} />
        <button onClick={handleClick}>Get wheather</button>
      </form>
        {error ? <p className='err'>{error}</p> : ''}
        {loading && <p>loading...</p>}
      {temp && loc ?  <div className='info'>
        <h3> {loc &&  loc}</h3>
        {temp &&  <h2>{Math.round(temp)} °C</h2> }
      </div> : ''}
    </div>
  )
}

export default App
