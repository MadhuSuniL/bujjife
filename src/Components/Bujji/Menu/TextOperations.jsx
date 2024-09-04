import React from 'react';
import { MdFormatListBulleted } from 'react-icons/md';
import { TfiShortcode } from 'react-icons/tfi';
import { WiStars } from "react-icons/wi";
import { AiOutlineTag, AiOutlineFieldTime, AiOutlineHighlight } from 'react-icons/ai';
import { BiCommentDetail, BiSearchAlt2 } from 'react-icons/bi';
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { VscReferences } from "react-icons/vsc";

const TextOperations = ({getResponse, setStaticQuery, setQuery }) => {
  const handleOperationClick = (operation) => {
    setStaticQuery(operation)
    setQuery(operation)
    getResponse(operation);
  };

  return (
    <div className="relative group">
      <div className="flex-grow cursor-pointer ">
        <WiStars size={20} className="" />
      </div>
      <div className="absolute w-[200px] hidden group-hover:block  shadow-lg rounded-md p-1 py-2 bottom-full">
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('Summary')}>
          <TfiShortcode className="mr-2" />
          Summary  
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('Bullet Points')}>
          <MdFormatListBulleted className="mr-2" />
          Bullet Points
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('Describe')}>
          <AiOutlineHighlight className="mr-2" />
          Describe
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('Keywords')}>
          <AiOutlineTag className="mr-2" />
          Keywords
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('References')}>
          <VscReferences className="mr-2" />
          References
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('Named Entities')}>
          <BiCommentDetail className="mr-2" />
          Named Entities
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('More Information')}>
          <MdOutlineSettingsSuggest className="mr-2" />
          More Information
        </h1>
        <h1 className="flex items-center w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleOperationClick('Suggest More')}>
          <MdOutlineSettingsSuggest className="mr-2" />
          Suggest More
        </h1>
      </div>
    </div>
  );
};

export default TextOperations;
