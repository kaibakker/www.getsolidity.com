import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import Toggle from '../toggle/toggle';
// import './example-select.css';

const getSuggestions = (value, examples) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if (examples.some(({address}) => address === inputValue)) {
    return [];
  }

  return inputLength === 0 ?
    examples :
    examples.filter(({name, address}) =>
      name.toLowerCase().includes(inputValue) ||
      address.toLowerCase().includes(inputValue));
};

const getSuggestionValue = suggestion => suggestion.address;

const renderSuggestion = suggestion => (
  <div style={{
    borderRight: `4px solid ${suggestion.color}`,
    padding: '10px 0 10px 12px'
  }}>
    {suggestion.name}
  </div>
);

export default class ExampleSelect extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, {newValue}) => {
    const {examples, onChange, defaultColor} = this.props;// eslint-disable-line
    const activeExample = examples.find(({address}) => address === newValue);
    let color = activeExample && (activeExample.color || defaultColor);

    if (!newValue) {
      color = '';
    }

    onChange({value: newValue, color});

    this.setState({// eslint-disable-line
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update
  // suggestions. You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value}) => {
    this.setState({// eslint-disable-line
      suggestions: getSuggestions(value, this.props.examples)// eslint-disable-line
    });
  };

  // Autosuggest will call this function every time you need to clear
  // suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({ // eslint-disable-line
      suggestions: []
    });
  };

  render() {
    const {placeholder, identifier} = this.props;
    const {value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div className={`example-select example-select--${identifier}`}>
        <Toggle checked={Boolean(value)}
          onChange={() => {
            this.setState({value: ''});
            this.props.onChange({value: '', color: ''});
          }}/>
        
      </div>
    );
  }
}
