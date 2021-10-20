import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

function RadialGradientLightSvg(props) {
    const size = props.size || 380
    /* const color = props.color || '#000' */
    return (
        <Svg
            width={375}
            height={418}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M395.12 129.374v159.252C372 348.693 323.601 396.13 263.026 418H111.973C51.244 396.13 2.846 348.693-20.121 288.626V129.374C3 69.307 51.4 21.87 111.973 0h150.899C323.601 21.87 372 69.307 395.12 129.374z"
                fill="url(#prefix__paint0_radial_141:8399)"
            />
            <Defs>
                <RadialGradient
                    id="prefix__paint0_radial_141:8399"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="matrix(295.773 0 0 295.544 186.36 207.635)"
                >
                    <Stop stopColor="#7CB3C7" />
                    <Stop offset={0.065} stopColor="#4BA7C5" />
                    <Stop offset={0.129} stopColor="#4995AF" />
                    <Stop offset={0.367} stopColor="#34609B" />
                    <Stop offset={0.525} stopColor="#2D4C94" />
                    <Stop offset={0.683} stopColor="#2E4292" />
                </RadialGradient>
            </Defs>
        </Svg>
    )
}

export default RadialGradientLightSvg
