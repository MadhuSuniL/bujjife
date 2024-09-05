import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useInView } from 'react-intersection-observer';
import { LiaSpinnerSolid } from "react-icons/lia";

const Response = ({
  responses,
  staticPrompt,
  isLoading,
  isStreaming
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1
  });

  return (
    <div className='p-3 relative'>
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
            <div className='py-2'>
              <h1 className='font-extrabold text-lg text-main font-main mb-2'>bujji</h1>
              <div className={`${isStreaming ? 'animate-pulse' : ''} ${response.success ? '' : 'p-3 animate-pulse rounded-lg border-2 border-red-700'}`}>
                <ReactMarkdown>
                  {response?.content}

                </ReactMarkdown>
              </div>
            </div>
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
      {/* {
        inView &&
        <ScrollBottom />
      } */}
      <span ref={ref} id='response-bottom'></span>
    </div>
  )
}

export default Response


const cursor = <div className='flex h-full items-center justify-center'>
  <LiaSpinnerSolid className='animate-spin icon-color text-2xl text-center' />
</div>

// const cursor = <div className='animate-spin'>
//   <LiaSpinnerSolid />
//   {/* <div className='h-[17px] bg-gradient-to-t from-orange-800 to-orange-300 rounded-full w-[17px]' /> */}
// </div>