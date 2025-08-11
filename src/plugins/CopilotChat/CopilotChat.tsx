
import { useState } from 'react';

export default function CopilotChat() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'How can I help?' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify([...messages, { role: 'user', content: input }]),
    });
    const data = await res.json();
    setMessages([...messages, { role: 'user', content: input }, data.reply]);
    setInput('');
  };

  return (
    <div>
      {messages.map((m, i) => <div key={i}><strong>{m.role}:</strong> {m.content}</div>)}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
