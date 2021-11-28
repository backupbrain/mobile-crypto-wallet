import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabContactIcon(props) {
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
                d="M18.864 5.636A9 9 0 116.135 18.364a9 9 0 0112.73-12.728"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17.807 19.257C17.423 17.417 15.205 16 12.5 16c-2.705 0-4.923 1.417-5.307 3.257M14.62 7.88a3.001 3.001 0 11-4.24 4.24 3 3 0 014.24-4.24"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default TabContactIcon
