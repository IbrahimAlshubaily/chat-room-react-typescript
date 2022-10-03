import React from 'react';

export default function App() {

  return (
    <div className="App"> 
    {MessagesForm()}
    {InputField()} 
    {SubmitButton()}
    </div>
  );
}

function MessagesForm() : JSX.Element {
  return <ul id='messages' className='messages-form'>X</ul>
}

function InputField() : JSX.Element {
  return <input id='user-input' className='input-field'></input>
}

function SubmitButton() : JSX.Element {
  return <button onClick={updateMessageForm}>Submit</button>
}

function updateMessageForm() {
  const text = document.getElementById('user-input') as HTMLInputElement;
  if (text.value){
    const messages = document.getElementById('messages') as HTMLUListElement
    messages.append(text.value);
    text.value = '';
  }

}