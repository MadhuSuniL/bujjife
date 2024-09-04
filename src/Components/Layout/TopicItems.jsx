import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { PiSpinnerGapBold } from "react-icons/pi";
import { useSelector, useDispatch } from 'react-redux';
import { addNewRecentTopic } from '../../redux/Slice';

const TopicItems = ({
    dispatch,
    setCurrentTopic,
    clearCurrentTopic
}) => {
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate();
    const spaceTopics = [...initialSpaceTopics]
    const totalTopics = spaceTopics.length;
    const recentTopics = useSelector(state => state.store.recentTopics);
    const addNewRecentTopicState = (topic) => dispatch(addNewRecentTopic(topic));
    const { topic_id } = useParams();

    const scrollToTop = () => {
        let ele = document.getElementById('spaceTopics');
        if (ele) {
            ele.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavigate = (id) => {
        nav(`/t/${id}`);
    };

    const isActiveCategory = (category) => {
        return spaceTopics[category].some(topic => topic.topic_id === topic_id);
    };

    const getFilteredTopics = () => {
        if (!searchText) return spaceTopics;

        const filteredTopics = {};

        Object.keys(spaceTopics).forEach(category => {
            const filtered = spaceTopics[category].topics.filter(topic =>
                topic.title.toLowerCase().includes(searchText.toLowerCase())
            );
            if (filtered.length > 0) {
                filteredTopics[category] = {
                    ...spaceTopics[category],
                    topics: filtered
                };
            }
        });

        return filteredTopics;
    };

    useEffect(() => {
        scrollToTop();
        if (topic_id) {
            let allTopics = Object.values(spaceTopics).flatMap(category => category.topics);
            let currentTopic = allTopics.find(topic => topic.topic_id === topic_id);
            dispatch(setCurrentTopic(currentTopic));
            dispatch(addNewRecentTopicState(currentTopic));
        } else {
            dispatch(clearCurrentTopic(null));
        }
    }, [topic_id, spaceTopics, dispatch]);

    const filteredTopics = getFilteredTopics();

    return (
        <>
            {totalTopics !== 0 && (
                <div className='flex-0 relative px-2'>
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder={`Search Topic..`}
                        className='text-xs pl-5 prompt-placeholder my-2 bg-transparent p-2 w-full border-orange-600 outline-none hover:outline-none'
                    />
                    <IoSearch className='absolute top-2 right-100 mt-2 mr-2 text-gray-600 opacity-50' size={15} />
                </div>
            )}
            <div className='flex-1 overflow-auto px-1'>
                <span id='spaceTopics' className='opacity-0 h-0'></span>
                <div className='grid grid-rows-1 duration-300 transition'>
                    {recentTopics.length !== 0 && (
                        <div>
                            <div className='py-2 font-main'>
                                <span className='text-xs text-main'>Recent</span>
                            </div>
                            <div className='grid grid-rows-1 duration-300 transition'>
                                {recentTopics.map((topic, index) => (
                                    <div
                                        id={topic?.topic_id}
                                        onClick={() => handleNavigate(topic.topic_id)}
                                        key={index}
                                        className={`flex justify-between p-2 px-1 cp hover:bg-gray-900 bg-opacity-35 rounded-lg duration-200 transition ${topic_id === topic?.topic_id ? 'bg-gray-600' : ''}`}
                                    >
                                        <div className='w-full'>
                                            <span className='truncate'>{topic?.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {Object.keys(filteredTopics).map((category, index) => (
                        <div key={index}>
                            <div className='py-2 font-main'>
                                <span className='text-xs text-main'>{filteredTopics[category]?.category}</span>
                            </div>
                            <div className='grid grid-rows-1 duration-300 transition'>
                                {filteredTopics[category]?.topics?.map((topic, index) => (
                                    <div
                                        id={topic?.topic_id}
                                        onClick={() => handleNavigate(topic?.topic_id)}
                                        key={index}
                                        className={`flex justify-between p-2 px-1 cp hover:bg-gray-900 bg-opacity-35 rounded-lg duration-200 transition ${topic_id === topic?.topic_id ? 'bg-gray-600' : ''}`}
                                    >
                                        <div className='w-full truncate'>
                                            <span className='truncate'>{topic?.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {totalTopics === 0 && !isLoading && (
                    <div className='flex justify-center items-center h-full'>
                        <h1 className='text-gray-700 font-main'>No spaceTopics</h1>
                    </div>
                )}
                {isLoading && (
                    <div className='flex justify-center items-center h-full'>
                        <PiSpinnerGapBold size={20} className='animate-spin icon-color' />
                    </div>
                )}
            </div>
        </>
    );
};

export default TopicItems;


const initialSpaceTopics = [
    // {
    //   category: "General",
    //   topics: [
    //     { topic_id: null, title: "Everything About Space", responses: [] }
    //   ]
    // },
    {
        category: "Galaxies",
        topics: [
            {
                topic_id: "galaxies", title: "Galaxies", responses: []
            },
            { topic_id: "milky_way", title: "The Milky Way", responses: [] },
            { topic_id: "dark_galaxies", title: "Dark Galaxies", responses: [] }
        ]
    },
    {
        category: "Planets",
        topics: [
            { topic_id: "planets", title: "Planets", responses: [] },
            { topic_id: "exoplanets", title: "Exoplanets", responses: [] },
            { topic_id: "rogue_planets", title: "Rogue Planets", responses: [] }
        ]
    },
    {
        category: "Stars",
        topics: [
            { topic_id: "stars", title: "Stars", responses: [] },
            { topic_id: "supernovae", title: "Supernovae", responses: [] },
            { topic_id: "pulsars", title: "Pulsars", responses: [] },
            { topic_id: "quasars", title: "Quasars", responses: [] },
            { topic_id: "black_holes", title: "Black Holes", responses: [] },
            { topic_id: "wormholes", title: "Wormholes", responses: [] }
        ]
    },
    {
        category: "Cosmic Phenomena",
        topics: [
            { topic_id: "cosmic_microwave_background", title: "Cosmic Microwave Background", responses: [] },
            { topic_id: "dark_matter", title: "Dark Matter", responses: [] },
            { topic_id: "dark_energy", title: "Dark Energy", responses: [] },
            { topic_id: "cosmic_rays", title: "Cosmic Rays", responses: [] },
            { topic_id: "gamma_ray_bursts", title: "Gamma-Ray Bursts", responses: [] }
        ]
    },
    {
        category: "Space Exploration",
        topics: [
            { topic_id: "space_exploration", title: "Space Exploration", responses: [] },
            { topic_id: "voyager_missions", title: "Voyager Missions", responses: [] },
            { topic_id: "space_telescopes", title: "Space Telescopes", responses: [] },
            { topic_id: "international_space_station", title: "International Space Station", responses: [] },
            { topic_id: "spacecraft_propulsion", title: "Spacecraft Propulsion", responses: [] }
        ]
    },
    {
        category: "Life and the Universe",
        topics: [
            { topic_id: "alien_life", title: "Alien Life", responses: [] },
            { topic_id: "fermi_paradox", title: "The Fermi Paradox", responses: [] },
            { topic_id: "drake_equation", title: "The Drake Equation", responses: [] },
            { topic_id: "multiverse", title: "The Multiverse", responses: [] }
        ]
    },
    {
        category: "Miscellaneous",
        topics: [
            { topic_id: "nebulae", title: "Nebulae", responses: [] },
            { topic_id: "the_big_bang", title: "The Big Bang", responses: [] },
            { topic_id: "gravitational_waves", title: "Gravitational Waves", responses: [] },
            { topic_id: "space_time", title: "Space-Time", responses: [] },
            { topic_id: "space_weather", title: "Space Weather", responses: [] },
            { topic_id: "interstellar_medium", title: "Interstellar Medium", responses: [] },
            { topic_id: "hubble_telescope", title: "The Hubble Space Telescope", responses: [] },
            { topic_id: "cosmic_strings", title: "Cosmic Strings", responses: [] },
            { topic_id: "meteorites", title: "Meteorites", responses: [] },
            { topic_id: "space_colonization", title: "Space Colonization", responses: [] },
            { topic_id: "asteroids", title: "Asteroids", responses: [] },
            { topic_id: "comets", title: "Comets", responses: [] }
        ]
    }
]