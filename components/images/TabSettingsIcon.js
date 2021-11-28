import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabSettingsIcon(props) {
    const size = props.size || 25
    const color = props.color || '#EAF7FA'
    return (
        <Svg
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17.696 5l3.464 6a2.001 2.001 0 010 2l-3.464 6a2 2 0 01-1.732 1H9.036a2 2 0 01-1.732-1L3.84 13a2 2 0 010-2l3.464-6a2 2 0 011.732-1h6.93c.713 0 1.373.381 1.73 1z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M15.3 9.2a3.96 3.96 0 11-5.6 5.6 3.96 3.96 0 015.6-5.6"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default TabSettingsIcon
