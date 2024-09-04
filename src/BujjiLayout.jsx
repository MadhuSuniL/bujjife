import React from 'react'
import { Outlet} from 'react-router-dom'
import SideBar from './Components/Layout/SideBar'
import Notes from './Components/Layout/Notes'
import { useSelector } from 'react-redux'

const BujjiLayout = () => {

    const isDrawerOpen = useSelector(state => state.store.isDrawerOpen)
    const isNotesOpen = useSelector(state => state.store.isNotesOpen)


  return (
    <div className='flex h-screen font-main'>
        <div>
          <SideBar 
            isDrawerOpen = {isDrawerOpen} 
          />
        </div>
        <div className='p-1 bg-[#212121] w-full'>
          <Outlet/>
        </div>
        <div>
          <Notes 
            isNotesOpen = {isNotesOpen} 
          />
        </div>
    </div>
  )
}

export default BujjiLayout