import React, {useState} from 'react';
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";

const SaveAsTxt = ({ handleMouseEnter, handleMouseLeave, response }) => {

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    const blob = new Blob([response?.text || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${response?.response_data?.title || ''}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Change back the icon after 2 seconds
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="flex-grow cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        saved? (
          <IoCheckmarkDone className="icon-color" />
        ) : (
          <MdOutlineSaveAlt onClick={handleSave} className="icon-color" />
        )
      }
    </div>
  );
};

export default SaveAsTxt;
