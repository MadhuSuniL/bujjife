import React from 'react';
import { FaGoogle, FaYoutube, FaYahoo } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { BsBing } from "react-icons/bs";
import { SiDuckduckgo } from 'react-icons/si';

const SearchOptions = ({ response }) => {
  const handleSearchClick = (searchType) => {
    let url = '';
    switch (searchType) {
      case 'google':
        url = `https://www.google.com/search?q=${encodeURIComponent(response.prompt?.text)}`;
        break;
      case 'youtube':
        url = `https://www.youtube.com/results?search_query=${encodeURIComponent(response.prompt?.text)}`;
        break;
      case 'bing':
        url = `https://www.bing.com/search?q=${encodeURIComponent(response.prompt?.text)}`;
        break;
      case 'duckduckgo':
        url = `https://duckduckgo.com/?q=${encodeURIComponent(response.prompt?.text)}`;
        break;
      case 'yahoo':
        url = `https://search.yahoo.com/search?p=${encodeURIComponent(response.prompt?.text)}`;
        break;
      default:
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="relative group">
      <div className="flex-grow cursor-pointer ">
        <BiSearch className="icon-color" />
      </div>
      <div className="absolute w-[220px] hidden group-hover:block bg-gray-800 shadow-lg rounded-md mt-2 p-1 py-2 bottom-full">
        <h1 className="flex items-center p-1 hover:bg-gray-900 transform duration-300 rounded-lg dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleSearchClick('google')}>
          <FaGoogle className="mr-2 icon-color" />
          Search on Google
        </h1>
        <h1 className="flex items-center p-1 hover:bg-gray-900 transform duration-300 rounded-lg dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleSearchClick('yahoo')}>
          <FaYahoo className="mr-2 icon-color" />
          Search on Yahoo
        </h1>
        <h1 className="flex items-center p-1 hover:bg-gray-900 transform duration-300 rounded-lg dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleSearchClick('youtube')}>
          <FaYoutube className="mr-2 icon-color" />
          Search on YouTube
        </h1>
        <h1 className="flex items-center p-1 hover:bg-gray-900 transform duration-300 rounded-lg dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleSearchClick('bing')}>
          <BsBing className="mr-2 icon-color" />
          Search on Bing
        </h1>
        <h1 className="flex items-center p-1 hover:bg-gray-900 transform duration-300 rounded-lg dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleSearchClick('duckduckgo')}>
          <SiDuckduckgo className="mr-2 icon-color" />
          Search on DuckDuckGo
        </h1>
      </div>
    </div>
  );
};

export default SearchOptions;
