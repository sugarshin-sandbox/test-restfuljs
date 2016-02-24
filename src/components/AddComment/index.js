import React, { Component, PropTypes } from 'react';

export default class AddComment extends Component {
  static get propTypes() {
    return {
      postId: PropTypes.number.isRequired,
      onClickCommentButton: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Add comment..." ref="input" />
        <button onClick={this.handleClickButton.bind(this)}>Add comment</button>
      </div>
    );
  }

  handleClickButton() {
    const value = this.refs.input.value.trim();
    if (value === '') return;
    this.props.onClickCommentButton(this.props.postId, value);
    this.refs.input.value = '';
  }
}
