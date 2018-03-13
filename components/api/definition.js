import React from 'react'
import debounce from 'lodash.debounce'


import { Table, Row, Cell, BoldCell, FullWidthCell } from './table'

import { Code, InlineCode } from '../text/code'
import { H5 } from '../text/heading'
import { P } from '../text/paragraph'

import { ParamsString } from './params-string'

export function Definition({ children, abi, description, ...props }) {
  if(!abi.inputs) abi.inputs = [];
  if(!abi.outputs) abi.outputs = [];
  // if(!abi.outputs[0]) abi.outputs[0] = { type: "nothing", name: 'empty'};
  // if(!abi.inputs) abi.inputs = [];
  let list = []
  list.push(<P>{ description.abstract }</P>)


  list.push(<Code>{abi.type} { abi.name }(<ParamsString params={abi.inputs} maxLengthForName={10} />) { abi.constant && 'constant ' }{ abi.payable && 'payable ' }returns (<ParamsString params={abi.outputs} maxLengthForName={10} />)</Code>)


  if(abi.inputs.length > 0 ) {
    list.push(<H5>Inputs <InlineCode floatRight={true}><ParamsString params={abi.inputs} maxLengthForName={2} /></InlineCode></H5>)

    if(description.inputs) {
      list.push(<Table>
        {abi.inputs.map((item, index) => {
          return <Row key={index}>
            <Cell><i>{item.type}</i><br /><b>{item.name}</b></Cell>
            <Cell>{ description.inputs && description.inputs[0] }</Cell>
          </Row>
        })}
      </Table>)
    }

  }

  if(abi.outputs.length > 0 ) {
    list.push(<H5>Returns <InlineCode floatRight={true}><ParamsString params={abi.outputs} maxLengthForName={2} /></InlineCode></H5>)

    if(description.outputs) {
      list.push(<Table>
        {abi.outputs.map((item, index) => {
          return <Row key={index}>
            <Cell><i>{item.type}</i><br /><b>{item.name}</b></Cell>
            <Cell>{ description.outputs && description.outputs[0] }</Cell>
          </Row>
        })}
      </Table>)
    }

  }
  // if(description.returns) {
    // if(description.returns) list.push(<P>{ description.returns }</P>);
  // }
  list.push(<H5>Properties <InlineCode floatRight={true}>{ abi.constant && 'constant ' }{ abi.payable && 'payable ' }{ (!abi.payable && !abi.constant) && 'non-payable ' }{abi.type}</InlineCode></H5>)
  if(description.properties) list.push(<P>{ description.properties }</P>)

  return list
}
