import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({

    form: {
        textAlign: "center",
        fontsize: '6rem'
    },
    
    image:{
        width: 100,
        margin: '20px auto 20px auto'
    },
    textField:{
        margin: '9px auto 9px auto',
        
    },
    button: {
        float: 'right'
      }
    
  });

class EditDetails extends Component {
    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
          bio: credentials.bio ? credentials.bio : '',
          website: credentials.website ? credentials.website : '',
          location: credentials.location ? credentials.location : ''
        });
      };

      handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
      };
      handleClose = () => {
        this.setState({ open: false });
      };
      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
      };
      handleSubmit = () => {
          const userDetails = {
              bio: this.state.bio,
              website: this.state.website,
              location: this.state.location
          };
          this.props.editUserDetails(userDetails);
          this.handleClose();
      };
      componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
      };
    
    render() {
        const { classes } = this.props; 
        return (
            <Fragment>

                <Tooltip title = "Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon style={{ fontSize: 33 }} color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name ="bio" type="text" label="Bio"
                            multiline rows="3" placeholder="Something About You"
                            className={classes.TextField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth
                            />

                            <TextField name ="website" type="text" label="Website"
                            placeholder="Your Personal/Professional Website"
                            className={classes.TextField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth
                            />

                            <TextField name ="location" type="text" label="Location"
                            placeholder = "Where do you Live"
                            className={classes.TextField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth
                            />
                        </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {this.handleClose} color="secondary">Cancel</Button>
                            <Button onClick = {this.handleSubmit} color="secondary">Save</Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    credentials: state.user.credentials
  });
  
  export default connect(
    mapStateToProps,
    { editUserDetails }
  )(withStyles(styles)(EditDetails));