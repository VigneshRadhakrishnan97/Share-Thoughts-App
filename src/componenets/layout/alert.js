import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const alert = ({alerts}) => {

    // console.log(alerts !== null  && alerts.length > 0 && alerts.map((alert)=>{
    //     return (<div key={alert.id} className={`alert alert-${alert.alertType}`} >
    //         {alert.msg}
    //     </div>);
    // }) );

    return (
      alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => {
        return (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        );
      })
    );
}

alert.propTypes = {
    alerts: PropTypes.array.isRequired

}

const mapStateToProps=(state)=>{

    return { alerts: state.alert };

}

export default connect(mapStateToProps)(alert);
