import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SendIconBig(props) {
    const size = props.size || 40
    const color = props.color || '#ED1111'
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
                d="M14.59 20.248l2.952 13.282c.369 1.655 2.567 2.012 3.439.558l13.748-22.915c.752-1.25-.148-2.84-1.607-2.84H7.204c-1.672 0-2.508 2.02-1.327 3.202l8.714 8.713z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M34.734 9.267L14.584 20.25"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default SendIconBig
