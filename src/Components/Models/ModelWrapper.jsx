import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiCall from '../../Axios';
import { useSelector } from 'react-redux'
import { ImSpinner9 } from "react-icons/im";
import Header from '../Layout/Header';
import TopicHeader from '../CurrentTopic/TopicHeader';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { MdRestartAlt } from "react-icons/md";
import Input from './Inputs/Input';
import RenderCustomTopic from '../../CustomTopics/RenderCustomTopic';

const TopicWrapper = (WrappedTopic) => {
    const HOC = () => {
        const { model_id } = useParams()
        const currentTopic = useSelector(state => state.store.currentTopic)
        const [inputsInfo, setinputsInfo] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [isLoading2, setIsLoading2] = useState(false);
        const [isTyping, setIsTyping] = useState(false)
        const [response, setResponse] = useState(null);
        const [inputs, setInputs] = useState({});
        const [currentInputIndex, setCurrentInputIndex] = useState(0)
        const [scrollInterval, setScrollInterval] = useState(null)
        const [isNotReadyTopic, setIsNotReadyTopic] = useState(false)

        const scrollToBottom = () => {
            let ele = document.getElementById('response-bottom');
            if (ele) {
                ele.scrollIntoView({ behavior: 'smooth' });
            }
        }

        const scrollToHeight = () => {
            let ele = document.getElementById('responses');
            if (ele) {
                ele.scrollTop = ele.scrollHeight;
            }
        }

        const restart = () => {
            setCurrentInputIndex(0)
            setResponse(null)
            setInputs({})
        }

        const next = () => {
            setCurrentInputIndex(prev => prev + 1)
            setTimeout(() => {
                scrollToHeight()
            }, 200)
        }

        const prev = () => {
            setCurrentInputIndex(prev => prev - 1)
        }

        const onSubmit = (value, key) => {
            let tempInputs = { ...inputs, [key]: value }
            setInputs(prev => ({ ...tempInputs }))
            if (currentInputIndex < inputsInfo?.length - 1) {
                next()
            }
            else {
                getOutput(tempInputs)
            }
        }

        const getOutput = (inputs) => {
            let url = `api/model/${model_id}`;
            let body = { ...inputs };
            let method = 'post';
            let loadingState = setIsLoading;

            const onSuccess = (data) => {
                setResponse(data);
            };

            const onFail = (data) => {
            };

            apiCall(url, body, method, loadingState, onSuccess, onFail);
        };

        const getInput = () => {
            let url = `api/model/${model_id}`;
            let body = {};
            let method = 'get';
            let loadingState = setIsLoading2;

            const onSuccess = (data) => {
                setIsNotReadyTopic(false)
                setinputsInfo(data);
                let defaultInputs = {};
                data.forEach(input => {
                    defaultInputs[input.key_name] = '';
                });
                setInputs(defaultInputs);
                setTimeout(() => {
                    scrollToHeight()
                }, 100)
            };

            const onFail = (data) => {
                setIsNotReadyTopic(true)
            };

            apiCall(url, body, method, loadingState, onSuccess, onFail);
        };

        useEffect(() => {
            if (isTyping) {
                setScrollInterval(setInterval(() => {
                    scrollToBottom()
                }, 100))
            }
            else {
                if (scrollInterval) {
                    clearInterval(scrollInterval)
                }
            }
        }, [isTyping])

        useEffect(() => {
            getInput();
            restart()
        }, [model_id]);

        return (
            <div className='flex flex-col h-full w-full relative'>
                <div className='flex-0'>
                    <Header />
                    <TopicHeader title={currentTopic?.name} />
                </div>
                {
                    isLoading2 ?
                        <div className='min-h-96 flex items-center justify-center'>
                            <h1 className='animate-pulse text-main flex items-center'><ImSpinner9 className='icon-color mr-2 animate-spin' size={17} /> Loading Topic...</h1>
                        </div>
                        :
                        isNotReadyTopic ?
                            <div className='min-h-96 flex items-center justify-center'>
                                <h1 className='animate-pulse text-main flex items-center'>Topic Not Ready</h1>
                            </div>
                            :
                            currentTopic?.component_name ?
                                <div id='responses' className='flex-1 overflow-auto p-1 pb-5'>
                                    <RenderCustomTopic componentName={currentTopic} />
                                </div>
                                :
                                <>
                                    <div id='responses' className='flex-1 overflow-auto p-1 pb-5'>
                                        <div className='max-w-[750px] mx-auto'>
                                            <WrappedTopic
                                                model_id={model_id}
                                                isLoading={isLoading}
                                                isTyping={isTyping}
                                                setIsTyping={setIsTyping}
                                                setIsLoading={setIsLoading}
                                                inputs={inputs}
                                                setInputs={setInputs}
                                                inputsInfo={inputsInfo}
                                                response={response}
                                                onSubmit={onSubmit}
                                                scrollToBottom={scrollToBottom}
                                                currentInputIndex={currentInputIndex}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-0'>
                                        <div className='max-w-[750px] mx-auto'>
                                            {
                                                response ?
                                                    <div className='flex items-center justify-center p-2'>
                                                        <span onClick={restart} className='flex items-center px-2 bg-main cp rounded-full p-1 text-white'>
                                                            <span className='text-sm'>
                                                                Restart Topic
                                                            </span>
                                                            <MdRestartAlt size={22} className='ml-2' />
                                                        </span>
                                                    </div>
                                                    :
                                                    <Input state={inputs} setState={setInputs} onSubmit={onSubmit} {...inputsInfo[currentInputIndex]} />
                                            }
                                        </div>
                                    </div>
                                </>
                }
                <div className='flex items-center duration-500 transition justify-end absolute bottom-20 right-0 px-2'>
                    {
                        !response &&
                        <div className='flex justify-end'>
                            {
                                currentInputIndex > 0 &&
                                <GrFormPreviousLink onClick={prev} size={30} className='bg-main cp rounded-full p-1 mx-2' />
                            }
                            {
                                currentInputIndex <= Object.values(inputs)?.filter(input => input)?.length - 1 &&
                                <GrFormNextLink onClick={next} size={30} className='bg-main cp rounded-full p-1 mx-2' />
                            }
                        </div>
                    }
                </div>
            </div>
        );
    };

    return HOC;
};

export default TopicWrapper;
