import * as React from 'react'
import Svg, { Path } from 'react-native-Svg'

function ConfirmedIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <Svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/Svg'
      viewBox='0 0 139 139'
      {...props}
    >
      <Path d='M69.5 11.666c-31.941 0-57.834 25.893-57.834 57.834 0 31.941 25.893 57.834 57.834 57.834 31.941 0 57.834-25.893 57.834-57.834 0-31.941-25.893-57.834-57.834-57.834zm28.305 49.677L68.234 88.114a5.861 5.861 0 01-2.455 1.331 5.9 5.9 0 01-6.478-1.11L41.094 71.052a5.917 5.917 0 018.148-8.583l14.492 13.756 26.127-23.656a5.918 5.918 0 017.944 8.774z' fill={color} />
    </Svg>
  )
}

export default ConfirmedIcon
