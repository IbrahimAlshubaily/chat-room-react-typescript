import { useEffect, useState } from 'react';
import {io } from 'socket.io-client';
 
import './App.css'

const socket = io('ws://localhost:8080');

export interface SocketData { 
    id: string,
    date: string, 
    text: string,
}
type AppState = {
  messages: SocketData[],

}
export default function App() {

  const [state, setState] = useState({messages: []} as AppState);
  useEffect(() => {
    socket.on('message', msg => {
      const updatedMessages = state.messages;
      updatedMessages.push(msg);
      setState({messages: updatedMessages});
    });
  }, []);

  

  function emitMessage() {
    const text = document.getElementById('text-box') as HTMLInputElement;
    if (text.value){
      console.log('emmtiting')
      socket.emit('message', text.value);
      text.value = '';
    }
  }

  return (
    <div className="App"> 
      <MessagesForm messages = {state.messages}/>
      <div id='user-input'>
        <InputField/> 
        <SubmitButton handleClick={emitMessage}/>
      </div>
    </div>
  );
}

function formatMsg(msg: any) {
  return msg.id + " @ " + msg.date + "<br>" + msg.text;
}

function MessagesForm(props: AppState) : JSX.Element {
  return <ul id='messages' className='messages-form'>
    {props.messages.map( (msg : SocketData) => getListItem(msg))}
    </ul>
}

function getListItem(msg: SocketData) {
  const className = socket.id.substring(0,2) === msg.id ? 'my-message' : 'other-message';
  return <li id={msg.date} className={className} >{formatMsg(msg)}</li>
}

function InputField() : JSX.Element {
  return <input id='text-box' className='input-field'/>
}

type SubmitButtonProps = {
  handleClick : Function,
}
function SubmitButton(props : SubmitButtonProps) : JSX.Element {
  return <button id='submit-button' onClick={() => props.handleClick()}>Submit</button>
}



