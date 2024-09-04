import React from 'react';

function NotFound() {
  return (
    <div className="font-main text-main h-screen flex flex-col items-center justify-center">
      <div className="flex flex-wrap line-height-48">
        <h1 className="text-3xl pr-8 border-r-2 border-solid border-black ">404</h1>
        <div className="inline-block m-2">
          <h2 className="text-base font-normal">This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
