import * as React from 'react'

function PasteIcon (props) {
  const size = props.size || 21
  const color = props.color || '#000'
  return (
    <svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}
    >
      <title>'clipboard_paste'</title>
      <path d='M18 4h-2a2.002 2.002 0 00-2-2h-4a2.002 2.002 0 00-2 2H6a2.002 2.002 0 00-2 2v14a2.002 2.002 0 002 2h12a2.002 2.002 0 002-2V6a2.002 2.002 0 00-2-2zm-8 1V4l4 .003V6h-4zm8 15H6V6h2a2.002 2.002 0 002 2h4a1.988 1.988 0 001.406-.58l.007-.006a2.006 2.006 0 00.356-.502c.024-.045.053-.087.073-.134.016-.036.023-.076.036-.113a1.958 1.958 0 00.081-.262c.008-.039.007-.08.012-.12A1.98 1.98 0 0016 6.002l2 .002zm-3-10H9a1 1 0 000 2h6a1 1 0 000-2zm-3 3H9a1 1 0 000 2h3a1 1 0 000-2z' fill={color} />
    </svg>
  )
}

export default PasteIcon
