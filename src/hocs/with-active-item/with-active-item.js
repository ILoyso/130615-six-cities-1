import React from 'react';


/**
 * Helper for get active item
 * @param {Node} Component
 * @return {withActiveItem}
 */
const withActiveItem = (Component) => {

  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: undefined,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        setActiveItem={this._setActiveItem}
      />;
    }

    _setActiveItem(item) {
      this.setState({
        activeItem: item
      });
    }
  }

  return WithActiveItem;
};


export default withActiveItem;
