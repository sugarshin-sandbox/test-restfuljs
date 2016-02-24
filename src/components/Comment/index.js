import React, { Component, PropTypes } from 'react';

export default class Comment extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      onClickDoneButton: PropTypes.func.isRequired,
      onClickDeleteButton: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  render() {
    return (
      <div>
        <span style={{ display: this.state.editMode ? 'none' : 'inline' }}>{this.props.body}</span>
        <input style={{ display: this.state.editMode ? 'inline' : 'none' }} type="text" defaultValue={this.props.body} ref="input" />
        <button style={{ display: this.state.editMode ? 'none' : 'inline' }} onClick={this.handleClickEditButton.bind(this)}>edit</button>
        <button style={{ display: this.state.editMode ? 'none' : 'inline' }} onClick={this.handleClickDeleteButton.bind(this)}>delete</button>
        <div style={{ display: this.state.editMode ? 'inline' : 'none' }}>
          <button onClick={this.handleClickDoneButton.bind(this)}>done</button>
        </div>
      </div>
    );
  }

  handleClickEditButton() {
    this.setState({ editMode: true });
  }

  handleClickDoneButton() {
    this.setState({ editMode: false });
    this.props.onClickDoneButton(this.props.id, this.refs.input.value);
  }

  handleClickDeleteButton() {
    this.props.onClickDeleteButton(this.props.id);
  }
}
