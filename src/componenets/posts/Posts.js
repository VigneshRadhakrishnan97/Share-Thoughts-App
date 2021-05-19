import React,{useEffect,Fragment} from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../../action/post'
import Spinner from '../layout/spinner'
import Postform from './Postform';
import PostItem from "./PostItem";

const Posts = ({ getPosts,post:{posts,loading} }) => {
    useEffect(() => {
      getPosts();
    }, [getPosts]);
  return (loading ? <Spinner /> : <Fragment>
      <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><i className="fas fa-user"></i>Welcome to community</p>
      <Postform />
      <div className="posts" >
        {posts.map((post)=>{
            return ( <PostItem key={post._id} post={post} /> )
        })}
      </div>
  </Fragment>)
};

const mapStatetoProps = (state)=>{
    return {post:state.post}
}

export default connect(mapStatetoProps, { getPosts })(Posts);
