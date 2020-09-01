import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';

import Comment from '../components/comment/Comment';
import Profile from '../components/profile/Profile';
import CommentSkeleton from '../util/CommentSkeleton';


import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
    
    componentDidMount(){
        
        this.props.getScreams();

    }
    render() {
        const { comments, loading} = this.props.data;
        let RecentCommentsMarkup = !loading ? (
            comments.map((comment) => <Comment key={comment.commentId} comment={comment}/>)
        ) : (
            <CommentSkeleton/>
        );
        return (
            <Grid container spacing = {8}>
                <Grid item sm={7} xs={12}>
                    {RecentCommentsMarkup}
                </Grid>
                <Grid item sm={5} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getScreams }
  )(home);
