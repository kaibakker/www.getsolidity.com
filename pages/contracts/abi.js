
import API from '../../components/api'

import Web3Container from '../../lib/web3/Web3Container'


export default ({url}) => {
  return <Web3Container address={url.query.address} web3={false}
    renderLoading={() => <div>Loading abi data and connect to web3...</div>}
    // render={() => <div>Loading abi dat3a and connect to web3...</div>}
    render={({contract}) => { return <API abi={contract.abi} name={contract.contractName}  contract={contract} implementation={"abi"} type={"contracts/abi"} address={ url.query.address} /> } }
  />
}
