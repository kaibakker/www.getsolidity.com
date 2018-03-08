import React from 'react'
import debounce from 'lodash.debounce'

import { Code } from '../../text/code'

import { ParamsString } from '../params-string'

export function Abi({ children, abi, ...props }) {
  return <Code>{ JSON.stringify(abi, null, 2) }</Code>
}
