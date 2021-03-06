import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import ReplyForm from './ReplyForm';
import Replies from './Replies';
import pluralize from 'pluralize'
import dayjs from 'dayjs';
import { Link,withRouter } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = {

  invisibleSeparator: {
        border: 'none',
        margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
    
  },
  expandButton: {
    position: 'absolute',
    //left: '90%'
    //top:'51%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
};

class CommentDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
    
  };
  componentDidMount() {
    if (this.props.openDialog) {
      
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, commentId } = this.props;
    const newPath = `/users/${userHandle}/comment/${commentId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.commentId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false  });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      comment: {
        commentId,
        body,
        createdAt,
        likeCount,
        replyCount,
        userImage,
        userHandle,
        replies
      },
      UI: { loading }
    } = this.props;

    let like = pluralize('Like', likeCount, true)
    let reply = pluralize("Reply",replyCount,true)

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>

          <hr className={classes.invisibleSeparator} />

          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>

          <hr className={classes.invisibleSeparator} />

          <Typography variant="body1">{body}</Typography>
          <LikeButton commentId = {commentId}/>
          <span>{like}</span>
          <MyButton tip="Replies">
                <ChatIcon color="primary"/>
          </MyButton>
          <span>{reply}</span>
          
        </Grid>

        <hr className={classes.visibleSeparator}/>
        <ReplyForm commentId = {commentId}/>
        <Replies replies={replies}/>
        </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Post to reply"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="primary" />
          
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>

          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CommentDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  comment: state.data.comment,
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(CommentDialog)));