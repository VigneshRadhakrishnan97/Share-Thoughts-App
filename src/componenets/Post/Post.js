import React, { Fragment, useEffect } from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Spinner from '../layout/spinner'
import { getPost } from '../../action/post'
import PostItem from '../posts/PostItem'
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentChart from './CommentChart'

const Post = ({ getPost,post:{post,loading}, match }) => {
    useEffect(() => {
      getPost(match.params.id);
    }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Go back{" "}
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentChart comments={post.comments} />
      <CommentForm postID={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postID={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStatetoProps=(state)=>{
    return {post:state.post}
}

export default connect(mapStatetoProps, { getPost })(Post);
