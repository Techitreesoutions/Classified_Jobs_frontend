import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import StackGrid from "react-stack-grid";

import CandidateChip from "../../components/CandidateChip";
import { withStyles } from "@material-ui/core/styles";

class CandidateListingArea extends Component {
  filterCandidateList = () => {
    const { candidateList, filterObj } = this.props;
    console.log("filterObj", filterObj);
    let filteredCandidateList = candidateList;
    if (filterObj.searchTerm && filterObj.searchTerm !== "") {
      filteredCandidateList = candidateList.filter(o =>
        Object.keys(o).some(k =>
          typeof o[k] === "string"
            ? o[k].toLowerCase().includes(filterObj.searchTerm.toLowerCase())
            : typeof o[k] === "array"
            ? o[k].find(
                j => j.toLowerCase() === filterObj.searchTerm.toLowerCase()
              )
            : ""
        )
      );
    }

    if (filterObj.location) {
      filteredCandidateList = filteredCandidateList.filter(o => {
        return o.location.find(element => filterObj.location.includes(element));
      });
    }
    if (filterObj.skills) {
      filteredCandidateList = filteredCandidateList.filter(o => {
        return o.skills.find(element => filterObj.skills.includes(element));
      });
    }
    if (filterObj.minSalary) {
      filteredCandidateList = filteredCandidateList.filter(o => {
        return o.expectedSalary > filterObj.minSalary;
      });
    }
    if (filterObj.maxSalary) {
      filteredCandidateList = filteredCandidateList.filter(o => {
        return o.expectedSalary < filterObj.maxSalary;
      });
    }

    if (filterObj.minExperience) {
      filteredCandidateList = filteredCandidateList.filter(o => {
        return o.experienceYears > filterObj.minExperience;
      });
    }
    if (filterObj.maxExperience) {
      filteredCandidateList = filteredCandidateList.filter(o => {
        return o.experienceYears < filterObj.maxExperience;
      });
    }

    console.log("filteredCandidateList 11", filteredCandidateList);
    return filteredCandidateList;
  };

  render() {
    const { candidateList, classes } = this.props;
    let filteredCandidateList;
    if (candidateList.length !== 0) {
      filteredCandidateList = this.filterCandidateList();
    }
    return (
      <StackGrid className={classes.candidateItemArea} columnWidth={400}>
        {filteredCandidateList &&
          filteredCandidateList.map(data => {
            return <CandidateChip key={data.id} candidateItem={data} />;
          })}
      </StackGrid>
    );
  }
}

const styles = theme => ({
  container: {
    width: "100%"
  },
  candidateItemArea: {
    marginTop: 20,
    position: "relative",
    transition: "height 480ms ease-out 0s"
  }
});

const mapStateToProps = reducerObj => {
  const candidateList = reducerObj.candidateList.candidateList;
  const filterObj = reducerObj.filterObj.filterObj;

  return { candidateList, filterObj };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(CandidateListingArea));

CandidateListingArea.propTypes = {
  classes: PropTypes.object.isRequired,
  candidateList: PropTypes.array.isRequired,
  filterObj: PropTypes.object.isRequired
};
