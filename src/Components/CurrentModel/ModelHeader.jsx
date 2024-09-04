import React from 'react'

const TopicHeader = ({
  title
}) => {
  return (
    <div className='p-1 py-0'>
      <h1 className='text-xl text-center m-2 my-0 mb-2 text-main font-bold'>{title}</h1>
    </div>
  )
}

export default TopicHeader