import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import pluralize from 'pluralize'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { connect } from 'react-redux';
import DeleteComment from './DeleteComment';
import CommentDialog from './CommentDialog';
import LikeButton from './LikeButton';



const styles ={
    card:{
        position: 'relative',
        display:'flex',
        marginBottom: 20,
        maxWidth: 900,
        height:160
    },
    image:{
        height:160,
        width: 160
    },
    content:{
        padding: 25,
        //objectFit: 'cover'
    }
}

class Comment extends Component {
   
    render() {
        dayjs.extend(relativeTime)
        const { classes, comment: { body, createdAt, userImage, userHandle, commentId, likeCount, replyCount}, user: {
            authenticated,
            credentials: { handle }
          }
        }  = this.props;

        let like = pluralize('Like', likeCount, true)

        
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteComment commentId ={commentId} />
        ) : null;

        return (
            <Card className = {classes.card}>
                <CardMedia
                image = {userImage}
                title = "Profile image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant = "h5" component={Link} to={`/users/${userHandle}`} color= "primary" >{userHandle}</Typography>

                    {deleteButton}

                    <Typography variant = "body2" color = "textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant = "body1">{body}</Typography>

                    <LikeButton commentId= {commentId} />
                    
                    <span>{like}</span>

                    
                    <CommentDialog commentId={commentId} userHandle={userHandle} openDialog = {this.props.openDialog} />
                </CardContent>
            </Card>
            
        )
    }
}

Comment.propTypes = {
    user: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });

  
  
  export default connect(mapStateToProps)(withStyles(styles)(Comment));
