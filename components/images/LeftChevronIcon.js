import * as React from 'react'
import Svg, { Path } from 'react-native-Svg'

function LeftChevronIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/Svg'
      viewBox='0 0 470.003 856.25'
      {...props}
    >
      <Path
        fill={color}
        d='M214.06 642.188L0 428.126l214.065-214.063L428.131 0l20.936 20.936 20.936 20.936-193.437 193.44L83.128 428.754l193.12 193.124L469.368 815l-20.624 20.625-20.625 20.625-214.06-214.062z'
      />
    </Svg>
  )
}

export default LeftChevronIcon
