import React from 'react'
import WordTypewriter from '../Components/Bujji/Typing'

const CurrentTopic = ({
  inputs,
  isTyping,
  inputsInfo,
  currentInputIndex,
  isLoading,
  setIsTyping,
  response,
  scrollToBottom,
  onSubmit
}) => {


  return (
    <div className='p-3'>
      {
        inputsInfo?.slice(0, currentInputIndex + 1)?.map((input, index) =>
          <div key={index}>
            <div className='grid grid-cols-9 md:grid-cols-12 '>
              <div className='col-span-8 md:col-span-11'>
                <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
                {
                  currentInputIndex === index && !Object.values(inputs)[index] ?
                    <WordTypewriter
                      text={`
                        <div>
                          <p class='my-2 font-bold text-gray-500'>${input.title}</p> 
                          <p class='text-sm my-2 font-bold text-gray-500'>${input.description}</p> 
                          <p class='text-sm my-2 font-bold text-gray-500'>${input.prompt} :</p> 
                        </div>
                      `}
                      typeSpeed={10}
                      onBegin={() => setIsTyping(true)}
                      onComplete={() => { setIsTyping(false) }}
                    />
                    :
                    <div>
                      <p className='my-2 font-bold text-gray-500'>{input.title}</p>
                      <p className='text-sm my-2 font-bold text-gray-500'>{input.description}</p>
                      <p className='text-sm my-2 font-bold text-gray-500'>{input.prompt} :</p>
                    </div>
                }
              </div>
            </div>
            {
              (Object.values(inputs)[index] || (input.type === 'choice' && !isTyping)) &&
              <div className='py-2 '>
                <h1 className='font-extrabold text-lg text-main'>You</h1>
                {
                  input.type === 'choice' ?
                    <div className='flex flex-wrap items-center'>
                      {
                        input?.choices?.map((choice, index) => {
                          return <p key={index} onClick={() => {
                            !response && onSubmit(choice, input.key_name)
                          }} className={`p-1 px-2 hover:shadow-md hover:shadow-orange-600 duration-300 cp text-sm m-2 rounded-md text-gray-500 shadow-orange-600 shadow ${inputs[input.key_name] === choice ? 'bg-main text-white' : ''}`}>
                            {choice}
                          </p>
                        }

                        )
                      }
                    </div>
                    :
                    <p className='py-3'>{Object.values(inputs)[index]}</p>
                }
              </div>
            }
          </div>
        )
      }
      {
        isLoading &&
        <div>
          <div className='grid grid-cols-9 md:grid-cols-12'>
            <div className='col-span-8 md:col-span-11'>
              <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
              {cursor}
            </div>
          </div>
        </div>
      }
      {/* actuall response */}
      {
        response &&
        <div className='grid grid-cols-9 md:grid-cols-12 pb-5'>
          <div className='col-span-8 md:col-span-11'>
            <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
            <WordTypewriter
              text={response?.output?.statement}
              typeSpeed={50}
              onBegin={() => setIsTyping(true)}
              onComplete={() => {
                setIsTyping(false)
              }
              }
            />
          </div>
        </div>
      }

      <span id='response-bottom' className='mt-3'></span>
    </div>
  )
}

export default CurrentTopic


const cursor = <div className='animate-pulse'>
  <div className='h-[17px] bg-gradient-to-t from-orange-800 to-orange-300 rounded-full w-[17px]' />
</div>


