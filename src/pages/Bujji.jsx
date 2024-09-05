import React, { useEffect, useState } from 'react'
import Header from '../Components/Layout/Header'
import Response from '../Components/Bujji/Response'
import Prompt from '../Components/Bujji/Prompt'
import Intro from '../Components/Bujji/Intro'
import WithWebsocketConnection from '../Wrappers/WithWebsocketConnection'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const CurrentChat = ({
  isConnected,
  isLoading,
  isStreaming,
  sendQuery,
}) => {

  const { topic_id } = useParams()
  const topicId = topic_id || 'all'
  const responses = useSelector(state => state.store.responses)[topicId]
  const currentSourceState = useSelector(state => state.store.currentSource)
  const [prompt, setPrompt] = useState('')
  const [staticPrompt, setStaticPrompt] = useState('')
  const [scrollInterval, setScrollInterval] = useState(null)



  const scrollToBottom = () => {
    let ele = document.getElementById('response-bottom');
    if (ele) {
      ele.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const scrollToHeight = () => {
    let ele = document.getElementById('responses');
    if (ele) {
      ele.scrollTop = ele.scrollHeight;
    }
  }

  const onLoad = () => {
    scrollToHeight()
  }

  const sendQueryHandler = () => {
    if (prompt.trim() !== '') {
      sendQuery({
        query: prompt,
        topic: topicId,
        source: {
          ...currentSourceState
        }
      })
      setPrompt('')
      scrollToHeight()
      scrollToBottom()
    }
  }



  useEffect(() => {
    if (isStreaming) {
      setScrollInterval(setInterval(() => {
        scrollToBottom()
      }, 100))
    }
    else {
      if (scrollInterval) {
        clearInterval(scrollInterval)
      }
      scrollToBottom()
    }
  }, [isStreaming])

  useEffect(() => {
    if (isLoading) {
      setPrompt('')
      scrollToHeight()
    }
    else {
      setStaticPrompt('')
      scrollToHeight()
    }
  }, [isLoading])

  useEffect(() => {
    onLoad();
  }, [responses])


  return (
    <div id='main' className='flex flex-col h-full w-full relative'>
      <div className='flex-0'>
        <Header />
      </div>
      <div id='responses' className='flex-1 overflow-auto pb-5'>
        <div className='max-w-[750px] mx-auto'>
          {
            responses?.length || isLoading ?
              <>
                <Response
                  responses={responses}
                  staticPrompt={staticPrompt}
                  isLoading={isLoading}
                  isStreaming={isStreaming}
                />
              </>
              :
              <>
                <Intro />
              </>
          }
        </div>
      </div>
      <div className='flex-0'>
        {
          isConnected &&
          <div className='max-w-[750px] mx-auto'>
            <Prompt
              setStaticPrompt={setStaticPrompt}
              isStreaming={isStreaming}
              isLoading={isLoading}
              setPrompt={setPrompt}
              prompt={prompt}
              onSubmit={sendQueryHandler}
            />
          </div>
        }
      </div>
      <div className='flex items-center duration-500 transition justify-center absolute bottom-20 left-0 right-0'>
        {/* { showArrow && 
            <span onClick={scrollToBottom} className='cp'><IoArrowDownOutline className='bg-main text-white p-1 rounded-full' size={25}/></span>
          } */}
      </div>
    </div >
  )
}

export default WithWebsocketConnection(CurrentChat)
