import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import restful, { fetchBackend } from 'restful.js';

global.fetch = null;
require('whatwg-fetch');

const api = restful('http://localhost:3000', fetchBackend(global.fetch));

class AddPost extends Component {
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
      <div>
        <input type="text" placeholder="post..." ref="input" />
        <button onClick={this.handleClickButton.bind(this)}>post</button>
      </div>
    );
  }

  handleClickButton() {
    this.props.onClickPostButton(this.refs.input.value);
    this.refs.input.value = '';
  }
}

class Comment extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      onClickDoneButton: PropTypes.func.isRequired
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
        <div>{this.props.body}</div>
        <button style={{ display: this.state.editMode ? 'none' : 'inline' }} onClick={this.handleClickEditButton.bind(this)}>edit</button>
        <div style={{ display: this.state.editMode ? 'inline' : 'none' }}>
          <input type="text" defaultValue={this.props.body} ref="input" />
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
}

class Post extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        body: PropTypes.string.isRequired
      })).isRequired,
      onClickCommentEditButton: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <ul>{this.renderComments()}</ul>
      </div>
    );
  }

  renderComments() {
    return this.props.comments.map(comment => (
      comment.postId === this.props.id ?
        <Comment key={comment.id} id={comment.id} body={comment.body} onClickDoneButton={this.props.onClickCommentEditButton} /> : null
    ));
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
  componentWillMount() {
    (async () => {
      const postsCollection = await api.all('posts').getAll();
      const commentsCollection = await api.all('comments').getAll();
      this.setState({
        posts: postsCollection.body().map(post => post.data()),
        comments: commentsCollection.body().map(comment => comment.data())
      });
    }).call(this);
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
      <Post key={post.id} id={post.id} title={post.title} comments={this.state.comments} onClickCommentEditButton={this.updateComment.bind(this)} />
    ));
  }
  async addPost(payload) {
    const posts = await api.all('posts', false).post({
      title: payload,
      author: 'test user'
    });
    if (posts.statusCode() === 201) {
      this.setState({ posts: [...this.state.posts, posts.body().data()] });
    } else {
      throw new Error(posts.headers(), posts.statusCode());
    }
  }
  async updateComment(id, payload) {
    console.log(id, payload);
    const comments = await api.all('comments').get(id).putch(payload);
    this.setState({ comments });
  }
}

ReactDOM.render(<App />, document.querySelector('#app-root'));

// const api = restful('http://localhost:3000', fetchBackend(global.fetch));

// const postsCollection = api.all('posts');  // http://api.example.com/articles
const postsCollection = api.one('posts', 1).all('comments');  // http://api.example.com/articles

postsCollection.getAll().then(res => {
  console.log('res', res);
  console.log('res body', res.body());
  console.log('res headers', res.headers());
  console.log('res statusCode', res.statusCode());
  const postEntities = res.body();
  // postEntities[0].get(1).then(res => console.log(res.data()));
  // console.log(postEntities[0].data());
  console.log(postEntities.map(postEntity => postEntity.data()));
  postEntities.forEach(postEntity => {
    // console.log(postEntity);
    const post = postEntity.data();
    console.log(post);
  });
});
