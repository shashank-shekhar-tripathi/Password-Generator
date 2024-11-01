 import {useState,useCallback ,useEffect ,useRef} from "react"
 

function App() {
 const  [length, setLength] = useState(8)
 const [numberAllowed, setNumberAllowed] = useState(false)
 const [charAllowed, setCharAllowed] = useState(false)
 const [Password, setPassword] =useState("")
 
const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJabcdefghij"
  if (numberAllowed) str+="0123456789"
  if (charAllowed) str+= "!@#$%^&* "
      for(let i=1;i<=length ;i++)
      {
          const  index= Math.ceil(Math.random() * str.length +1 )
          pass += str.charAt(index);
      }
  setPassword(pass)
},[length,charAllowed,numberAllowed ,setPassword])
 

useEffect(() => { 
  passwordGenerator()
}, [length,numberAllowed,charAllowed ,passwordGenerator] )
 





//useref Hook ( copying passwors)
const passwordref= useRef(null);

const copyToClipboard= useCallback(()=>{
  passwordref.current?.select()
  window.navigator.clipboard.writeText(Password)
} ,[])

 
  return (
   <>
   {/*Small div  */}
   <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2  max-w-md mx-auto   py-5 px-6 bg-custom-gradient shadow-2xl rounded-lg    ">
    <h1 className="text-black text-center text-4xl  font-bold mt-6 " >Password Generator</h1>
    <h3 className="text-black text-center text-md font-bold mb-6 "> (Using Tailwind & React)</h3>

    {/*Inpur BOx and copy button  */}
    <div className="flex shadow rounded-lg overflow-hidden mb-4 "> 
    <input
     type="text" 
     value={Password}
     className="outline-none w-full  text-gray-700 py-1 px-3 "
     placeholder="password"
     readOnly
     ref={passwordref}
     /> 
     <button className="outline-none bg-blue-800 text-white hover:bg-black px-3 py-0.5 shrink-0 "
     onClick={copyToClipboard}
     >Copy</button>
    </div>



    {/* Bottom content Box  */}
    <div className="flex text-sm   h-9 gap-x-2">
      {/*RAnge Line */}
     <div className="flex items-center gap-x-1"> 
        <input type="range" 
        min={6}
        max={30}
        value={length}
        className="cursor-pointer text-black"
        onChange={(e)=>{setLength(e.target.value)}}
       
        />
        <label >Length :{length} </label>
      </div>

      <div className="flex items-center gap-x-1">
        <input type="checkbox" 
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setNumberAllowed((prev)=> !prev);
        }}  
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input type="checkbox" 
        defaultChecked={charAllowed}
        id="charInput"
        onChange={()=>{
          setCharAllowed((prev)=> !prev);
        }}  
        />
        <label htmlFor="charInput">Symbols</label>
      </div>


    </div>

   </div>
   </>
  )
}

export default App
