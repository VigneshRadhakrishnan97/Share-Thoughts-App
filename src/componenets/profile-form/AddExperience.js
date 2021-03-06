import React,{Fragment,useState} from 'react'
import {connect} from 'react-redux'
import {addExperience} from '../../action/profile'
import {Link,withRouter} from 'react-router-dom'

const AddExperience = ({ addExperience,history }) => {

    const [formData,setFormData]=useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDisableDate,toggleDisable]=useState(false);
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    } = formData;

    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>{e.preventDefault(); addExperience(formData,history)}}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            onChange={onchange}
            value={title}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            onChange={onchange}
            value={company}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={onchange}
            value={location}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onChange={onchange} value={from} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisable(!toDisableDate);
              }}
              value={current}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onchange} disabled={toDisableDate?'disabled':''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onchange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default connect(null, { addExperience })(withRouter(AddExperience));
