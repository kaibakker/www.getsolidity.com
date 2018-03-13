import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {loadAccount} from '../api';
import {REFRESH_TIME, CHAIN_MARGIN_TOP, ETHERSCAN_BASE_URL} from '../../config';
import Transaction from '../transaction/transaction';
import Details from '../details/details';
import {isMobile} from '../../helper';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      selectedBlockHash: null,
      selectedTxHash: null,
      selectedBlockTop: 0
    };
  }

  componentDidMount() {
    this.updateBlocks();
  }

  updateBlocks() {
    // const youngestBlock = this.state.blocks[0];
    // const youngestBlockNumbner = youngestBlock ? youngestBlock.number : 0;

    loadAccount(this.props.address)
      .then(transactions => {
        console.log(transactions)
        this.setState({ transactions: transactions});
        // setTimeout(() => this.loadAccount(), REFRESH_TIME);
      })
      .catch(() => setTimeout(() => this.loadAccount(), REFRESH_TIME));
  }


  render() {
    const {
      transactions

    } = this.state;
    const {isNew} = this.state;
    const classes = ['block', isNew && 'block--new'].filter(Boolean).join(' ');

    const sortedTransactions = transactions;

    return (
      <div>

        {sortedTransactions.map(tx => (
          <Transaction
            data={tx}
            key={tx.hash}
            fromHighlight={"fromHighlight"}
            fromColor={"fromColor"}
            toHighlight={"toHighlight"}
            toColor={"toColor"}

          />
        ))}
      </div>
    );
  }
}

export default Account;
