import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function PlusIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/Svg'
      viewBox='0 0 100 100'
      {...props}
    >
      <Path
        d='M46 14v32H14v8h32v32h8V54h32v-8H54V14z'
        style={{
          textIndent: 0,
          textTransform: 'none',
          blockProgression: 'tb'
        }}
        overflow='visible'
        color={color}
      />
    </Svg>
  )
}

export default PlusIcon
