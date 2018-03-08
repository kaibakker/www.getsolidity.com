import React from 'react'
import debounce from 'lodash.debounce'

import { Code } from '../../text/code'
import Button from '../../button'

const defaultValue = {
  address: '0xc30f370B4ca500eF0eF78a22F5aB8cD445760784',
  uint256: '0',
  string: 'Hello!',
}

class Web3Form extends React.Component {
  constructor(props) {
    super(props)
    if(props.abi.inputs && props.abi.inputs.length > 0) {
      const inputValues = props.abi.inputs.map((item) => {
        if(defaultValue[item.type]) {
          return defaultValue[item.type]
        } else {
          return ""
        }
      })
      this.state = {
        inputValues: inputValues
      }
    } else {
      this.state = {
        inputValues: []
      }
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log("Web3 implement")
    console.log(this.props.address)
    console.log(this.props.contract)
    console.log(this.state.inputValues)
    const
    { inputValues } = this.state
    this.props.abi.inputs.map((item, index) => {
      if(item.type === 'address') {
        console.log(inputValues[index].slice(2))
        inputValues[index] = inputValues[index].slice(2)
      } else {
        inputValues[index] = inputValues[index]
      }
    })

    const self = this
    this.props.contract[this.props.abi.name].apply(this, inputValues).then(function(instance) {
      self.setState({ output: instance})
      return
    }).catch(function(err) {
      self.setState({ error: err })
    })
  }


  render() {
    return (
      <Code>
        <p>{this.props.abi.type} {this.props.abi.name}(</p>
        { this.props.abi.inputs.map((input, index) => {
          return <p key={index}>{'\n\t'}{input.name}: <input value={this.state.inputValues[index]} type="text" placeholder={input.type}/></p>
        }) }

        <p>) => { this.props.abi.outputs.map((output, index) => {
          return <span key={index}>{output.name}: </span>
        })}{ this.state.output && this.state.output.toString() }</p>
        <Button darkBg onClick={this.onClick}>Request through Web3</Button>
        <p className="red">{ this.state.error && this.state.error.toString() }</p>
      </Code>
    )
  }
}

export function Web3Implementation({ children, abi, contract, address }) {
  return (
    <Web3Form abi={abi} contract={contract} address={address} />
  )
}
