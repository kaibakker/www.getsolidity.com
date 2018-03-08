import React from 'react'
import debounce from 'lodash.debounce'



import { Code } from '../../text/code'

import { ParamsString } from '../params-string'


function variable(item) {
  if(item.name) {
    return item.name.toUpperCase()
  } else {
    return "ITEM"
  }
}

export function Seth({ children, abi, address, ...props }) {
  return (
    <Code syntax="shell">{
      abi.inputs.map((item) => { return "$ " + variable(item) + "=...\n"}).join('') +
      '$ CONTRACT=' + address +
      '\n$ seth send $CONTRACT \"' + abi.name + '(' }<ParamsString params={abi.inputs} maxLengthForName={0} whiteSpace={false} />{ ")\"" + abi.inputs.map((item) => { return " $" + variable(item) }).join("")
    }</Code>
  )
}
// $ DAI=0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359
// $ OASIS=0x14FBCA95be7e99C15Cc2996c6C9d841e54B79425
// $ amount=$(seth --from-wei 0.5 ether)
// $ seth send $CONTRACT "approve(address,uint256)" $_TO $_AMOUNT
