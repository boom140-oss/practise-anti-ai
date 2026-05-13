import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Send, Sparkles } from 'lucide-react';
import './App.css';

// 환경변수에서 API 키 가져오기
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '안녕하세요! Gemini 1.5 Pro 기반 AI 비서입니다. 무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 새로운 메시지가 추가될 때마다 아래로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !apiKey || apiKey.includes('이곳에')) {
      if (!apiKey || apiKey.includes('이곳에')) {
         alert('프로젝트 폴더의 .env.local 파일에 올바른 VITE_GEMINI_API_KEY를 설정해주세요!');
      }
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // 무료 API 키에서 사용 가능한 가장 빠르고 강력한 최신 모델인 Gemini 2.5 Flash를 사용합니다
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      // API 호출
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', text }]);
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      setMessages(prev => [...prev, { role: 'bot', text: '오류가 발생했습니다. 개발자 도구(F12) 콘솔이나 API 키를 확인해주세요.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <Sparkles size={28} color="#9b87f5" />
        <h1>Gemini AI</h1>
      </header>

      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="bubble">
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="bubble">
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Gemini에게 질문해보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          autoFocus
        />
        <button 
          className="send-button" 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
