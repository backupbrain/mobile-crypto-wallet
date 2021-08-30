import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function UnconfirmedIcon (props) {
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
      <Path d='M50 13.304c-20.039 0-36.34 16.301-36.34 36.341 0 20.039 16.301 36.341 36.34 36.341s36.341-16.302 36.341-36.341c0-20.04-16.302-36.341-36.341-36.341zm14.812 51.155a3.047 3.047 0 01-2.165.897 3.05 3.05 0 01-2.164-.897l-12.651-12.65c-.035-.034-.045-.082-.079-.118a3.116 3.116 0 01-.579-.873 3.041 3.041 0 01-.238-1.173V35.9a3.062 3.062 0 016.124 0v12.479L64.812 60.13a3.058 3.058 0 010 4.329z' fill={color} />
    </Svg>
  )
}

export default UnconfirmedIcon
