import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: {
    username: null,
    token: null,
  },
  responses: {
    "all": [],
    "galaxies": [],
    "milky_way": [],
    "dark_galaxies": [],
    "planets": [],
    "exoplanets": [],
    "rogue_planets": [],
    "stars": [],
    "supernovae": [],
    "pulsars": [],
    "quasars": [],
    "black_holes": [],
    "wormholes": [],
    "cosmic_microwave_background": [],
    "dark_matter": [],
    "dark_energy": [],
    "cosmic_rays": [],
    "gamma_ray_bursts": [],
    "space_exploration": [],
    "voyager_missions": [],
    "space_telescopes": [],
    "international_space_station": [],
    "spacecraft_propulsion": [],
    "alien_life": [],
    "fermi_paradox": [],
    "drake_equation": [],
    "multiverse": [],
    "nebulae": [],
    "the_big_bang": [],
    "gravitational_waves": [],
    "space_time": [],
    "space_weather": [],
    "interstellar_medium": [],
    "hubble_telescope": [],
    "cosmic_strings": [],
    "meteorites": [],
    "space_colonization": [],
    "asteroids": [],
    "comets": []
  },
  currentSource: {
    type: "llm",
    source: "gemma2-9b-it"
  },
  isDrawerOpen: false,
  isNotesOpen: false,
  recentTopics: [],
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    // User authentication
    login: (state, action) => {
      const newFilters = action.payload;
      state.userDetails = { ...newFilters };
    },
    logout: (state) => {
      state.userDetails = { ...initialState.userDetails };
    },

    addNewResponse: (state, action) => {
      const { newResponse, topicId } = action.payload;
      state.responses[topicId].push(newResponse);
    },
    addNewResponseChunk: (state, action) => {
      const { newResponseChunk, topicId } = action.payload;
      let index = state.responses[topicId].findIndex(response => response.id === newResponseChunk.id)
      if (index !== -1) {
        state.responses[topicId][index].content += newResponseChunk.content
      }
      else {
        state.responses[topicId].push({ ...newResponseChunk })
      }
    },
    clearAllResponses: (state) => {
      state.responses = [];
    },
    setCurrentSourceState: (state, action) => {
      const { newSource } = action.payload
      state.currentSource = { ...newSource }
    },
    // Current model management
    setCurrentTopic: (state, action) => {
      const currentTopic = action.payload;
      state.currentTopic = currentTopic;
    },
    clearCurrentTopic: (state) => {
      state.currentTopic = null;
    },

    // Drawer and notes management
    setIsDrawerOpen: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setIsNotesOpen: (state) => {
      state.isNotesOpen = !state.isNotesOpen;
    },

    // Recent models management
    addNewRecentTopic: (state, action) => {
      const newTopic = action.payload;

      // Check for duplicates
      if (!state.recentTopics.some(model => model?.id === newTopic?.id) && newTopic) {
        if (state.recentTopics.length >= 10) {
          state.recentTopics.pop(); // Remove the last model if there are 10
        }
        state.recentTopics.unshift(newTopic); // Add new model to the beginning
      }
    },
  },
});

export const {
  login,
  logout,
  addNewResponse,
  addNewResponseChunk,
  clearAllResponses,
  setCurrentTopic,
  clearCurrentTopic,
  setIsDrawerOpen,
  setIsNotesOpen,
  addNewRecentTopic,
  setCurrentSourceState
} = Slice.actions;

export default Slice.reducer;
