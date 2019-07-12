import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { Grid } from "@material-ui/core";

import { FaFacebook, FaRupeeSign } from "react-icons/fa";

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs>
          <div className={classes.footerbtm}>
            <a href="http://google.com">About Us</a>
            <a href="http://google.com">Contact Us</a>
            <a href="http://google.com">Terms & Conditions</a>
            <a href="http://google.com">Policy</a>
          </div>
        </Grid>
        <Grid item xs>
          <div className={classes.copyrightdiv}>
            <a href="http://google.com">
              <FaFacebook className={classes.icon} />
            </a>
            <a href="http://google.com">
              <FaRupeeSign className={classes.icon} />
            </a>
            <a href="http://google.com">
              <FaFacebook className={classes.icon} />
            </a>
          </div>
        </Grid>
        <Grid item xs />
      </Grid>
    );
  }
}

const styles = theme => ({
  footerbtm: {
    display: "flex"
  },
  copyrightdiv: {
    display: "flex"
  }
});
export default withStyles(styles)(Footer);

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};
