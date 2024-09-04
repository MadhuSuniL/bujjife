import React, { useEffect, useState } from 'react'
import Header from '../Components/Layout/Header'
import Response from '../Components/Bujji/Response'
import Prompt from '../Components/Bujji/Prompt'
import Intro from '../Components/Bujji/Intro'
import WithWebsocketConnection from '../Wrappers/WithWebsocketConnection'
import { useDispatch, useSelector } from 'react-redux'
import { addNewResponse, addNewResponseChunk } from '../redux/Slice'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowDownOutline } from "react-icons/io5";

const CurrentChat = ({
  isConnected,
  sendQuery,
  latestResponse
}) => {

  const [redirectTopicId, setRedirectTopicId] = useState(null)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const { topic_id } = useParams()
  const topicId = topic_id || 'all'
  const responses = useSelector(state => state.store.responses)[topicId]
  const setAddNewResponse = (newResponse, topicId) => dispatch(addNewResponse({ newResponse, topicId }))
  const setNewResponseChunk = newResponseChunk => dispatch(addNewResponseChunk(newResponseChunk))
  const [prompt, setPrompt] = useState('')
  const [staticPrompt, setStaticPrompt] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [typingAllow, setTypingAllow] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [scrollInterval, setScrollInterval] = useState(null)
  const [showArrow, setShowArrow] = useState(true)




  const getResponse = (response) => {
    setIsLoading(false)
    setStaticPrompt('')
    setAddNewResponse(response, topicId)
  }
  // const getResponse = (response) => {
  //   if (response?.response === '<start>') {
  //     setIsStreaming(true)
  //   }
  //   else if (response?.response === '<end>') {
  //     setIsStreaming(false)
  //   }
  //   else {
  //     response && setNewResponseChunk(response)
  //   }
  //   // scrollToBottom()
  //   // onLoad();
  // }


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

  const handleScroll = () => {
    let ele = document.getElementById('responses');
    let ele2 = document.getElementById('main');
    if (ele) {
      const isAtBottom = ele.scrollHeight - (ele.scrollTop + ele2.scrollHeight - 100) < 0 ? true : false
      setShowArrow(!isAtBottom);
    }
  }


  const sendQueryHandler = () => {
    if (prompt.trim() !== '') {
      sendQuery({
        query: prompt,
        topic: topicId,
        model: "gemma2-9b-it"
      })
      setIsLoading(true)
      setPrompt('')
      scrollToHeight()
      scrollToBottom()
    }
  }

  useEffect(() => {
    let ele = document.getElementById('responses');
    if (ele) {
      ele.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ele) {
        ele.removeEventListener('scroll', handleScroll);
      }
    }
  }, []);


  // useEffect(() => {
  //   if (isTyping) {
  //     setScrollInterval(setInterval(() => {
  //       scrollToBottom()
  //     }, 100))
  //   }
  //   else {
  //     if (scrollInterval) {
  //       clearInterval(scrollInterval)
  //     }
  //     scrollToBottom()
  //     if (redirectTopicId) {
  //       setTimeout(() => {
  //         nav('/m/' + redirectTopicId)
  //       }, 500);
  //     }
  //   }
  // }, [isTyping])

  useEffect(() => {
    onLoad();
  }, [responses])

  useEffect(() => {
    latestResponse && getResponse(latestResponse)
  }, [latestResponse])

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
                  isTyping={isTyping}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  setStaticPrompt={setStaticPrompt}
                  getResponse={getResponse}
                  staticPrompt={staticPrompt}
                  setIsTyping={setIsTyping}
                  typingAllow={typingAllow}
                  showCursor={showCursor}
                  setShowCursor={setShowCursor}
                  isLoading={isLoading}
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
        <div className='max-w-[750px] mx-auto'>
          <Prompt
            setStaticPrompt={setStaticPrompt}
            setPrompt={setPrompt}
            prompt={prompt}
            onSubmit={sendQueryHandler}
          />
        </div>
      </div>
      <div className='flex items-center duration-500 transition justify-center absolute bottom-20 left-0 right-0'>
        {/* { showArrow && 
            <span onClick={scrollToBottom} className='cp'><IoArrowDownOutline className='bg-main text-white p-1 rounded-full' size={25}/></span>
          } */}
      </div>
    </div>
  )
}

export default WithWebsocketConnection(CurrentChat)
