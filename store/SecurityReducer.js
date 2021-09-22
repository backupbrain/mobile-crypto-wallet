import { SECURITY_SCREEN_DISABLE, SECURITY_SCREEN_ENABLE } from "./SecurityAction";


const initialState = {
    securityScreen: false
}

export const SecurityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECURITY_SCREEN_ENABLE:
            return {
                securityScreen: true
            };
        case SECURITY_SCREEN_DISABLE:
            return {
                securityScreen: false
            }

        default:
            break;
    }
    return state;
}