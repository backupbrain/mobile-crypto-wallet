import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ConversionIcon(props) {

    const size = props.size || 41
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
                d="M22.875 18.125a9.397 9.397 0 11-13.29 13.29 9.397 9.397 0 0113.29-13.29"
                stroke="#4BA7C4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M31.416 9.584a9.397 9.397 0 11-13.289 13.29 9.397 9.397 0 0113.29-13.29M13.667 6.833H10.25a6.833 6.833 0 00-6.833 6.834"
                stroke="#4BA7C4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10.25 3.417l3.417 3.416-3.417 3.417M27.334 34.167h3.417a6.833 6.833 0 006.833-6.834"
                stroke="#4BA7C4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M30.75 37.583l-3.416-3.416 3.417-3.417"
                stroke="#4BA7C4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default ConversionIcon
