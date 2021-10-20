import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EyeClosed(props) {
    const size = props.size || 20
    const color = props.color || '#000'

    return (
        <Svg
            width={size}
            height={size/2}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17.83 2.482c.354-.425.629-.885.81-1.372a.822.822 0 10-1.544-.574c-.325.874-1.175 1.687-2.393 2.288-1.317.65-2.987 1.008-4.703 1.008-1.716 0-3.386-.358-4.703-1.008C4.08 2.223 3.23 1.41 2.904.536a.824.824 0 00-1.544.574c.181.487.456.947.81 1.372L.241 4.409a.822.822 0 101.165 1.164l1.98-1.979a9 9 0 001.826.993L4.44 7.232a.823.823 0 101.581.46l.759-2.598c.752.187 1.553.31 2.384.358v2.725a.823.823 0 001.647 0V5.454c.84-.048 1.649-.171 2.41-.36l.758 2.598a.824.824 0 001.581-.46l-.772-2.645a8.998 8.998 0 001.825-.993l1.981 1.979a.821.821 0 001.165 0 .822.822 0 000-1.164l-1.93-1.927z"
                fill={color}
            />
        </Svg>
    )
}

export default EyeClosed