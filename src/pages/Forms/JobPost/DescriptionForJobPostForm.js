import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CreatableSelect from "react-select/creatable";

import {
  FormControl,
  Button,
  InputLabel,
  InputAdornment,
  Input,
  Grid
} from "@material-ui/core";
// Icons
import Description from "@material-ui/icons/Description";
import { getSkillsArray } from "../../../util/utilityFunctions";
import { getAllSkillsArray } from "../../../util/utilityFunctions";

class DescriptionForJobPostForm extends Component {
  
  componentWillMount = () => {
    const { dataObject,skillList } = this.props;
    if(dataObject.skills != undefined){
      dataObject.defaultSkills = dataObject.defaultSkills.map(item => {
        return {value:item,label:this.getAllSkillsArray(skillList).find(o=>o.value == item).label};
      });
    }
    this.setState({
      description: dataObject.description,
      skills:dataObject.skills
    });
  };


  handleNext = event => {
    const { handleNext } = this.props;

    handleNext(this.state);
  };
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleChange = (value, actionMeta) => {
    console.log(value);
    let list = "";
    list = value.map(item => {
      return item.value;
    });
    this.setState({
      skills: list
    });
  };

  render() {
    const { classes, activeStep, handleJobBack, steps, jobList,skillList } = this.props;
    return (
      <div>
        <div className={classes.margin}>
          <CreatableSelect
            isMulti
            isClearable
            defaultValue={this.state.defaultSkills}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            placeholder={"Select/Add your skills"}
            options={getAllSkillsArray(skillList)}
          />
        </div>
        <div className={classes.margin}>
          <FormControl
            fullWidth
            className={(classes.margin, classes.textField)}
          >
            <InputLabel>Small Description</InputLabel>
            <Input
              name="description"
              value={this.state.description}
              endAdornment={
                <InputAdornment position="end">
                  <Description />
                </InputAdornment>
              }
              autoComplete={true}
              onChange={event => this.handleUserInput(event)}
              rows={3}
              multiline={true}
            />
          </FormControl>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={2}>
            <Grid item xs={8} className={classes.lblArea}>
              <span className={classes.errorMessage}>
                {this.state.errorMessage}
              </span>
            </Grid>
            <Grid item xs={2} className={classes.lblArea}>
              <Button
                onClick={handleJobBack}
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
  },
  textField: {
    "&:-webkit-autofill": {
      boxShadow: "0 0 0 2px white inset",
      color: theme.palette.primary.main,
      fontSize: 14,
      width: "100%"
    }
  },

  lblArea: {
    display: "flex",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const jobList = state.jobList.jobList;
  const skillList = state.skillList.skillList;
  return { jobList,skillList };
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles, { withTheme: true })(DescriptionForJobPostForm));

DescriptionForJobPostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleJobBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  jobList: PropTypes.array.isRequired,
  skillList: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
