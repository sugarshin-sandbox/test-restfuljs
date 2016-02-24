import React, { Component, PropTypes } from 'react';
import styles from './index.styl';

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
    const { editMode } = this.state;
    const { body } = this.props;
    return (
      <li>
        <span className={editMode ? styles.hidden : ''}>{body}</span>
        <input className={!editMode ? styles.hidden : ''} type="text" defaultValue={body} ref="input" />
        <button className={editMode ? styles.hidden : ''} onClick={this.handleClickEditButton.bind(this)}>edit</button>
        <button className={editMode ? styles.hidden : ''} onClick={this.handleClickDeleteButton.bind(this)}>delete</button>
        <button className={!editMode ? styles.hidden : ''} onClick={this.handleClickDoneButton.bind(this)}>done</button>
      </li>
    );
  }

  handleClickEditButton() {
    this.setState({ editMode: true });
  }

  handleClickDoneButton() {
    const value = this.refs.input.value.trim();
    if (this.props.body !== value) {
      this.props.onClickDoneButton(this.props.id, value);
    }
    this.setState({ editMode: false });
  }

  handleClickDeleteButton() {
    this.props.onClickDeleteButton(this.props.id);
  }
}
