import React, { useState, useEffect } from 'react'
import { ReactTyped } from 'react-typed';
import { IoCheckmarkDone } from "react-icons/io5";
import apiCall from '../../Axios';
import { useParams } from 'react-router-dom';

const Login = ({
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal
}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [infoText, setInfoText] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [currentElement, setCurrentElement] = useState(0);
    const { redirect } = useParams()

    const handleLogin = () => {
        setCurrentElement(2)
        let url = 'api/auth/login'
        let body = { username, password }
        let method = 'post'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            setInfoText('Redirecting ...!')
            setCurrentElement(3)
            localStorage.setItem('userData', JSON.stringify(data))
            setTimeout(() => {
                window.location.href = redirect || '/'
            }, 1500)
        }
        const onFail = (data) => {
            setInfoText(data.detail)
            setCurrentElement(3)
            setTimeout(() => {
                setCurrentElement(0)
            }, 5000)
        }
        apiCall(url, body, method, loadingState, onSuccess, onFail)
    };

    const focus = (id) => {
        let ele = document.querySelector('#' + id)
        if (ele) {
            ele.focus()
        }
    }

    const elements = [
        {
            id: 'username',
            text: 'Enter your username',
            element: (
                <form onSubmit={(e) => { e.preventDefault(); setCurrentElement(1) }} className='flex items-center'>
                    <input
                        id='username'
                        className='bg-gray0-800 font-extrabold bg-transparent text-lg p-1 border-b-2 border-b-orange border-orange-600 focus:border-none outline-none'
                        value={username}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button disabled={!username} type="submit">
                        <IoCheckmarkDone size={30} className='icon-color' />
                    </button>
                </form>
            )
        },
        {
            id: 'password',
            text: 'Enter your password',
            element: (
                <form onSubmit={(e) => { e.preventDefault(); handleLogin() }} className='flex items-center'>
                    <input
                        id='password'
                        type='password'
                        className='bg-gray0-800 font-extrabold bg-transparent text-lg p-1 border-b-2 border-b-orange border-orange-600 focus:border-none outline-none'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={!password} type="submit">
                        <IoCheckmarkDone size={30} className='icon-color' />
                    </button>
                </form>
            )
        },
        {
            id: 'password',
            text: 'Checking ...!',
            element: (
                <div className='flex items-center'>

                </div>
            )
        },
        {
            id: 'not-found',
            text: infoText,
            element: (
                <div className='flex items-center'>

                </div>
            )
        }
    ];



    return (
        <div className='0bg-gray-900 p-2 rounded-lg'>
            <h1 className='text-2xl text-main text-right' >Login</h1>
            <div className='p-3 rounded-lg'>
                <h1 className='text-xl text-main font-main'>
                    <ReactTyped
                        strings={[elements[currentElement].text]}
                        typeSpeed={50}
                        showCursor
                        cursorChar='<span class="text-main mx-1">|</span>'
                    />
                </h1>
                <div className='flex justify-end'>
                    {elements[currentElement].element}
                </div>
            </div>

        </div>
    )
}

export default Login