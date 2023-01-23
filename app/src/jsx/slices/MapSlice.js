import { createSlice } from '@reduxjs/toolkit';

// Fetching map initial position and zoom from URL
const queryParameters = new URLSearchParams(window.location.search)
var initialStateCenterX, initialStateCenterY, initialStateCenterZ
if (queryParameters.get("x") && queryParameters.get("y") && queryParameters.get("z")) {
    initialStateCenterX = queryParameters.get("x")
    initialStateCenterY = queryParameters.get("y")
    initialStateCenterZ = queryParameters.get("z")
}
else {
    initialStateCenterX = 18.411385
    initialStateCenterY = 25.850485
    initialStateCenterZ = 1.766200
}

// Setting initial state variables
const initialState = {
    center: {
        x: initialStateCenterX,
        y: initialStateCenterY,
        z: initialStateCenterZ
    }
};

// This slice handle map URL changes
export const mapSlice = createSlice({
    name: 'Map',
    initialState,

    reducers: {

        /*
        => Adds "newLayer" to App
            action.payload = {
                layer: layer,
                style: style
            }
        */
        setMapLocation: (state, action) => {
            
            // Update window URL
            const nextURL = new URL(window.location.href)
            
            nextURL.searchParams.set('x', action.payload.x)
            nextURL.searchParams.set('y', action.payload.y)
            nextURL.searchParams.set('z', action.payload.z)

            const nextTitle = document.title
            const nextState = { 
                additionalInformation: action.payload.x + '_' + action.payload.y + "_" + action.payload.z
            };
            if (window.history.state) {
                if (window.history.state.additionalInformation !== nextState.additionalInformation) {
                    window.history.pushState(nextState, nextTitle, nextURL);
                    window.history.replaceState(nextState, nextTitle, nextURL);
                }
            }
            else {
                window.history.pushState(nextState, nextTitle, nextURL);
                window.history.replaceState(nextState, nextTitle, nextURL);
            }

            // Update REDUX map slice state
            state.center = action.payload
            console.log(state.center)
        },

    },
});

// This function exports the action methods
export const { setMapLocation } = mapSlice.actions;

// This functions exports the reducer as default
export default mapSlice.reducer;