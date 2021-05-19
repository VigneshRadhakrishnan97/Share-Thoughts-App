import React,{Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteComment} from '../../action/post'
import Moment from 'react-moment'

const CommentItem = ({
  postID,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date"> <Moment format="YYYY/MM/DD" >{date}</Moment> </p>
        { !auth.loading && auth.user._id===user && (
            <button onClick={()=>{deleteComment(postID,_id)}} type="button" className="btn btn-danger" >
            <i className="fas fa-times"></i>
            </button>
        ) }
      </div>

    </div>
  );
};

const mapStatetoProps=(state)=>{
    return{auth : state.auth}
}
export default connect(mapStatetoProps, { deleteComment })(CommentItem);
