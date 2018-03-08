
import API from '../../components/api'


import Web3Container from '../../lib/web3/Web3Container'

// prettier-ignore
export default ({url}) => {
  console.log(url.query.address)
  return <Web3Container address={url.query.address} web3={true}
    renderLoading={() => <div>Loading abi data and connect to web3...</div>}
    render={({web3, accounts, contract}) => { return <API abi={contract.abi} name={contract.address} accounts={accounts} web3={web3} contract={contract} implementation={"web3"}  type={"contracts/web3"} address={ url.query.address}/> } }
  />
}
