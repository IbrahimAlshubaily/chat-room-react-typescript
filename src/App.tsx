import './App.css'


export default function App() {

  return (
    <div className="App"> 
      {MessagesForm()}
      <div id='user-input'>
        {InputField()} 
        {SubmitButton()}
      </div>
    </div>
  );
}

function MessagesForm() : JSX.Element {
  return <ul id='messages' className='messages-form'></ul>
}

function InputField() : JSX.Element {
  return <input id='text-box' className='input-field' onKeyDown={(e) => {
    if (e.key === "Enter") {
      document.getElementById('submit-button')?.click()
    }
  }}/>
}

function SubmitButton() : JSX.Element {
  return <button id='submit-button' onClick={updateMessageForm}>Submit</button>
}

function updateMessageForm() {
  const text = document.getElementById('text-box') as HTMLInputElement;
  if (text.value){
    const messages = document.getElementById('messages') as HTMLUListElement
    const li = document.createElement('li')
    li.textContent = text.value;
    messages.append(li);
    text.value = '';
  }
}

