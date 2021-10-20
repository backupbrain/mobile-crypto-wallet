import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EyeOpen(props) {
    const size = props.size || 20
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
                d="M1.118 8.302a.987.987 0 010-.935C3.01 3.867 6.505.835 10 .835s6.99 3.033 8.882 6.533a.987.987 0 010 .935c-1.892 3.499-5.387 6.532-8.882 6.532s-6.99-3.033-8.882-6.533v0z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12.046 5.639a3 3 0 11-4.24 4.24 3 3 0 014.24-4.239"
                stroke={color}
                strokeWidth={1.429}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default EyeOpen