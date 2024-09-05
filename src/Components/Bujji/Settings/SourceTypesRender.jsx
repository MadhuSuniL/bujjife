import React, { useEffect, useState } from 'react';
import { FaRobot, FaGlobe, FaFilePdf } from 'react-icons/fa'; // Icons for LLM, Web, and PDF
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSourceState } from '../../../redux/Slice';

const SourceTypesRender = () => {
    // State to track the current source and type

    const dispatch = useDispatch()
    const currentSourceState = useSelector(state => state.store.currentSource)
    const [currentSource, setCurrentSource] = useState({ ...currentSourceState });
    const setNewCurrentSource = newSource => dispatch(setCurrentSourceState({ newSource }))
    const [isSaveButtonDisable, setIsSaveButtonDisable] = useState(true)

    // Array of available sources with their options and icons
    const sources = [
        {
            type: 'llm',
            name: 'LLMs',
            icon: <FaRobot size={20} />, // Smaller icon size
            options: [
                "gemma-7b-it",
                "llama3-8b-8192",
                "llama-3.1-8b-instant",
                "llama3-groq-70b-8192-tool-use-preview",
                "llama3-70b-8192",
                "llama3-groq-8b-8192-tool-use-preview",
                // "llama-guard-3-8b",
                "llama-3.1-70b-versatile",
                "mixtral-8x7b-32768",
                "gemma2-9b-it",
            ],
        },
        {
            type: 'web',
            name: 'Web',
            icon: <FaGlobe size={20} />, // Smaller icon size
            options: ['wikipedia', 'duckduckgo', 'arxiv'],
        },
        {
            type: 'pdf',
            name: 'Pre-trained PDF',
            icon: <FaFilePdf size={20} />, // Smaller icon size
            options: [
                'pdf files content from web',
            ],
        },
    ];

    // Function to handle clicking on a source
    const handleSourceClick = (type) => {
        let defaultOption = null
        let availableOptions = sources.find(source => source.type === type).options
        defaultOption = availableOptions[0] || null
        setCurrentSource(prev => ({
            ...prev,
            type,
            source: defaultOption // Reset source when changing type
        }));
    };

    // Function to handle selecting an option
    const handleOptionClick = (option) => {
        setCurrentSource(prev => ({
            ...prev,
            source: option
        }));
    };

    // Function to handle saving settings
    const handleSave = () => {
        setNewCurrentSource(currentSource)
        setIsSaveButtonDisable(true)
    };

    // Find the selected source to show options
    const selectedSource = sources.find(source => source.type === currentSource.type);

    // Render section statement based on selected source
    const renderSectionStatement = () => {
        switch (currentSource.type) {
            case 'llm':
                return 'Select LLM from available LLM models';
            case 'web':
                return 'Select a web source from the options below';
            case 'pdf':
                return '';
            default:
                return '';
        }
    };

    useEffect(() => {
        setIsSaveButtonDisable(false)
    }, [currentSource])

    return (
        <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
            {/* Source Types */}
            <div className="flex space-x-4 mb-4 w-full justify-around">
                {sources.map((source, index) => (
                    <div
                        key={index}
                        onClick={() => handleSourceClick(source.type)}
                        className={`flex items-center cursor-pointer ${currentSource.type === source.type ? 'text-main border-b-2 pb-1 border-main' : 'text-white'
                            }`}
                    >
                        <div className={`text-3xl mr-2 ${currentSource.type === source.type ? 'icon-color' : 'text-gray-400'
                            }`}>
                            {source.icon}
                        </div>
                        <div className={`font-semibold ${currentSource.type === source.type ? 'text-main' : 'text-white'
                            }`}>
                            {source.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Section Statement */}
            <div className="m-4 mb-5 text-xs font-medium">
                {renderSectionStatement()}
            </div>

            {/* Options for Selected Source */}
            {selectedSource && selectedSource.options.length > 0 && (
                <div className="flex justify-center items-center flex-wrap space-x-4 mb-4 w-full">
                    {selectedSource.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`bg-gray-700 text-white p-2 rounded-md shadow-sm cursor-pointer mb-2 text-center ${currentSource.source === option ? 'bg-main border-2 border-main' : 'bg-gray-700'
                                }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}

            {/* Save Settings Button */}
            <div className='flex justify-end w-full p-2'>
                <button
                    onClick={handleSave}
                    disabled={isSaveButtonDisable}
                    className={isSaveButtonDisable ? "px-5 py-2 0bg-gray-500 text-xl text-white rounded-lg" : "px-4 py-2 bg-main text-white rounded-lg"}
                >
                    {
                        isSaveButtonDisable ? 'Saved!' : 'Save'
                    }
                </button>
            </div>
        </div>
    );
};

export default SourceTypesRender;
