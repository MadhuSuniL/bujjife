import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import { useSelector } from 'react-redux'
import TopicHeader from './TopicHeader'
import TopicFooter from './TopicFooter'
import Footer from '../Layout/Footer'

const CurrentTopicLayout = () => {

    const currentTopic = useSelector(state => state.store.currentTopic)

    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex-0'>
                <Header />
                <TopicHeader title={currentTopic?.name} />
            </div>
            <div className='flex-1 overflow-auto p-1'>
                <div>
                    <Outlet />
                    {/* <TopicFooter model={currentTopic} />
                <div className='mt-4 border-t-2 border-orange-600'>
                    <Footer/>
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default CurrentTopicLayout