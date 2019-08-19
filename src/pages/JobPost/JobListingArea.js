import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import StackGrid from "react-stack-grid";

import JobPostingChip from "../../components/JobPostingChip";
import { withStyles } from "@material-ui/core/styles";

class JobListingArea extends Component {
  filterJobList = () => {
    const { jobList, filterObj } = this.props;
    console.log("filterObj", filterObj);
    let filteredJobList = jobList;
    if (filterObj.searchTerm && filterObj.searchTerm !== "") {
      filteredJobList = jobList.filter(o =>
        Object.keys(o).some(k =>
          typeof o[k] === "string"
            ? o[k].toLowerCase().includes(filterObj.searchTerm.toLowerCase())
            : ""
        )
      );
    }

    if (filterObj.location) {
      filteredJobList = filteredJobList.filter(o => {
        return o.location.find(element => filterObj.location.includes(element));
      });
    }
    if (filterObj.skills) {
      filteredJobList = filteredJobList.filter(o => {
        return o.skills.find(element => filterObj.skills.includes(element));
      });
    }
    if (filterObj.minSalary) {
      filteredJobList = filteredJobList.filter(o => {
        return o.expectedSalary > filterObj.minSalary;
      });
    }
    if (filterObj.maxSalary) {
      filteredJobList = filteredJobList.filter(o => {
        return o.expectedSalary < filterObj.maxSalary;
      });
    }

    if (filterObj.minExperience) {
      filteredJobList = filteredJobList.filter(o => {
        return o.experienceYears > filterObj.minExperience;
      });
    }
    if (filterObj.maxExperience) {
      filteredJobList = filteredJobList.filter(o => {
        return o.experienceYears < filterObj.maxExperience;
      });
    }

    console.log("filteredJobList 11", filteredJobList);
    return filteredJobList;
  };

  render() {
    const { jobList, classes } = this.props;
    let filteredJobList;
    if (jobList.length !== 0) {
      filteredJobList = this.filterJobList();
    }
    return (
      <StackGrid className={classes.jobItemArea} columnWidth={400}>
        {filteredJobList &&
          filteredJobList.map(data => {
            return <JobPostingChip key={data.id} jobItem={data} />;
          })}
      </StackGrid>
    );
  }
}

const styles = theme => ({
  container: {
    width: "100%"
  },
  jobItemArea: {    
    /*transition: "height 480ms ease-out 0s",*/
    padding:"0 0 100px 0",
    margin:"20px 0 0 0",
  }
});

const mapStateToProps = reducerObj => {
  const jobList = reducerObj.jobList.jobList;
  const filterObj = reducerObj.filterObj.filterObj;

  return { jobList, filterObj };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(JobListingArea));

JobListingArea.propTypes = {
  classes: PropTypes.object.isRequired,
  jobList: PropTypes.array.isRequired,
  filterObj: PropTypes.object.isRequired
};
