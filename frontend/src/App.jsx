import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("This is Output");

  async function fetchOutput() {
    try {
        let api = "http://localhost:3000/translate/";
        let response = await axios.get(api + input, { 
          text: input
        })
        if (response.data) {
          console.log(response.data);
          setOutput(response.data.message);
        }
    } catch (error) {
      console.log(error);
      window.alert("Backend Error");
    }
  }
  return (
    <div >
          <h1 className="font-bold ">Our Gpt</h1>
          < input className='border-grey-300 w-full' placeholder='Type your Text here ' onChange = {(e)=> {
              setInput(e.target.value);
          }}/>
          <button onClick = {fetchOutput}>Send</button>
          <div>
              <p>{output}</p>
          </div>
    </div>
  )
}

export default App
