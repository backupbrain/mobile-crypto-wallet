import * as React from "react"
import Svg, { Path } from "react-native-svg"

function NoteIcon(props) {

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
                d="M20 20V5.778C20 4.796 19.204 4 18.222 4H5.778C4.796 4 4 4.796 4 5.778v10.667c0 .982.796 1.778 1.778 1.778h10.889L20 20z"
                stroke={color}
                strokeWidth={1.333}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M8.177 11.073a.25.25 0 11-.354.354.25.25 0 01.354-.354M12.427 11.073a.25.25 0 11-.353.354.25.25 0 01.353-.354M16.427 11.073a.25.25 0 11-.353.354.25.25 0 01.353-.354"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default NoteIcon
