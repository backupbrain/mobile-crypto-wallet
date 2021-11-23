import * as React from 'react'
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"

function PersonAvatar(props) {
    const size = props.size || 31
    const color = props.color || '#000'
    return (
        <Svg
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle
                cx={15.5}
                cy={15.5}
                r={15.5}
                fill="url(#prefix__paint0_linear_268_12764)"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.871 11.305c0 .724-.313 1.419-.87 1.93-.557.513-1.312.8-2.1.8a3.108 3.108 0 01-2.1-.8 2.625 2.625 0 01-.87-1.93c0-.725.312-1.42.87-1.931a3.108 3.108 0 012.1-.8c.788 0 1.543.287 2.1.8.557.512.87 1.206.87 1.93zm-1.664 1.2c.346-.318.54-.75.54-1.2 0-.45-.194-.882-.54-1.2a1.932 1.932 0 00-1.306-.498c-.49 0-.96.179-1.306.497-.346.319-.54.75-.54 1.2 0 .45.194.883.54 1.201.346.318.816.497 1.306.497.49 0 .96-.179 1.306-.497zm2.146 4.704a.922.922 0 00-.306-.678 1.092 1.092 0 00-.738-.281h-4.817c-.276 0-.542.101-.738.281a.922.922 0 00-.305.678v4.208h-1.124v-4.208c0-.528.228-1.035.635-1.409a2.268 2.268 0 011.532-.583h4.817c.575 0 1.127.21 1.533.583.407.374.635.88.635 1.41v4.207h-1.124v-4.208z"
                fill="#EAF7FA"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_268_12764"
                    x1={32.614}
                    y1={27.659}
                    x2={-2.062}
                    y2={-6.703}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#D4D7E9" />
                    <Stop offset={0} stopColor="#4BA7C4" />
                    <Stop offset={0} stopColor="#4BA7C4" />
                    <Stop offset={0.396} stopColor="#8EBED6" />
                    <Stop offset={1} stopColor="#D4D7E9" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default PersonAvatar
