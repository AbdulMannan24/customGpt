import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter here...");
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
    <div className="bg-gray-900 h-screen overflow-auto">
      <div className='p-10 pt-5 '>
            <h1 className="font-bold text-center text-white pt-10 text-2xl">customGpt</h1>
            <p className='text-white text-center'>Unlock the Potential: Empowering with Gemini AI </p>
            <br />
            <div className= "sm:px-20 pt-0 pb-0 text-center">
              < input className='border-gray-300 w-80 h-10' placeholder={placeholder} onChange = {(e)=> {
                  setInput(e.target.value);
                }}
                onKeyDown={(e)=> {
                  if (e.key === 'Enter') {
                    fetchOutput();
                    e.target.value = "";
                  }
                  
                }}
              />
            </div>
            <br />
            <div className='text-center '>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                onClick={fetchOutput}>
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Send
                </span>
                </button>
            </div>
            <br />
            {output.length > 0 && <div className='flex justify-center  overflow-auto'>
                {/* <p className='mb-3 text-white dark:text-gray-400'>{output}</p> */}
                <div className=''>
                <a href="#" className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <p class="font-normal text-gray-100 dark:text-gray-400"><code>{output}</code></p>
                </a>
                </div>
            </div>}
      </div>
    </div>
  )
}

export default App
