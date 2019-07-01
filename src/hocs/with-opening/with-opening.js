import React from 'react';


/**
 * Helper for open/close
 * @param {Node} Component
 * @return {*}
 */
const withOpening = (Component) => {

  class WithOpening extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this._onClick = this._onClick.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        isOpen={this.state.isOpen}
        onClick={this._onClick}
      />;
    }

    /**
     * Open/close if click
     * @private
     */
    _onClick() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  return WithOpening;
};


export default withOpening;
