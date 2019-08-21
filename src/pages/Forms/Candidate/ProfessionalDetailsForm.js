import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Select from "react-select";

import {
  FormControl,
  Button,
  InputLabel,
  InputAdornment,
  Input,
  Grid,
} from "@material-ui/core";
// Icons
import Title from "@material-ui/icons/Title";
import Slider from "@material-ui/lab/Slider";

import CityList from "../../../data/cityList.json";
import {  getLocationArray } from "../../../util/utilityFunctions";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: 0,
    borderRadius: 0,
    borderBottom: "1px solid",
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
      borderBottom: "1px solid",
      borderRadius: 0
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "2px 0px"
  })
};
class PersonalDetailsForm extends Component {
  componentWillMount = () => {
    const { dataObject } = this.props;
    if(dataObject.location !== undefined){
      dataObject.defaultLocation = dataObject.location.map(item => {
        return {value:item,label:this.getCityList().find(o=>o.value === item).label};
      });
    }

if(dataObject.experienceYears !== undefined){
  var item = dataObject.experienceYears;
      dataObject.defaultExperienceYears =  {value:item,label:this.getNumberList(20).find(o=>o.value === item).label};
    } 

    if(dataObject.experienceMonths !== undefined){
      var monthItem = dataObject.experienceMonths;
          dataObject.defaultExperienceMonths =  {value:monthItem,label:this.getNumberList(12).find(o=>o.value === monthItem).label};
        } 
    
    
    this.setState({
      title: dataObject.title,
      experienceYears:dataObject.experienceYears,
      experienceMonths:dataObject.experienceMonths,
      location: dataObject.location,
      expectedSalary: dataObject.expectedSalary,
      defaultLocation:dataObject.defaultLocation,
      defaultExperienceYears:dataObject.defaultExperienceYears,
      defaultExperienceMonths:dataObject.defaultExperienceMonths
      
    });
  };

  validateUserInput = () => {
    return true;
  };

  getCityList = () => {
    let cityListForSelect = [];
    const { locationList } = this.props;
    if(locationList === undefined)
    {
      CityList.push({ label: "Anywhere", value: "Anywhere" });
      CityList.map(item => {
        cityListForSelect.push({
          label: item.name + ", " + item.state,
          value: item.name
        });
      });
    }
    cityListForSelect = getLocationArray(locationList);
    return cityListForSelect;
  };

  getNumberList = maxValue => {
    let yearList = [];
    for (let i = 0; i <= maxValue; i++) {
      yearList.push({
        label: i,
        value: i
      });
    }
    return yearList;
  };

  getUnits = () => {
    return [
      { label: "Thousand", value: "Thousand" },
      { label: "Lacs", value: "Lacs" }
    ];
  };

  handleSelectChange = (value, event) => {
    console.log(value, event.name, Array.isArray(value));
    if (!Array.isArray(value)) {
      this.setState({
        [event.name]: value.value
      });
    } else if (Array.isArray(value)) {
      let list = [];
      list = value.map(item => {
        return item.value;
      });
      this.setState({
        [event.name]: list
      });
    }
  };

  handleNext = event => {
    const { handleNext } = this.props;
    const formValidated = this.validateUserInput();
    console.log(this.state.location);

    if (formValidated === true) {
      handleNext(this.state);
    }
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  render() {
    const { classes, activeStep, handleBack, steps} = this.props;
    const cityList = this.getCityList();
    return (
      <form>
        <div className={classes.margin}>
          <FormControl
            fullWidth
            className={(classes.margin, classes.textField)}
          >
            <InputLabel>Title / Designation</InputLabel>
            <Input
              name="title"
              value={this.state.title}
              endAdornment={
                <InputAdornment position="end">
                  <Title />
                </InputAdornment>
              }
              autoComplete={true}
              onChange={event => this.handleUserInput(event)}
            />
          </FormControl>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={3}>
            <Grid item xs={4} className={classes.lblArea}>
              Experience
            </Grid>
            <Grid item xs={4}>
              <Select
                name="experienceYears"
                defaultValue = {this.state.defaultExperienceYears}
                closeMenuOnSelect={true}
                options={this.getNumberList(20)}
                selectedValue={this.state.experienceYears}
                onChange={this.handleSelectChange}
                placeholder={"Select Years"}
                maxMenuHeight={100}
                styles={customStyles}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                name="experienceMonths"
                closeMenuOnSelect={true}
                defaultValue = {this.state.defaultExperienceMonths}
                options={this.getNumberList(12)}
                selectedValue={this.state.experienceMonths}
                onChange={this.handleSelectChange}
                placeholder={"Select Months"}
                maxMenuHeight={100}
                styles={customStyles}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container>
            <Grid item xs={12}>
              <Select
                name="location"
                defaultValue = {this.state.defaultLocation}
                closeMenuOnSelect={true}
                options={cityList}
                selectedValue={this.state.location}
                onChange={this.handleSelectChange}
                placeholder={"Select Prferred Location"}
                maxMenuHeight={100}
                isMulti={true}
                styles={customStyles}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container spacing={2}>
            <Grid item xs={3} className={classes.lblArea}>
              Expected Salary
            </Grid>
            <Grid item xs={7} className={classes.lblArea}>
              <IOSSlider
                name="expectedSalary"
                aria-label="Extected Salary"
                defaultValue={0}
                valueLabelDisplay="auto"
                aria-valuetext="Extected Salary"
                max={100}
                valueLabelFormat={value => {
                  return `${value} K`;
                }}
                onChange={(value, event) =>
                  this.handleSelectChange(value, event)
                }
              />
            </Grid>

            <Grid item xs={2} className={classes.lblArea}>
              Per Month
            </Grid>
          </Grid>
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
      </form>
    );
  }
}

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
const IOSSlider = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0"
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#bfbfbf",
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -8,
    "&:focus,&:hover,&$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow
      }
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50%)",
    top: -16,
    fontSize: 12,
    "& *": {
      background: "transparent",
      color: "#000"
    }
  },
  track: {
    height: 2
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf"
  }
})(Slider);

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
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  radioLabel: {
    paddingRight: 20
  },
  formControlLabel: {
    marginBottom: 0
  },
  lblArea: {
    display: "flex",
    alignItems: "center"
  }
});

export default withStyles(styles)(PersonalDetailsForm);

PersonalDetailsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  dataObject: PropTypes.object.isRequired
};
