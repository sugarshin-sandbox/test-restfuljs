import React, { Component, PropTypes } from 'react';

export default class AddPost extends Component {
  static get propTypes() {
    return {
      onClickPostButton: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ marginBottom: '4rem' }}>
        <input type="text" placeholder="Add post..." ref="input" />
        <button onClick={this.handleClickButton.bind(this)}>post</button>
      </div>
    );
  }

  handleClickButton() {
    const value = this.refs.input.value.trim();
    if (value === '') return;
    this.props.onClickPostButton(value);
    this.refs.input.value = '';
  }
}
