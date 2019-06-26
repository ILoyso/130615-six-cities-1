import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {Operation} from '../../reducer/data/data';


/**
 * Helper for sending comment
 * @param {Node} Component
 * @return {*}
 */
const withSendComments = (Component) => {

  class WithSendComments extends React.PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        rating: ``,
        review: ``
      };

      this._sendComment = this._sendComment.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        disabled={!(parseInt(this.state.rating, 10) > 0)}
        onChange={this._onChange}
        onSendComment={this._sendComment}
        rating={this.state.rating}
        review={this.state.review}
      />;
    }

    /**
     * Update comment data in state when form fields changed
     * @param {Event} evt
     * @private
     */
    _onChange(evt) {
      this.setState(Object.assign({}, this.state, {
        [evt.target.name]: evt.target.value
      }));
    }

    /**
     * Create data for send comment
     * @param {Event} evt
     * @private
     */
    _sendComment(evt) {
      const {rating, review} = this.state;
      const {id} = this.props;

      evt.preventDefault();
      this.props.onSendComment(id, {
        comment: review,
        rating: parseInt(rating, 10),
      });

      this.setState(Object.assign({}, this.state, {
        rating: ``,
        review: ``
      }));
    }
  }

  WithSendComments.propTypes = {
    id: PropTypes.number,
    onSendComment: PropTypes.func.isRequired,
  };

  return WithSendComments;
};


const mapDispatchToProps = (dispatch) => ({
  onSendComment: (id, data) => dispatch(Operation.sendComments(id, data)),
});


export {withSendComments};

export default compose(
    connect(null, mapDispatchToProps),
    withSendComments
);
