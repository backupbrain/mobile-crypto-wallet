export const SECURITY_SCREEN_ENABLE = 'SECURITY_SCREEN_ENABLE'
export const SECURITY_SCREEN_DISABLE = 'SECURITY_SCREEN_DISABLE'


export const securityEnable = () => {
    return { type: SECURITY_SCREEN_ENABLE }
}
export const securityDisable = () => {
    return { type: SECURITY_SCREEN_DISABLE }
}