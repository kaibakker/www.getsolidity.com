// http://localhost:8000/accounts/0x4d8fc1453a0f359e99c9675954e656d80d996fbf



// import { Contracts } from '../lib/contracts'
import Account from '../components/explorer/account/account';

// // prettier-ignore
// export default withDoc({
//   title: 'Documenting the Ethereum blockchain',
//   date: '21 Feb 2017',
// })(<div>snor</div>)
// <Contracts address={url.query.address} web3={true}
//   renderLoading={() => <div>Loading abi data and connect to web3...</div>}
//   render={({web3, accounts, contract}) => { return <API abi={contract.abi} name={contract.address} accounts={accounts} web3={web3} contract={contract} implementation={"web3"}  type={"contracts/web3"} address={ url.query.address}/> } }
// />


export default () => <Account address={"0xc30f370B4ca500eF0eF78a22F5aB8cD445760784"} />
