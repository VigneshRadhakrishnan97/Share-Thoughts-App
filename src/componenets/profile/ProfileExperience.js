import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, location, to, from, description, current },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYYMMDD">{from}</Moment> -{" "}
        {current ? "NOW" : <Moment format="YYYYMMDD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
