import './App.css';
import { TextBox } from './components/TextBox';
import { GPTcall } from './api/openAiCall';
import { useReducer, useState } from 'react';

function App() {

  function reducer(state,action){
    return {chat:[...state.chat,action.payload]}
  }

  const [loading,setLoading]  = useState(false)
  const [state,dispatch] = useReducer(reducer,{chat:[]});

  async function submitted(text,textbox){
    if(text ==="" || !text.replace(/\s/g, '').length ){
      console.log("Empty");
    }
    else{
      GPTcall(text,dispatch,loading,setLoading);
      dispatch({payload:{
        type : "user",
        message :  text
      }})
    }
    
    textbox.value = '';
  }

  return (
    <div className="App">
        <h1>ChatGPT Clone</h1>
        <div className="container-lg bg-light" style={{"height":"800px"}}>
          <input type="text"  style={{"width":"100%"}} onKeyUp = {(e)=>{
            if(e.key === "Enter" ){
              submitted(e.target.value,e.target);
            }
          }} ></input>
          {state.chat.map((ele,index)=>{
            return(
              <TextBox key = {index+ele.type} type  = {ele.type} message={ele.message}/>
            )
          })}
          {loading?<h1>Loading</h1>:<div></div>}
        </div>
    </div>
  );
}

export default App;
