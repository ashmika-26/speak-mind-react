import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Comment from '../components/comment/Comment';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import CommentSkeleton from '../util/CommentSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    commentIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const commentId = this.props.match.params.commentId;

    if (commentId) this.setState({ commentIdParam: commentId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { comments, loading } = this.props.data;
    const { commentIdParam } = this.state;

    const commentsMarkup = loading ? (
    <CommentSkeleton /> 
  ) : comments.length === 0 ? (
        <p>No comments from this user</p>
    ): !commentIdParam ? (
        comments.map((comment) => <Comment key={comment.commentId} comment={comment} />)
        ) : (
            comments.map(comment => {
                if(comment.commentId !== commentIdParam)
                return <Comment key={comment.commentId} comment={comment} />
                else return <Comment key={comment.commentId} comment={comment} openDialog />
            })
        )
      
    

    return (
      <Grid container spacing={8}>
        <Grid item sm={7} xs={12}>
          {commentsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>

          {
          this.state.profile === null ? (
              <ProfileSkeleton/>
          ):(<StaticProfile profile={this.state.profile} />)
          }
            
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);