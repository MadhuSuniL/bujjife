import React from 'react';
import { FaSearch, FaRegFileArchive, FaListUl, FaRegImages, FaLanguage } from "react-icons/fa";
import { VscWordWrap } from "react-icons/vsc";
import { BsLink45Deg } from "react-icons/bs";
import { ReactTyped } from 'react-typed';

const cells = [
  {
    title: 'Explore the Cosmos',
    describe: 'Search for topics related to galaxies, exoplanets, alien life, and more.',
    icon: <FaSearch className='mx-2 icon-color' size={20} />,
  },
  {
    title: 'Cosmic Insights',
    describe: 'Dive deep into detailed information about your selected space topic.',
    icon: <FaListUl className='mx-2 icon-color' size={18} />,
  },
  {
    title: 'Activate Cosmic Chat',
    describe: 'Engage with a specific model or data source to explore space topics.',
    icon: <BsLink45Deg className='mx-2 icon-color' size={28} />,
  },
  {
    title: 'Customized Responses',
    describe: 'Choose between LLM models like LLaMA or pre-trained PDF files to get answers tailored to your preferences.',
    icon: <VscWordWrap className='mx-2 icon-color' size={22} />,
  },
];

const Message = `Greetings, Explorer!
Welcome to Bujji's Cosmic Insights. How can I assist you in uncovering the mysteries of the universe today? Customize your experience by selecting open-source LLM models like LLaMA or Jamma, or focus on answers derived from pre-trained PDF files. The choice is yours!`

const Intro = () => {
  return (
    <div className='text-[11px]'>
      <h1 className='text-center text-main font-main font-semibold my-2 text-6xl p-2'>
        <ReactTyped strings={['Bujji']} typeSpeed={50} showCursor={false} />
      </h1>
      <div className='p-2 px-4 md:p-5 grid md:grid-cols-2 gap-5 md:gap-10 items-stretch'>
        {cells.map((cell, i) =>
          <div key={i} className='flex items-center shadow-md rounded-md p-2 hover:shadow-orange-600'>
            {cell.icon}
            <div>
              <h1 className='font-bold text-main text-[13px]'>{cell.title}</h1>
              <p className='py-2'>
                {cell.describe}
              </p>
            </div>
          </div>
        )}
      </div>
      <p className='text-xs text-gray-700 font-main text-center p-2 px-4 my-2 md:my-5 md:px-5'>{Message}</p>
    </div>
  );
}

export default Intro;
