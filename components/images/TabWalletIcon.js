import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function TabWalletIcon(props) {
  const size = props.size || 25
  const color = props.color || '#EAF7FA'
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0_1063_11282)"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3.539 7.915H19.5a2 2 0 012 2V19c0 1.1-.9 2-2 2h-14a2 2 0 01-2-2V8.291a2 2 0 011.294-1.87l10.353-3.91a1 1 0 011.353.935v4.468" />
        <Path d="M16.499 14.125a.376.376 0 00.001.75.375.375 0 00-.001-.75" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_1063_11282">
          <Path fill="#fff" transform="translate(.5)" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default TabWalletIcon
