import React, {useState} from 'react';
import { BiCopy } from "react-icons/bi";
import { IoCheckmarkDone } from "react-icons/io5";

const Copy = ({ handleMouseEnter, handleMouseLeave, response }) => {

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(response?.text || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Change back after 2 seconds
  };

  return (
    <div
      className="flex-grow cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {copied ? (
        <IoCheckmarkDone className="icon-color" />
      ) : (
        <BiCopy onClick={handleCopy} className="icon-color" /> // Change this to your other icon when not copied
      )}
    </div>
  );
};

export default Copy;
