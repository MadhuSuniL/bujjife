import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { WiStars } from "react-icons/wi";
import Footer from '../../Layout/Footer';

const Text = ({
    state,
    key_name,
    title,
    onSubmit
}) => {
  const [rows, setRows] = useState(1);
  const [text, setText] = useState('')

  const handleTextChange = (event) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = 1;

    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setRows(currentRows);
    setText(event.target.value)
  };

  // Prevent form submission on Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setRows(1);
      onSubmit(text, key_name);
      setText('')
    }
  };

  useEffect(()=>{
    const ele = document.getElementById('input-box')
    if (ele) {
      ele.focus()
    }
},[])

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(text, key_name);
          setText('')
          setRows(1);
        }}
      >
        <div className="flex justify-between items-center">
          <button
            type="button"            
            className="p-2 bg-transparent text-white rounded-full flex-shrink-0"
          >
            <WiStars className='icon-color' size={30} />
          </button>
          <textarea
              id = 'input-box'
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              rows={rows}
              placeholder={state[key_name] ?  'Update '+title : title}
              className="prompt-placeholder p-2 w-full border-b-[1.5px] bg-transparent outline-none"
              style={{ resize: 'none'}}
              required
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-transparent text-white rounded-full flex-shrink-0"
          >
            <FaPaperPlane className='icon-color' />
          </button>
        </div>
      </form>
      <div className=''>
        <Footer/>
      </div>
    </div>
  );
};

export default Text;


