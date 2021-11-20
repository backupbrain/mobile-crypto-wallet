import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SendIcon(props) {
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
                clipRule="evenodd"
                d="M8.754 12.149l1.771 7.969c.221.993 1.54 1.207 2.063.335l8.25-13.749A1.124 1.124 0 0019.872 5H4.323c-1.004 0-1.506 1.212-.797 1.921l5.228 5.228z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M20.84 5.56L8.75 12.15"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default SendIcon
