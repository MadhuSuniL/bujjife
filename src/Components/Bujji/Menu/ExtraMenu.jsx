import React, { useState } from 'react';
import Copy from './Copy';
import SaveAsTxt from './SaveAsTxt';
import TextOperations from './TextOperations';
import SearchOptions from './SearchOptions';

const ExtraMenu = ({response, getResponse, setStaticQuery, setQuery}) => {

  const icons = [
    { component: Copy, title: 'Copy' },
    { component: SaveAsTxt, title: 'Save as .txt' },
    // { component: TextOperations, title: 'Text Operations' },
    { component: SearchOptions, title: 'Search Options' },
  ];

  const [showTitle, setShowTitle] = useState(false);
  const [activeIconIndex, setActiveIconIndex] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = (index) => {
    if (!dropdownOpen) {
      setShowTitle(true);
      setActiveIconIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setShowTitle(false);
    setActiveIconIndex(null);
  };

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  return (
    <div className="w-full py-2 pb-4">
      <div className="w-52 p-1 rounded-md flex">
        {icons.map((iconData, index) => {
          const IconComponent = iconData.component;
          return (
            <div
              key={iconData.title}
              className={`me-1 cursor-pointer hover:bg-[#121418] p-2 rounded-lg  ${
                activeIconIndex === index ? 'text-blue-500' : ''
              }`}
              style={{ position: 'relative' }}
            >
              <IconComponent
                response = {response}
                showTitle={showTitle}
                setQuery = {setQuery}
                setStaticQuery={setStaticQuery}
                handleMouseEnter={() => handleMouseEnter(index)}
                handleMouseLeave={handleMouseLeave}
                handleDropdownToggle={handleDropdownToggle}
                getResponse = {getResponse}
              />
              {showTitle && activeIconIndex === index && !dropdownOpen && (
                <div className="absolute w-36 top-7 left-0 bg-gray-800 text-white px-2 py-1 rounded-md text-sm font-light">
                  {iconData.title}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtraMenu;
