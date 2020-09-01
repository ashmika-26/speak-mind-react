
import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';


class LikeButton extends Component {
    likedComment = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.commentId === this.props.commentId)){
            return true;
        }
        else return false;
    };

    likeScream = () => {
        this.props.likeScream(this.props.commentId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.commentId);
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            
                <Link to='/login'>
                    <MyButton tip = 'Like'>
                    <FavoriteBorder color= 'primary'/>
                    </MyButton>
                </Link>
            
        ) : this.likedComment() ? (
                <MyButton tip = "Unlike" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ): (
                <MyButton tip = "Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    commentId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapActionsToProps = {
    likeScream,
    unlikeScream
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);
