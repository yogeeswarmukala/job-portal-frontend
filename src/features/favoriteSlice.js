
import { createSlice } from "@reduxjs/toolkit";

// Get saved favorites from localStorage
const getSavedFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

const favoriteSlice = createSlice({
  name: "favorites",

  initialState: getSavedFavorites(),

  reducers: {

    // ADD FAVORITE JOB
    addFavorite: (state, action) => {

      const selectedJob = action.payload;

      // Prevent duplicate favorite jobs
      const alreadyExists = state.some(
        job => String(job.id) === String(selectedJob.id)
      );

      if (!alreadyExists) {
        state.push(selectedJob);
      }

      // Save updated favorites
      localStorage.setItem(
        "favorites",
        JSON.stringify(state)
      );
    },

    // REMOVE FAVORITE JOB
    removeFavorite: (state, action) => {

      const updatedFavorites = state.filter(
        job => String(job.id) !== String(action.payload)
      );

      // Update localStorage
      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    },

    // CLEAR ALL FAVORITES
    clearFavorites: () => {

      localStorage.removeItem("favorites");

      return [];
    }

  }
});

// Export actions
export const {
  addFavorite,
  removeFavorite,
  clearFavorites
} = favoriteSlice.actions;

// Export reducer
export default favoriteSlice.reducer;
