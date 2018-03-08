
import API from '../../components/api'

import Web3Container from '../../lib/web3/Web3Container'

// 
// export default ({ url }) => {
//   return <Web3Container  address={url.query.address} web3={true}
//     renderLoading={() => <div>Loading...</div>}
//     render={({web3, accounts, contract}) => { return <API abi={abi} name={"Battle of thermopylae"} accounts={accounts} web3={web3} contract={contract} implementation={"seth"}  type={"contracts/seth"} address={ url.query.address}/> } }
//   />
// }

export default ({url}) => {
  return <Web3Container address={url.query.address} web3={false}
    renderLoading={() => <div>Loading abi data and connect to web3...</div>}
    // render={() => <div>Loading abi dat3a and connect to web3...</div>}
    render={({contract}) => { return <API abi={contract.abi} name={contract.contractName}  contract={contract} implementation={"seth"} type={"contracts/seth"} address={ url.query.address} /> } }
  />
}
