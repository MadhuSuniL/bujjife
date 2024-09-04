import React from 'react';
import Footer from '../Layout/Footer';


const TopicFooter = ({ model }) => {
  return (
    <div className='bg-transparent p-4 border-orange-600 border-t-2 mt-4 '>
      <h1 className='text-xl text-main my-2'>Topic Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 flex-wrap">
        <div className="mt-2">
          <h3 className="font-semibold text-main text-sm">Name:</h3>
          <p>{model?.name || 'N/A'}</p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold text-main text-sm">Type:</h3>
          <p>{model?.type || 'N/A'}</p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold text-main text-sm">Technique:</h3>
          <p>{model?.technique || 'N/A'}</p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold text-main text-sm">Total Rows of Dataset:</h3>
          <p>{model?.total_trained_rows || 'N/A'}</p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold text-main text-sm">Accuracy:</h3>
          <p>{model?.accuracy || 'N/A'}</p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold text-main text-sm">Category:</h3>
          <p>{model?.category || 'N/A'}</p>
        </div>
        <div className="mt-2 col-span-full">
          <h3 className="font-semibold text-main text-sm">Description:</h3>
          <p className='text-xs my-2'>{model?.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default TopicFooter;
