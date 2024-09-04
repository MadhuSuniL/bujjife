import React, { useEffect, useState } from 'react'
import Text from './Text';
import Number from './Number';

const Input = ({
  ...props
}) => {

  return (
    <div className="">
        {
          props.type === 'choice' ?
          ''
          : 
          props.type === 'text'? <Text {...props} /> : <Number {...props} />
        }
    </div>
  )
}

export default Input