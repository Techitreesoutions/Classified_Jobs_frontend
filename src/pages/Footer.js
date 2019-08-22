import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { Grid } from "@material-ui/core";

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footercontainer}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={12}>
            <div className={classes.footerbtm}>
              <a className={classes.footerLink} href="http://google.com">
                About Us
              </a>
              <a className={classes.footerLink} href="http://google.com">
                Contact Us
              </a>
              <a className={classes.footerLink} href="http://google.com">
                Terms & Conditions
              </a>
              <a className={classes.footerLink} href="http://google.com">
                Policy
              </a>
            </div>
            <div className={classes.copyrightdiv}>
              <span>
                Copyright &copy;{" "}
                <script type="text/javascript">
                  document.write(new Date().getFullYear());
                </script>{" "}
                <a className={classes.footerLink} href="http://techitree.com">
                  Techitree Technologies Pvt. Ltd.
                </a>{" "}
                All rights reserved.
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  footercontainer: {
    padding: "10px",
    margin: "50px 0 0 0",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd"
  },
  footerbtm: {
    color: "#666",
    fontSize: "13px",
    padding: "0 0 5px 0",
    borderBottom: "0px solid #ddd",
    textAlign: "center"
  },
  copyrightdiv: { color: "#666", fontSize: "13px", textAlign: "center" },
  footerLink: {
    color: "#666",
    fontSize: "13px",
    display: "inline-block",
    margin: " 0 10px 0 0"
  },
  footerSocial: {
    color: "#666",
    fontSize: "13px",
    display: "inline-block",
    margin: " 0 10px 0 0"
  },
  icon: { fontSize: "16px" },
  footerright: { textAlign: "right", float: "right" }
});
export default withStyles(styles)(Footer);

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};
