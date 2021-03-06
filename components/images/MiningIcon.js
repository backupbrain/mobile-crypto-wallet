import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function MiningIcon (props) {
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
      <Path fill={color} d='M83.281 30.472l-3.165 3.165-7.049-7.049 3.165-3.165c1.752-1.752 4.743-1.587 6.694.364.971.971 1.5 2.211 1.561 3.416.06 1.206-.33 2.394-1.206 3.269zM68.625 45.125l-12.39 12.4-7.047 7.047-16.562 16.553c-1.752 1.752-4.743 1.587-6.689-.349-.968-.978-1.5-2.217-1.568-3.427-.068-1.22.329-2.391 1.21-3.272l16.562-16.552 7.047-7.047 12.39-12.4 7.047 7.047z' />
      <Path fill={color} d='M92.727 44.312l-11.49 11.49-11.644-11.645-7.047-7.046-7.957-7.967 11.49-11.48 7.957 7.957 7.047 7.047zM14.119 29.504l3.165 3.165 7.049-7.049-3.165-3.165c-1.752-1.752-4.743-1.587-6.694.364-.971.971-1.5 2.211-1.561 3.416-.06 1.206.331 2.394 1.206 3.269zM28.772 44.158l7.047-7.047 12.4 12.4-7.047 7.047zM74.965 78.317c-.068 1.21-.6 2.449-1.568 3.427-1.946 1.936-4.937 2.101-6.689.349L50.156 65.54l7.047-7.047 16.552 16.552c.881.882 1.278 2.053 1.21 3.272z' />
      <Path fill={color} d='M7.273 45.947l6.286 6.287 13.62-8.418 15.635-15.635-11.489-11.489-15.009 15.009z' />
    </Svg>
  )
}

export default MiningIcon
