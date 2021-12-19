import React from 'react'
import Svg, { Path, Defs, RadialGradient, LinearGradient, Stop } from 'react-native-svg'

function WalletSetupCompleteGraphic () {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/Svg'
      width='291'
      height='291'
      fill='none'
      viewBox='0 0 291 291'
    >
      <Path
        fill='url(#paint0_radial_321_13043)'
        d='M291 145.5c0 80.27-65.061 145.5-145.5 145.5C65.23 291 0 225.939 0 145.5.169 65.061 65.23 0 145.5 0S291 65.061 291 145.5z'
      />
      <Path
        fill='#EAF7FA'
        d='M145.5 227c45.011 0 81.5-36.489 81.5-81.5S190.511 64 145.5 64 64 100.489 64 145.5s36.489 81.5 81.5 81.5z'
      />
      <Path
        fill='#4BA7C4'
        d='M146.984 217.484c39.488 0 71.5-32.011 71.5-71.5 0-39.488-32.012-71.5-71.5-71.5-39.489 0-71.5 32.012-71.5 71.5 0 39.489 32.011 71.5 71.5 71.5z'
      />
      <Path
        fill='url(#paint1_linear_321_13043)'
        d='M181.22 119.338l12.238 13.556-55.562 48.607-2.593-1.338-19.163-48.28 2.593 1.338 20.555 22.802L178.627 118l2.593 1.338z'
      />
      <Path
        fill='#EAF7FA'
        d='M178.628 118l12.238 13.556-55.562 48.607-32.762-36.358 13.598-11.922 20.555 22.803L178.628 118z'
      />
      <Defs>
        {/*
        <RadialGradient
          id='paint0_radial_321_13043'
          cx='0'
          cy='0'
          r='1'
          gradientTransform='translate(145.519 145.421) scale(145.422)'
          gradientUnits='userSpaceOnUse'
        >
          <Stop StopColor='#37FFFF' />
          <Stop offset='0.402' StopColor='#299EAD' StopOpacity='0.598' />
          <Stop offset='1' StopColor='#141136' StopOpacity='0' />
        </RadialGradient>
        */}
        <LinearGradient
          id='paint1_linear_321_13043'
          x1='142.439'
          x2='180.395'
          y1='134.927'
          y2='188.07'
          gradientUnits='userSpaceOnUse'
        >
          <Stop offset='0.003' StopColor='#0079A5' />
          <Stop offset='0.999' StopColor='#66CBE3' />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default WalletSetupCompleteGraphic
