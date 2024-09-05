import React from 'react'
import SourceTypesRender from './SourceTypesRender'

const Source = () => {
    return (
        <div className='shadow-md shadow-orange-600 rounded-md p-2'>
            <h2 className="text-lg font-semibold mb-4">Source</h2>
            <SourceTypesRender />
        </div>
    )
}

export default Source