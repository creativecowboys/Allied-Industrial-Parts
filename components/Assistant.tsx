
import React, { useState, useRef, useEffect } from 'react';
import { getTechnicalAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getTechnicalAdvice(input, messages);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-lg shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-[#003366] text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center">
              <i className="fa fa-robot mr-2"></i> Allied Technical Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-red-400">
              <i className="fa fa-times text-lg"></i>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <i className="fa fa-info-circle text-3xl mb-2"></i>
                <p className="text-sm">Ask about specs, compatibility, or find specific parts.</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => setInput("What's the difference between Grade 5 and Grade 8 bolts?")}
                    className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-blue-50"
                  >
                    Bolt Grades?
                  </button>
                  <button 
                    onClick={() => setInput("I need a wrench for 300Nm torque.")}
                    className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-blue-50"
                  >
                    High Torque Wrench
                  </button>
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 p-3 rounded-lg text-sm flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your technical question..."
                className="flex-grow text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button 
                onClick={handleSend}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
              >
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">Powered by Allied Intelligent Search</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform relative group"
        >
          <i className="fa fa-robot text-2xl"></i>
          <span className="absolute -top-12 right-0 bg-white text-[#003366] text-xs font-bold py-1 px-3 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Technical Expert Online
          </span>
        </button>
      )}
    </div>
  );
};

export default Assistant;
