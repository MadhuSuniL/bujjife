import React, { useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { WiStars } from "react-icons/wi";
import Footer from '../../Layout/Footer';

const Number = ({ state, title, key_name, onSubmit }) => {


  useEffect(() => {
    const ele = document.getElementById('input-box');
    if (ele) {
      ele.focus();
    }
  }, []);

  return (
    <div className="">
      <form
        onSubmit={(f) => {
          f.preventDefault();
          let inputElement = f.target.elements[1];
          let value = parseFloat(inputElement.value)
          f.target.reset();
          onSubmit(value, key_name);
        }}
      >
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="p-2 bg-transparent text-white rounded-full flex-shrink-0"
          >
            <WiStars className='icon-color' size={30} />
          </button>
          <input
            id='input-box'
            type='number'
            step={'0.00000000000001'}
            placeholder={state[key_name] ?  'Update '+title : title}
            className="prompt-placeholder p-2 w-full border-b-[1.5px] bg-transparent outline-none"
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
        <Footer />
      </div>
    </div>
  );
};

export default Number;
