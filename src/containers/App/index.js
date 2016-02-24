import React, { Component } from 'react';
import AddPost from '../../components/AddPost';
import Post from '../../components/Post';
import Posts from '../../apis/Posts';
import Comments from '../../apis/Comments';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  componentWillMount() {
    (async () => {
      const params = { _sort: 'views', _order: 'DESC' };
      const postsCollection = await Posts.fetchAll(params);
      const commentsCollection = await Comments.fetchAll(params);
      this.setState({
        posts: postsCollection.body().map(post => post.data()),
        comments: commentsCollection.body().map(comment => comment.data())
      });
    })();
  }

  render() {
    return (
      <div className="App">
        <AddPost onClickPostButton={this.addPost.bind(this)} />
        <div className="posts">
          {this.renderPosts()}
        </div>
      </div>
    );
  }

  renderPosts() {
    return this.state.posts.map(post => (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        comments={this.state.comments}
        onClickCommentEditButton={this.updateComment.bind(this)}
        onClickAddCommentButton={this.addComment.bind(this)}
        onClickDeleteButton={this.deletePost.bind(this)}
        onClickCommentDeleteButton={this.deleteComment.bind(this)}
      />
    ));
  }

  async addPost(payload) {
    const posts = await Posts.create({
      title: payload,
      author: 'test user'
    });
    const statusCode = posts.statusCode();
    if (statusCode === 201) {
      this.setState({ posts: [posts.body().data(), ...this.state.posts] });
    } else {
      console.error(posts.headers(), statusCode);
    }
  }

  async deletePost(id) {
    const posts = await Posts.delete(id);
    const statusCode = posts.statusCode();
    if (statusCode === 200) {
      this.setState({ posts: this.state.posts.filter(post => post.id !== id) });
    } else {
      console.error(posts.headers(), statusCode);
    }
  }

  async addComment(postId, payload) {
    const comments = await Comments.create({
      body: payload,
      postId
    });
    const statusCode = comments.statusCode();
    if (statusCode === 201) {
      this.setState({ comments: [comments.body().data(), ...this.state.comments] });
    } else {
      console.error(comments.headers(), statusCode);
    }
  }

  async updateComment(id, payload) {
    const comments = await Comments.save(id, { body: payload });
    const statusCode = comments.statusCode();
    if (statusCode === 200) {
      this.setState({
        comments: this.state.comments.map(comment => (
          comment.id === id ? comments.body().data() : comment
        ))
      });
    } else {
      console.error(comments.headers(), statusCode);
    }
  }

  async deleteComment(id) {
    const comments = await Comments.delete(id);
    const statusCode = comments.statusCode();
    if (statusCode === 200) {
      this.setState({ comments: this.state.comments.filter(comment => comment.id !== id) });
    } else {
      console.error(comments.headers(), statusCode);
    }
  }
}
