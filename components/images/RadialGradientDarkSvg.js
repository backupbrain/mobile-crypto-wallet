import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

function RadialGradientDarkSvg(props) {
    const size = props.size || 380
    /* const color = props.color || '#000' */

    return (
        <Svg
            width={299}
            height={381}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M149.583 380.37c105.023 0 190.161-85.138 190.161-190.161S254.606.048 149.583.048-40.578 85.186-40.578 190.209 44.56 380.37 149.583 380.37z"
                fill="url(#prefix__paint0_radial_141_8385)"
            />
            <Defs>
                <RadialGradient
                    id="prefix__paint0_radial_141_8385"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(90 -20.313 169.896) scale(190.161)"
                >
                    <Stop stopColor="#7CB3C7" />
                    <Stop offset={0} stopColor="#76AABD" />
                    <Stop offset={0.13} stopColor="#6D9CAE" />
                    <Stop offset={0.365} stopColor="#5C8290" stopOpacity={0.85} />
                    <Stop offset={0.505} stopColor="#52737F" stopOpacity={0.7} />
                    <Stop offset={0.786} stopColor="#141528" stopOpacity={0.66} />
                    <Stop offset={0.854} stopColor="#141528" />
                </RadialGradient>
            </Defs>
        </Svg>
    )
}

export default RadialGradientDarkSvg