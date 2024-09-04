import React from 'react'
import TopicList from './TopicList'

const RenderCustomTopic = ({
  currentTopic
}) => {

  const Topic = TopicList[currentTopic.component_name] || <span>Topic is not ready yet</span>

  return (
    <Topic currentTopic={currentTopic} />
  )
}

export default RenderCustomTopic