import React, { Component, PropTypes } from 'react';
import AddComment from '../AddComment';
import Comment from '../Comment';

export default class Post extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired
      })).isRequired,
      onClickAddCommentButton: PropTypes.func.isRequired,
      onClickCommentEditButton: PropTypes.func.isRequired,
      onClickDeleteButton: PropTypes.func.isRequired,
      onClickCommentDeleteButton:  PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>{this.props.title} <button onClick={this.handleClickDelete.bind(this)}>Delete</button></div>
        <AddComment postId={this.props.id} onClickCommentButton={this.props.onClickAddCommentButton} />
        <ul>{this.renderComments()}</ul>
      </div>
    );
  }

  renderComments() {
    return this.props.comments.map(comment => (
      <Comment
        key={comment.id}
        id={comment.id}
        body={comment.body}
        onClickDoneButton={this.props.onClickCommentEditButton}
        onClickDeleteButton={this.props.onClickCommentDeleteButton}
      />
    ));
  }

  handleClickDelete() {
    this.props.onClickDeleteButton(this.props.id);
  }
}
