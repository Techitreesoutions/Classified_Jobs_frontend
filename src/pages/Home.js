import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import FilterArea from "./FilterArea";
import JobListingArea from "./JobPost/JobListingArea";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, AppBar, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg"

import Header from "./Header";
import CandidateListingArea from "./Candidate/CandidateListingArea";

function TabContainer({ children, dir }) {
  return <div>{children} </div>;
}

class Home extends Component {
  state = {
    value: 1
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div >
        <div className={classes.HeaderDiv}>
        <Grid container >
        <Grid item xs={2} sm={2}>
          <Link to="#">
          <img className={classes.LogoImg} src={Logo} alt="logo"/>
          </Link>
          </Grid>
          <Grid item xs={4} sm={4}>
            <div className={classes.TopTabBar}>
            <AppBar position="static" className={classes.TopTabAppBar}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="light"
                textColor="primary"
              >
                <Tab label="Candidate List" className={classes.TopTabLab} />
                <Tab label="Job List" className={classes.TopTabLab} />
              </Tabs>
            </AppBar>
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Header className={classes.appBar} currentTab={this.state.value} />
          </Grid>
        </Grid>
        </div>

        <SwipeableViews
          axis={"x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={"x"}>
            <React.Fragment>
              <FilterArea />
              <CandidateListingArea />
            </React.Fragment>
          </TabContainer>
          <TabContainer dir={"x"}>
            <React.Fragment>
              <FilterArea />
              <JobListingArea />
            </React.Fragment>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

const styles = theme => ({
  HeaderDiv: { padding:"0", backgroundColor:"#fff" },
  TopTabBar: { padding:"10px 0 0 0"},
  LogoImg: { 
    width:"150px",
    padding:"10px 10px 10px 10px"
},
TopTabAppBar: {
  backgroundColor: "#fff",
  fontSize:"14px", boxShadow:"none"
},
TopTabLab:{
  color:"#666",
  fontSize:"14px", 
  minHeight:"32px",
  borderBottom:"0",
  "&:focus": {
    outline:"0"
  }
}
  

});

const mapStateToProps = reducerObj => {
  return { reducerObj };
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Home));

Home.propTypes = {
  reducerObj: PropTypes.object.isRequired
};
