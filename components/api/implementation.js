import React from 'react'
import debounce from 'lodash.debounce'


import { Table, Row, Cell, BoldCell, FullWidthCell } from './table'

import { Code, InlineCode } from '../text/code'
import { H5 } from '../text/heading'
import { P } from '../text/paragraph'

import { ParamsString } from './params-string'

import { Seth } from './implementation/seth'
import { Abi } from './implementation/abi'
import { Web3Implementation } from './implementation/web3'

import { Deprecated } from './deprecated'

export function Implementation({ children, abi, contract, address, implementation, ...props }) {
  if(implementation === 'abi') {
    return (
      [
        <Abi abi={abi} />
      ]
    )
  } else if(implementation === "seth") {
    return (
      [
        // <Abi abi={abi} />,
        <Seth abi={abi} contract={contract} address={address}/>
      ]
    )
  } else {
    return (
      [
        // <Abi abi={abi} />,
        <Web3Implementation abi={abi} contract={contract} address={address}/>
      ]
    )
  }

}
