import React, { useState, useEffect, useRef } from 'react';
import { WiStars } from "react-icons/wi";
import { BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { getUserName } from '../Bujji/Functions/localStorage';
import { CgRename } from "react-icons/cg";
import { MdOutlineDelete } from "react-icons/md";
import { setIsDrawerOpen } from '../../redux/Slice';
import apiCall from '../../Axios';
import TopicItems from './TopicItems';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentTopic, clearCurrentTopic } from '../../redux/Slice';

const SideBar = ({
  isDrawerOpen,
}) => {

  const setIsDrawerOpenState = () => dispatch(setIsDrawerOpen())
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const nav = useNavigate()
  const { model_id } = useParams()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = `/get-started`;
  }


  const gotoBujji = () => {
    dispatch(clearCurrentTopic())
    return nav(`/`)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const toggleMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };



  return (
    <>
      {profileMenuOpen && (
        <div ref={profileMenuRef} className="absolute bottom-16 left-0 z-30 mt-2 w-60 bg-gray-800 border-gray-200 rounded shadow-lg">
          {/* Dropdown menu content */}
          <ul className="py-1">
            <li className="flex items-center hover:bg-gray-600 rounded-lg m-2 px-4 py-2 cursor-pointer">
              <CiSettings className="mr-2 icon-color" size={20} />
              Settings
            </li>
            <li onClick={handleLogout} className="flex items-center hover:bg-gray-600 rounded-lg m-2 px-4 py-2 cursor-pointer">
              <BiLogOut className="mr-2 icon-color" size={20} />
              Logout
            </li>
          </ul>
          <div onClick={toggleMenu}></div>
        </div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-80 lg:w-64 text-sm bg-[#121418] transform transition-transform duration-300 z-10 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static`}
      >
        <div className="flex flex-col h-full p-1">
          {/* Header */}
          <div className='flex-0 pt-1 pb-2'>
            <div onClick={gotoBujji} className='flex cp hover:bg-gray-900 rounded-lg justify-between items-center p-2 px-5 mx-3'>
              <h1 className='text-main text-lg font-main font-extrabold'>bujji</h1>
              <WiStars className='icon-color' size={25} />
            </div>
          </div>
          {/* models */}
          <TopicItems dispatch={dispatch} setCurrentTopic={setCurrentTopic} clearCurrentTopic={clearCurrentTopic} />
          {/* Footer */}
          <div className='flex-0 p-3 py-4 relative'>
            <h1 className='flex justify-between text-main font-main font-extrabold items-center hover:bg-gray-900 p-2 px-1 rounded-lg cp' onClick={toggleMenu}>
              @{getUserName()}<IoMdArrowDropdown className='icon-color' size={20} />
            </h1>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={setIsDrawerOpenState}
        >
        </div>
      )}
    </>
  );
};

export default SideBar;


