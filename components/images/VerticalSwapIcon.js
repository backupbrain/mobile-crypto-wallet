import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgComponent (props) {
  return (
    <Svg
      width={27}
      height={31}
      viewBox='0 0 27 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path fill='#3CADEF' d='M7 0h2v20H7zM18 11h2v19h-2z' />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 30l6-12H2l6 12zM19 0l6.5 13h-13L19 0z'
        fill='#3CADEF'
      />
    </Svg>
  )
}

export default SvgComponent
