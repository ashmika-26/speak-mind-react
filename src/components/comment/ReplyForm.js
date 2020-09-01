import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitReply } from '../../redux/actions/dataActions';
const styles = {
    textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
  };
  
  class ReplyForm extends Component {
    state = {
      body: '',
      errors: {}
    };
  
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
      }
      if (!nextProps.UI.errors && !nextProps.UI.loading) {
        this.setState({ body: '' });
      }
    }
  
    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.submitReply(this.props.commentId, { body: this.state.body });
    };
  
    render() {
      const { classes, authenticated } = this.props;
      const errors = this.state.errors;
  
      const replyFormMarkup = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Reply on the post"
              error={errors.reply ? true : false}
              helperText={errors.reply}
              value={this.state.body}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      ) : null;
      return replyFormMarkup;
    }
  }
  
  ReplyForm.propTypes = {
    submitReply: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    commentId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
  });
  
  export default connect(
    mapStateToProps,
    { submitReply }
  )(withStyles(styles)(ReplyForm));