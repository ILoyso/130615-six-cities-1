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
        activeItem: ``,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        setActiveItem={this._setActiveItem}
      />;
    }

    _setActiveItem(item) {
      this.setState({
        activeItem: item
      });

      return item;
    }
  }

  return WithActiveItem;
};


export default withActiveItem;
