import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { updateFilter } from "../actions/FilterAction";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { Grid, Typography } from "@material-ui/core";
import Slider from "@material-ui/lab/Slider";
import Select from "react-select";
import { getAllSkillsArray, getAllLocationArray } from "../util/utilityFunctions";

const RangeSlider = withStyles({
  root: {
    color: "#fff",
    height: 4
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    marginTop: -4,
    marginLeft: -8,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 0px)",
    color: "#EE3672"
  },
  track: {
    height: 4,
    borderRadius: 2
  },
  rail: {
    height: 4,
    borderRadius: 2
  }
})(Slider);

class FilterArea extends Component {
  componentDidMount = () => {
   
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
    expectedSalary: [0, 100]
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
    const { classes } = this.props;
    let { locationList, skillList } = this.props;
   
     skillList = getAllSkillsArray(skillList)
       locationList =  getAllLocationArray(locationList)
    
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Grid container spacing={8} className={classes.gridSelect}>
            <Grid item xs={3}>
              <Select
                name="location"
                closeMenuOnSelect={true}
                options={locationList}
                selectedValue={this.state.location}
                onChange={this.handleSelectChange}
                placeholder={"Select Location"}
                className={classes.Slt}
              />
            </Grid>
            <Grid item xs={2}>
              <Select
                name="skills"
                closeMenuOnSelect={true}
                options={skillList}
                selectedValue={this.state.skills}
                onChange={this.handleSelectChange}
                placeholder={"Select Skills"}
                className={classes.Slt}
                // maxMenuHeight={200}
                // styles={customStyles}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography
                id="range-slider"
                variant="body2"
                className={classes.rangSlidertxt}
              >
                Expected Salary
              </Typography>
              <RangeSlider
                aria-label="range-slider"
                name="expectedSalary"
                value={this.state.expectedSalary}
                onChange={this.handleSalaryRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                //ValueLabelComponent={this.state.expectedSalary}
                // aria-label="custom thumb label"
                valueLabelFormat={value => {
                  return `${value} K`;
                }}
                max={100}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography
                id="range-slider"
                variant="body2"
                className={classes.rangSlidertxt}
              >
                Experience (Years)
              </Typography>
              <RangeSlider
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
    position: "relative",
    margin: "60px 0 0 0",
    padding: "12px 0",
    background: "linear-gradient(40deg,#c53364,#622774)!important" //"linear-gradient(40deg,#1bcdef,#5b2478 )!important" //
  },
  container: {
    width: "85%",
    zIndex: 99
  },
  gridSelect: {
    padding: "0",
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
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing / 2}px ${theme.spacing / 4}px`
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
    padding: `${theme.spacing(1)}px ${theme.spacing(1) * 2}px`
  },
  singleValue: {
    fontSize: 13
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 13
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: 24
  },
  Slt: {
    fontSize: "11px"
  },
  rangSlidertxt: {
    color: "#fff",
    padding: "5px 0 0 0"
  }
});

const mapStateToProps = reducerObj => {
  console.log("reducer",reducerObj);
  const skillList = reducerObj.skillList.skillList;
  const locationList = reducerObj.locationList.locationList;
  return { skillList,locationList };
};

export default connect(
  mapStateToProps,
  { updateFilter }
)(withStyles(styles, { withTheme: true })(FilterArea));

FilterArea.propTypes = {
  classes: PropTypes.object.isRequired,
  locationList: PropTypes.array.isRequired,
  skillList: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired
};
