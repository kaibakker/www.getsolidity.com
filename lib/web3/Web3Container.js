import React from 'react'
import getWeb3 from './getWeb3'
import getAccounts from './getAccounts'
import getContract from './getContract'

const server_url = 'http://188.166.83.230'
// const server_url = 'http://localhost:8000'
export default class Web3Container extends React.Component {
  state = { web3: null, accounts: null, contract: null }

  async componentDidMount () {
    try {
      const response = await fetch(server_url + '/contracts/' + this.props.address)
      const truffleContract = await response.json();
      if(this.props.web3 === true) {
        const web3 = await getWeb3()
        const accounts = await getAccounts(web3)
        const contract = await getContract(web3, (truffleContract))
        this.setState({ web3, accounts, contract })
      } else {
        this.setState({ contract: truffleContract })
      }

      // this.setState({ web3, accounts, contract })
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.log(error)
    }
  }

  render () {
    const { web3, accounts, contract } = this.state
    console.log(this.state)
    return contract
      ? this.props.render({ web3, accounts, contract })
      : this.props.renderLoading()
  }
}
