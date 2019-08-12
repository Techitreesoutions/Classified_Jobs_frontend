import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { PropTypes } from "prop-types";
import { Grid } from "@material-ui/core";

import { FaFacebook, FaRupeeSign, FaLinkedin } from "react-icons/fa";

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.footercontainer}>
      <Grid container spacing={24}>
        <Grid item xs={9} sm={9}>
          <div className={classes.footerbtm}>
            <span>Copyright &copy; 2019 <a className={classes.footerLink} href="http://techitree.com">Techitree Technologies Pvt. Ltd.</a> All rights reserved.
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <a className={classes.footerLink} href="http://google.com">About Us</a>
            <a className={classes.footerLink} href="http://google.com">Contact Us</a>
            <a className={classes.footerLink} href="http://google.com">Terms & Conditions</a>
            <a className={classes.footerLink} href="http://google.com">Policy</a>
          </div>
        </Grid>
        <Grid item xs={3} sm={3}>
          <div className={classes.copyrightdiv}>
            <a className={classes.footerSocial} href="http://google.com">
              <FaFacebook className={classes.icon} />
            </a>
            <a className={classes.footerSocial} href="http://google.com">
              <FaLinkedin className={classes.icon} />
            </a>
            
<a href="https://smallseotools.com/visitor-hit-counter/" rel="nofollow noopener" target="_blank" title="smallseotools.com/visitor-hit-counter/">
<img src="https://smallseotools.com/counterDisplay?code=f2c60a79a50c295ba790949ef2be079c&style=0001&pad=6&type=page&initCount=9500" alt="smallseotools.com/visitor-hit-counter/" border="0"/>
</a>


          </div>
        </Grid>
        
      </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  footerbtm: {
    display: "flex"
  },
  copyrightdiv: {
    display: "flex"
  },
  footercontainer: {
    padding:"10px",
    backgroundColor:"#fff",
    borderTop:"1px solid #ddd",
  },
  footerbtm: { color:"#666", fontSize:"13px"},
  copyrightdiv:{ textAlign:"right", float:"right",},
  footerLink: { color:"#666", fontSize:"13px", display:"inline-block", margin:" 0 10px"},
  footerSocial: { color:"#666", fontSize:"13px", display:"inline-block", margin:" 0 10px"},
  icon:{ fontSize:"16px"}
});
export default withStyles(styles)(Footer);

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};
