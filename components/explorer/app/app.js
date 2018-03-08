import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
// import './app.css';
import Chain from '../chain/chain';
import Menu from '../menu/menu';
import {MENU_OPTIONS} from '../../config';



class Example extends React.Component {
  constructor() {
    super()
    this.state = {tags: []}
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      options: MENU_OPTIONS,
      tags: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tags) {
    this.setState({tags})
  }
  render() {
    return (
      <div className="app">

        <h1>getSolidity.com</h1>
        <h3>Documenting the Ethereum blockchain</h3>
        <p>Select a transaction to see it's documentation, wait a minute for blocks to show up.</p>
        <Chain squeezed={this.state.isMenuOpen} options={this.state.options} />

        <style>{`
          .example-select--from
          .mdl-switch.is-checked
          .mdl-switch__thumb {
            background-color: ${this.state.options.fromColor}
          }

          .example-select--to
          .mdl-switch.is-checked
          .mdl-switch__thumb {
            background-color: ${this.state.options.toColor}
          }
        `}</style>
      </div>
    );
  }
}

export default App;
