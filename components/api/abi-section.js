import markdown from 'markdown-in-js'
import React from 'react'
import Section, { components } from './section'
import { ExternalLink } from '../text/link'
import { Table, Row, Cell, BoldCell, FullWidthCell } from './table'
import { InlineCode } from '../text/code'
import immutable from '../../lib/immutable-component'
import { Code } from '../text/code'
import { Definition } from './definition'
import { Implementation } from './implementation'

function ABISection({abi, description, contract, address, implementation}) {
  return (

    <Section
      contents={
        [
          [
            <div key={0}>
              { description.body }
              <Definition abi={abi} description={description} />
            </div>
            ,
            <Implementation abi={abi} contract={contract} address={address} contract={contract} implementation={implementation} />
          ]
        ]
      } />
  )
}

export default immutable(ABISection)
