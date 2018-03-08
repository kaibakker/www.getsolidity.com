import React from 'react'


const server_url = 'http://188.166.83.230'
// const server_url = 'http://localhost:8000'
export default class Web3Container extends React.Component {
  state = { contracts: null }

  async componentDidMount () {
    try {
      const response = await fetch(server_url + '/contracts')
      const contracts = await response.json();
      console.log(contracts)
      this.setState({ contracts })
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.log(error)
    }
  }

  render () {
    return this.state.contracts
      ? this.props.renderLoading()
      : this.props.renderLoading()
  }
}
