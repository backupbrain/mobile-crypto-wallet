import React from 'react'
import Svg, { Path } from 'react-native-Svg'

function AnodeTextLogo (props) {
  const size = props.size || 100
  const color = props.color || '#000'
  return (
    <Svg
      xmlns='http://www.w3.org/2000/Svg'
      width={size * 0.832}
      height={size}
      viewBox='0 0 143.41 38.037'
    >
      <Path
        fill={color}
        d='M-171.687 1564.9a9.719 9.719 0 00-3.4-2.206 12.675 12.675 0 00-4.809-.858 15.087 15.087 0 00-5.6 1.079 14.723 14.723 0 00-4.794 3.064l3.826 3.87a8.5 8.5 0 012.88-1.8 8.583 8.583 0 012.792-.49 6.155 6.155 0 014.276 1.348 4.669 4.669 0 011.485 3.646h-3.737a20.281 20.281 0 00-4.793.541 12.184 12.184 0 00-3.894 1.643 8.359 8.359 0 00-2.634 2.745 7.427 7.427 0 00-.968 3.848 8.155 8.155 0 00.613 3.2 7.269 7.269 0 001.723 2.5 7.718 7.718 0 002.656 1.62 9.857 9.857 0 003.422.563 17.206 17.206 0 003.938-.45 10.739 10.739 0 003.624-1.621v1.4h6.487v-14.4a17.688 17.688 0 00-.692-5.4 9.666 9.666 0 00-2.401-3.842zm-3.4 17.15a13.754 13.754 0 01-2.859 1.305 9.386 9.386 0 01-2.858.45 4.187 4.187 0 01-2.724-.858 2.708 2.708 0 01-1.058-2.206 2.581 2.581 0 01.518-1.62 3.828 3.828 0 011.395-1.1 7.155 7.155 0 012.071-.613 17.2 17.2 0 012.543-.18h2.971z'
        data-name='Path 5902'
      />
    </Svg>
  )
}

export default AnodeTextLogo