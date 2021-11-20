import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ReqIconBig(props) {
    const size = props.size || 40
    const color = props.color || '#37B761'
    return (
        <Svg
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5 10h26.667A3.333 3.333 0 0135 13.333v15.834a4.167 4.167 0 01-4.167 4.166h-9.166"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M28.333 10V8.333A3.333 3.333 0 0025 5H9.167A4.167 4.167 0 005 9.167v14.166M16.667 30H5M13.334 33.333L16.667 30l-3.333-3.333M28.333 21.667H25"
                stroke="#37B761"
                strokeWidth={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default ReqIconBig
