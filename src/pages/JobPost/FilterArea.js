import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { updateFilter } from "../actions/FilterAction";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { Grid, Typography } from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";
import Select from "react-select";
import { getSkillsArray, getLocationArray } from "../util/utilityFunctions";

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

class FilterArea extends Component {
  componentDidMount = () => {
    const { jobList } = this.props;
    this.setState({
      skillsList: getSkillsArray(jobList),
      locationList: getLocationArray(jobList)
    });
  };

  getExperienceArray = () => {
    let experienceRangeArr = [];
    experienceRangeArr.push({ label: "Fresher", value: "Fresher" });
    for (var i = 1; i < 10; i++) {
      experienceRangeArr.push({ label: i + " Year", value: i });
    }
    return experienceRangeArr;
  };

  state = {
    single: null,
    location: null,
    skills: null,
    minsalary: null,
    maxsalary: null,
    experience: [0, 20],
    expectedSalary: [0, 100],
    skillsList: [],
    locationList: []
  };

  handleSelectChange = (value, event) => {
    console.log("handleSelectChange", value, event.name);
    if (!Array.isArray(value)) {
      this.setState({
        [event.name]: value.value
      });
      this.props.updateFilter({ [event.name]: value.value });
    } else if (Array.isArray(value)) {
      let list = "";
      list = value.map(item => {
        return item.value;
      });
      this.setState({
        [event.name]: list
      });
      this.props.updateFilter({ [event.name]: list });
    }

    /*switch (name) {
      case "location":
        this.props.updateFilter({ location: list });
        break;
      case "skills":
        this.props.updateFilter({ skills: list });
        break;
    }*/
  };

  handleSalaryRangeChange = (event, value) => {
    this.setState({
      expectedSalary: value
    });
    console.log("Salary", value[0], value[1]);
    this.props.updateFilter({
      minSalary: value[0] * 1000,
      maxSalary: value[1] * 1000
    });
  };
  handleExperienceRangeChange = (event, value) => {
    this.setState({
      experience: value
    });
    console.log("Experience", value[0], value[1]);
    this.props.updateFilter({
      minExperience: value[0],
      maxExperience: value[1]
    });
  };

  updateRangeValues(name, value) {}

  render() {
    const { classes, theme, jobList } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Grid container spacing={8} className={classes.gridSelect}>
            <Grid item xs={3}>
              <Select
                name="location"
                closeMenuOnSelect={true}
                options={this.state.locationList}
                selectedValue={this.state.location}
                onChange={this.handleSelectChange}
                placeholder={"Select Location"}
                maxMenuHeight={200}
                styles={customStyles}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                name="skills"
                closeMenuOnSelect={true}
                options={this.state.skillsList}
                selectedValue={this.state.skills}
                onChange={this.handleSelectChange}
                placeholder={"Select Skills"}
                maxMenuHeight={200}
                styles={customStyles}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="range-slider" gutterBottom>
                Expected Salary
              </Typography>
              <Slider
                aria-label="range-slider"
                name="expectedSalary"
                value={this.state.expectedSalary}
                onChange={this.handleSalaryRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelFormat={value => {
                  return `${value} K`;
                }}
                max={100}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="range-slider" gutterBottom>
                Experience (Years)
              </Typography>
              <Slider
                aria-label="range-slider"
                name="experience"
                value={this.state.experience}
                onChange={this.handleExperienceRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelFormat={value => {
                  return `${value}`;
                }}
                max={20}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "85%",
    zIndex: 99
  },
  gridSelect: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const mapStateToProps = state => {
  const jobList = state.jobList.jobList;
  return { jobList };
};

export default connect(
  mapStateToProps,
  { updateFilter }
)(withStyles(styles, { withTheme: true })(FilterArea));

FilterArea.propTypes = {
  classes: PropTypes.object.isRequired,
  jobList: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired
};
