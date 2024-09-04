import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { MdEditNote} from "react-icons/md";
import {getUserName} from '../Bujji/Functions/localStorage'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllResponses, setIsDrawerOpen, setIsNotesOpen } from '../../redux/Slice';
import { GrClearOption } from "react-icons/gr";

const Header = ({
}) => {

  const dispatch = useDispatch()
  const responses = useSelector(state => state.store.responses)  
  const setIsDrawerOpenState = () => dispatch(setIsDrawerOpen())
  const setIsNotesOpenState = () => dispatch(setIsNotesOpen())
  const clearAllResponsesState = () => dispatch(clearAllResponses())

  return (
    <div className='flex justify-between px-2 md:px-4 lg:px-5 items-center'>
      <div className='flex items-center'>
        <RiMenu2Fill onClick={setIsDrawerOpenState} size={17} className='m-1 lg:hidden icon-color' />
        <h1 className=' text-xl lg:text-2xl text-main font-extrabold lg:mt-3 m-2 lg:mx-5 font-main'>bujji</h1>
      </div>
      {
        getUserName() &&
        <div className='flex justify-between px-2 md:px-4 lg:px-5 items-center'>
          {
            responses.length ?
            <GrClearOption onClick={clearAllResponsesState} title='Clear all messages' size={20} className='cp mx-2 icon-color' />
            :
            ''
          }
          <MdEditNote onClick={setIsNotesOpenState} size={30} className='mx-2 icon-color cp' />
          <h1 className='text-sm font-bold lg:mt-3 m-2 sfont-main bg-main rounded-full p-1 px-2'>{getUserName()?.slice(0,1)?.toUpperCase()}</h1>
        </div>
      }
    </div>
  )
}

export default Header