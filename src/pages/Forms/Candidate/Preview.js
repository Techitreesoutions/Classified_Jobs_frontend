import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import CandidateChip from "../../../components/CandidateChip";

let dataObj = {};

class Preview extends Component {
  state = {
    errorMessage: ""
  };
  handleNext = event => {
    const { handleNext } = this.props;

    handleNext(this.state);
  };
  render() {
    const { classes, activeStep, handleBack, steps, dataObject } = this.props;
    this.dataObj = Object.assign(dataObj, dataObject);
    console.log("DataObject Preview", dataObj);
    return (
      <div>
        <div className={classes.margin}>Your Post will look like below</div>
        <CandidateChip key={dataObj.id} candidateItem={dataObj} />
        <div className={classes.margin}>
          <Grid container spacing={2}>
            <Grid item xs={8} className={classes.lblArea}>
              <span className={classes.errorMessage}>
                {this.state.errorMessage}
              </span>
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
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
)(withStyles(styles)(Preview));

Preview.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
