// src/pages/Login.js

import React, { useState } from 'react';
import {ReactTyped} from 'react-typed';
import Header from '../Components/Layout/Header';
import Login from '../Components/Auth/Login';
import Register from '../Components/Auth/Register';

const GetStarted = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);


  const handleRegister = (e) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle registration logic here
    console.log('Register Username:', registerUsername, 'Password:', registerPassword);
  };

  return (
    <div className='h-screen'>
      <Header/>
      <div className='hidden lg:block'>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="font-main md:flex items-center justify-center p-2">
        <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-6 lg:p-4 items-center">
          <div className="p-2 md:p-4 lg:p-8 w-full lg:col-span-3">
            <h1 className="text-8xl py-2 font-main text-main font-extrabold mb-2">bujji</h1>
            <p className='text-gray-400 px-1 text-xl md:text-2xl lg:text-3xl mb-2'>Smart Wikipedia Enhancer</p>
            <p className='text-gray-400 px-1 lg:text-lg mb-2'>The AI-powered Wikipedia Chatbot for Enhanced Knowledge Retrieval and Summarization.</p>
            <div className='flex items-center py-2'>
              <button
                className='bg-main border-2 border-black text-sm mr-4 rounded-xl p-2 px-4 text-white'
                onClick={() => {
                  setShowRegisterModal(true)
                  setShowLoginModal(false)
                }}
              >
                Sign up
              </button>
              <button
                className='text-sm'
                onClick={() => {
                  setShowLoginModal(true)
                  setShowRegisterModal(false)
                }}
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="p-2 md:p-4 lg:p-8 w-full lg:col-span-4">
            {
              showLoginModal || showRegisterModal ?
              <div>
                {
                  showLoginModal && <Login 
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    showRegisterModal={showRegisterModal}
                    setShowRegisterModal={setShowRegisterModal}                  
                  />
                }
                {
                  showRegisterModal && <Register
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    showRegisterModal={showRegisterModal}
                    setShowRegisterModal={setShowRegisterModal}                  
                  />
                }
              </div>
              :
              <div className='text-xl text-main'>
                <ReactTyped
                  strings={bujjiInfo}
                  typeSpeed={50}
                  loop
                  cursorChar='<span class="text-main mx-1">|</span>'
                />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

const bujjiInfo = [
  "Bujji, an AI-powered chatbot, is expertly crafted for searching Wikipedia articles, meticulously combing through vast troves of information.",
  "It meticulously crafts concise summaries of the topics it retrieves, distilling complex information into easily digestible snippets for users.",
  "With a knack for simplification, Bujji generates organized bullet points, ensuring users grasp the key points effortlessly.",
  "Additionally, Bujji provides a plethora of reference links, inviting users on an exploration journey beyond Wikipedia's confines.",
  "Beyond basic retrieval, Bujji excels at identifying crucial keywords, streamlining information retrieval for users in a flash.",
  "Not just a conversational tool, Bujji acts as a digital librarian, archiving chat conversations for convenient future reference.",
  "Employing cutting-edge algorithms, Bujji seamlessly grants users comprehensive access to Wikipedia's wealth of knowledge.",
  "Furthermore, Bujji can extract important information like phone numbers, dates, and other key data for user convenience."
];
