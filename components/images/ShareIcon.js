import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareIcon(props) {
    const size = props.size || 24
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
                d="M9.053 10.114a2.667 2.667 0 11-3.772 3.772 2.667 2.667 0 013.772-3.772zM19.72 4.78a2.667 2.667 0 11-3.775 3.775A2.667 2.667 0 0119.72 4.78M19.72 15.447a2.666 2.666 0 11-3.771 3.771 2.666 2.666 0 013.77-3.771M9.54 10.81l5.92-2.96M9.54 13.19l5.92 2.96"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default ShareIcon
