import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ReqIcon(props) {
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
                d="M3 6h16a2 2 0 012 2v9.5a2.5 2.5 0 01-2.5 2.5H13"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M17 6V5a2 2 0 00-2-2H5.5A2.5 2.5 0 003 5.5V14M10 18H3M8 20l2-2-2-2M17 13h-2"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default ReqIcon
