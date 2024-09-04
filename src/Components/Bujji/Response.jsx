import React from 'react'
import WordTypewriter from './Typing'
import ReactMarkdown from 'react-markdown'

const Response = ({
  responses,
  staticPrompt,
  typingAllow,
  setIsTyping,
  showCursor,
  setShowCursor,
  isLoading,
}) => {


  return (
    <div className='p-3'>
      {
        responses?.map((response, index) =>
          <div key={index}>
            {
              response?.query &&
              <div className='grid grid-cols-9 md:grid-cols-12 '>
                <div className='col-span-8 md:col-span-11'>
                  <h1 className='font-extrabold text-lg text-main font-main'>You</h1>
                  <p className='py-3 '>{response?.query}</p>
                </div>
              </div>
            }
            <div className='py-2 '>
              <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
              <div>
                <ReactMarkdown>
                  {response?.content}
                </ReactMarkdown>
              </div>
            </div>
            {/* <div className='py-2 '>
              <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
              {index === responses?.length - 1 && typingAllow && showCursor ? (
                <WordTypewriter
                  text={String(response?.response)}
                  typeSpeed={10}
                  onBegin={() => setIsTyping(true)}
                  animate
                  onComplete={() => {
                    setIsTyping(false)
                    setShowCursor(false)
                  }
                  }
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: response?.response }} />
              )}
            </div> */}
          </div>
        )
      }
      {
        isLoading &&
        <div>
          <div className='grid grid-cols-9 md:grid-cols-12 '>
            <div className='col-span-8 md:col-span-11'>
              <h1 className='font-extrabold text-lg text-main font-main'>You</h1>
              <p className='py-3'>{staticPrompt}</p>
            </div>
          </div>
          <div className='grid grid-cols-9 md:grid-cols-12'>
            <div className='col-span-8 md:col-span-11'>
              <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
              {cursor}
            </div>
          </div>
        </div>
      }

      <span id='response-bottom'></span>
    </div>
  )
}

export default Response


const cursor = <div className='animate-pulse'>
  <div className='h-[17px] bg-gradient-to-t from-orange-800 to-orange-300 rounded-full w-[17px]' />
</div>