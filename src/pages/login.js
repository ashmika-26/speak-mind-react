import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/logo-final.gif';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: "center",
        fontsize: '6rem'
    },
    
    image:{
        width: 400,
        margin: '10px auto 1px auto'
    },
    textField:{
        margin: '9px auto 9px auto',
        
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError:{
        color: 'red',
        fontSize: '1rem',
        marginTop: 10
    },
    progress:{
        position: 'absolute'
    }
};


class login extends Component {
    constructor(){
        super();
        this.state ={
            email: "",
            password: "",
            errors: {}
        }
    } 

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors});
        }
    }
    handleSubmit =(event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData ={
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData,this.props.history);
        
    };
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: {loading} } =this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt = "App logo" className={classes.image}/>
                    <Typography variant ="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit = {this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} 
                        helperText= {errors.email}
                        error = {errors.email ? true : false} 
                        value={this.state.email} 
                        onChange={this.handleChange} fullWidth />

                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} 
                        helperText= {errors.password}
                        error = {errors.password ? true : false} 
                        value={this.state.password} 
                        onChange={this.handleChange} fullWidth />

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}> 
                        LOGIN {loading && (
                        <CircularProgress size ={30} className={classes.progress}/>)}
                        </Button>
                            
                        <br/><br/>
                        Don't have an account with us?<Link to='/signup'> Signup Instead!</Link>                   
                        </form>
                    </Grid>
                <Grid item sm/>
            </Grid>
            
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({

    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps,mapActionsToProps) (withStyles(styles)(login));