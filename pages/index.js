import markdown from 'markdown-in-js'
import withDoc, { components } from '../lib/with-doc'

import { leo } from '../lib/data/team'
import Now from '../components/now/now'
import { InternalLink } from '../components/text/link'
import { P } from '../components/text/paragraph'
import { Code } from '../components/text/code'
import { TerminalInput } from '../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Documenting the Ethereum blockchain',
  date: '21 Feb 2017',
  authors: [leo]
})(markdown(components)`


Every day new contracts are added to the Ethereum blockchain, most of these contracts are undocumented. At getSolidity.com we collect Solidity ABI\'s and other relevant data, to help developers around the world understand and implement interaction with the Ethereum and other solidity-based Blockchain.

## Which contracts are currently documented?
We collected many ABI\'s check out our [blockexplorer](/contracts) most of the contracts are currently unnamed and descriptions are missing. In the future there wil be ways to add description data and code data to our database, if you want to add data now contact us at @kaibakker on twitter.

## What kind of implementations do you support?

We support [Web3](https://web3js.readthedocs.io/en/1.0/), [ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI) and [SETH](https://github.com/dapphub/seth).

## Add ABIs

Currently we haven\'t added all ABI\'s available, if you want to add the ABI of a specific contract you can do so through our [github repo](https://github.com/kaibakker/getsolidity.com).

`)
