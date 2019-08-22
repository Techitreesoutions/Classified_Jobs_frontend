import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import JobPostingChip from "../../../components/JobPostingChip";

let dataObj = {};

class JobPostPreview extends Component {
  state = {
    errorMessage: ""
  };
  handleNext = event => {
    const { handleNext } = this.props;

    handleNext(this.state);
  };

  handleComplete = event => {
    const { handleComplete } = this.props;
    handleComplete(this.state);
  };

  render() {
    const {
      classes,
      activeStep,
      handleJobBack,
      steps,
      dataObject
    } = this.props;
    this.dataObj = Object.assign(dataObj, dataObject);

    var Filter = require("bad-words"),
      filter = new Filter();
    dataObj.email = filter.clean(dataObj.email);
    dataObj.description = filter.clean(dataObj.description);
    dataObj.title = filter.clean(dataObj.title);
    dataObj.companyName = filter.clean(dataObj.companyName);

    console.log("DataObject Preview", dataObj);
    debugger;
    return (
      <div>
        <div className={classes.margin}>Your Post will look like below</div>
        <JobPostingChip jobItem={dataObj} />
        <div className={classes.margin}>
          <Grid container spacing={2}>
            <Grid item xs={8} className={classes.lblArea}>
              <span className={classes.errorMessage}>
                {this.state.errorMessage}
              </span>
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              <Button onClick={handleJobBack} className={classes.backButton}>
                Back
              </Button>
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  margin: {
    padding: 10
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(JobPostPreview));

JobPostPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleJobBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
