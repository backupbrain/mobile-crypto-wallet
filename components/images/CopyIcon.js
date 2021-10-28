import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CopyIcon(props) {
    const size = props.size || 22
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
                d="M6.417 15.583H4.583A1.833 1.833 0 012.75 13.75V4.583A1.833 1.833 0 014.583 2.75h9.167a1.834 1.834 0 011.833 1.833v1.834"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18.237 6.417H7.43c-.56 0-1.013.453-1.013 1.013v10.807c0 .56.453 1.013 1.013 1.013h10.807c.56 0 1.013-.453 1.013-1.013V7.43c0-.56-.453-1.013-1.013-1.013z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default CopyIcon
