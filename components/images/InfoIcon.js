import * as React from "react"
import Svg, { Path } from "react-native-svg"

function InfoIcon(props) {
    const size = props.size || 24
    const color = props.color || '#000'

    return (
        <Svg
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11.999 8a.25.25 0 10.002.5A.25.25 0 0012 8z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12 21a9 9 0 110-18 9 9 0 010 18v0zM12 12v5"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default InfoIcon
