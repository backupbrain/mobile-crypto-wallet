import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CopyTabIcon(props) {
    const size = props.size || 22
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
                d="M7.5 17h-2a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v2"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M20.395 7H8.605C7.995 7 7.5 7.495 7.5 8.105v11.79c0 .61.495 1.105 1.105 1.105h11.79c.61 0 1.105-.495 1.105-1.105V8.105c0-.61-.495-1.105-1.105-1.105z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default CopyTabIcon
