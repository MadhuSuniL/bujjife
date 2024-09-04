import React, { useEffect, useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { WiStars } from "react-icons/wi";
import Footer from '../Layout/Footer';

const Prompt = ({ setStaticPrompt, setPrompt, prompt, onSubmit, isStreaming, isLoading }) => {
  const [rows, setRows] = useState(1);
  const [showPrompts, setShowPrompts] = useState(false);
  const promptsRef = useRef(null);

  const handleShowPrompts = () => {
    setShowPrompts(prev => !prev);
  };

  const handleTextChange = (event) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = 1; // Reset number of rows in the textarea

    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setRows(currentRows);
    setPrompt(event.target.value);
    setStaticPrompt(event.target.value);
  };

  const goForSubmit = () => {
    if (prompt.trim() !== '' && !isStreaming && !isLoading) {
      setRows(1);
      onSubmit();
    }
  };

  // Prevent form submission on Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      goForSubmit();
    }
  };

  const handlePromptSelection = (selectedPrompt) => {
    setPrompt(selectedPrompt);
    setStaticPrompt(selectedPrompt);
    setShowPrompts(false); // Close the prompts menu after selecting a prompt
  };

  useEffect(() => {
    const ele = document.getElementById('input-box')
    if (ele) {
      ele.focus()
    }

    // Event listener to close prompts menu when clicking outside
    function handleClickOutside(event) {
      if (promptsRef.current && !promptsRef.current.contains(event.target)) {
        setShowPrompts(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <div className="">
      {
        showPrompts &&
        <HelpPrompts onSelectPrompt={handlePromptSelection} ref={promptsRef} />
      }
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goForSubmit();
        }}
      >
        <div className="flex justify-between items-center">
          <button
            type="button" // Change to button type to prevent form submission
            onClick={handleShowPrompts}
            className="p-2 bg-transparent text-white rounded-full flex-shrink-0"
          >
            <WiStars className='icon-color' size={30} />
          </button>
          <textarea
            id='input-box'
            value={prompt}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder="Message to Bujji..."
            className="prompt-placeholder p-2 w-full border-b-[1.5px] bg-transparent outline-none"
            style={{ resize: 'none', overflow: 'hidden' }}
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-transparent text-white rounded-full flex-shrink-0"
            disabled={prompt.trim() === '' || isStreaming || isLoading}
          >
            <FaPaperPlane className='icon-color' />
          </button>
        </div>
      </form>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default Prompt;


const HelpPrompts = React.forwardRef(({ onSelectPrompt }, ref) => {
  const prompts = [
    "Explain the concept of black holes in simple terms.",
    "What are the differences between a black hole and a white hole?",
    "How does Hawking radiation affect black holes?",
    "Describe the formation and structure of neutron stars.",
    "What is the significance of the Event Horizon Telescope?"
  ];

  return (
    <div ref={ref} className='text-gray-300 relative text-sm bg-gray-800 rounded-md p-2'>
      {prompts.map((prompt, index) => (
        <div key={index} className='py-2 cp hover:bg-gray-700 rounded-lg duration-200 transition flex' onClick={() => onSelectPrompt(prompt)}>
          <WiStars className='icon-color mr-2' size={20} />
          {prompt}
        </div>
      ))}
    </div>
  )
});
