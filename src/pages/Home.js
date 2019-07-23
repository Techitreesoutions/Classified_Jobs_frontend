import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import FilterArea from "./FilterArea";
import JobListingArea from "./JobPost/JobListingArea";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, AppBar, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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
    const { reducerObj, classes } = this.props;

    return (
      <div>
        <Grid container>
        <Grid item xs={4} sm={4}>
          <Link to="https://www.google.com">
          <img className="img-responsive" src={"../public/src/assets/images/logo.png"} alt="logo"/>
          </Link>
          </Grid>
          <Grid item xs={4} sm={4}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Candidate List" />
                <Tab label="Job List" />
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Header className={classes.appBar} currentTab={this.state.value} />
          </Grid>
        </Grid>

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
  appBar: { width: "50%" }
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
