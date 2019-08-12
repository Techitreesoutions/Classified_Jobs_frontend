import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/Info";

import {
  FaSuitcase,
  FaRupeeSign,
  FaEnvelopeOpen,
  FaMobile,
  FaMapMarkerAlt
} from "react-icons/fa";
import { Chip, CardActions, Tooltip } from "@material-ui/core";

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#fff", 
    fontSize:"9px",
    color: "#666",
    maxWidth: 220,
    border: "1px solid #ddd"
  }
}))(Tooltip);

class JobPostingChip extends Component {
  renderskillsChips = () => {
    const { jobItem, classes } = this.props;
    if(jobItem.skills === undefined)
    {
      jobItem.skills = [];
    }
    return jobItem.skills.map(key => {
      return (
        <Chip
          key={key}
          label={key}
          className={classes.skillsChip}
        />
      );
    });
  };

  getSalaryLabel = () => {
    const { jobItem } = this.props;
    if (jobItem.hideSalary === true || !jobItem.salaryOfferMax || !jobItem.salaryOfferMin) {
      return "Best as per industry standard";
    } else {
      return `${jobItem.salaryOfferMin} - ${jobItem.salaryOfferMax} PM`;
    }
  };
  getExperienceLabel = () => {
    const { jobItem } = this.props;
    if (jobItem.hideExperience === true || !jobItem.experienceMin || !jobItem.experienceMax) {
      return "No preference";
    } else {
      return `${jobItem.experienceMin} - ${jobItem.experienceMax} Years`;
    }
  };


  getCompanyNameLabel = () => {
    const { jobItem } = this.props;
    if (jobItem.hidePersonalInfo === true || !jobItem.companyName) {
      return "Company Name - Confidencial";
    } else {
      return jobItem.companyName;
    }
  };

  render() {
    const { jobItem, classes } = this.props;
    let location,companyName;
    if (jobItem.location) {
      location = jobItem.location.join(", ");
    }
    
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar=
             {companyName && (
              <Avatar aria-label="profilePic" className={classes.avatar}>
              companyName.charAt(0)
               </Avatar>
            )}
         
          title={this.getCompanyNameLabel()}
          subheader={jobItem.title}
        />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardDesc}>{jobItem.description}</Typography>
          <div className={classes.skillsArea}>{this.renderskillsChips()}</div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.candidateElements}>
            <span className={classes.candidateElementsSpan}>
              <HtmlTooltip title="Years of Experience">
                <Chip
                  avatar={
                    <Avatar className={classes.chipAvatar}>
                      <FaSuitcase />
                    </Avatar>
                  }
                  label={this.getExperienceLabel()}
                  className={classes.chip}
                  variant="outlined"
                />
              </HtmlTooltip>
            </span>

            <span className={classes.candidateElementsSpan}>
              <HtmlTooltip title="Offered Salary" placement="bottom-start">
                <Chip
                  avatar={
                    <Avatar className={classes.chipAvatar}>
                      <FaRupeeSign />
                    </Avatar>
                  }
                  label={this.getSalaryLabel()}
                  className={classes.chip}
                  variant="outlined"
                />
              </HtmlTooltip>
            </span>

            {location && (
              <span className={classes.candidateElementsSpan}>
                <HtmlTooltip title="Preferred Location">
                  <Chip
                    avatar={
                      <Avatar className={classes.chipAvatar}>
                        <FaMapMarkerAlt />
                      </Avatar>
                    }
                    label={location}
                    className={classes.chip}
                    variant="outlined"
                  />
                </HtmlTooltip>
              </span>
            )}
            {jobItem.hidePersonalInfo !== true && (
              <span>
                {jobItem.phone && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip title="Contact Number">
                      <Chip
                        avatar={
                          <Avatar className={classes.chipAvatar}>
                            <FaMobile />
                          </Avatar>
                        }
                        label={jobItem.phone}
                        className={classes.chip}
                        variant="outlined"
                      />
                    </HtmlTooltip>
                  </span>
                )}
                {jobItem.email && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip
                      title="Email"
                      className={`${classes.tooltip} ${classes.expand}`}
                    >
                      <Chip
                        avatar={
                          <Avatar className={classes.chipAvatar}>
                            <FaEnvelopeOpen />
                          </Avatar>
                        }
                        label={jobItem.email}
                        className={classes.chip}
                        variant="outlined"
                      />
                    </HtmlTooltip>
                  </span>
                )}
              </span>
            )}
          </div>
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
   maxWidth: 400,
    minHeight: 100,
    margin: 10,
    padding:0,
    boxShadow: "none",
    height: "fit-content",
    border:"1px solid #efefef",
    "&:hover": {
      boxShadow:"0px 4px 5px -1px rgba(158,158,158,0.8)"
    },
  },
  
  actions:{
    margin:0,
    padding:0
  },
  cardHeader: {
    padding: "10px"
  },
  cardContent: {
    padding: "10px"
  },
  skillsArea: {
    margin: "10px 0 0 0",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  skillsChip: {
    marginRight: 5,
    backgroundColor:"#f5f5f5",
    color:"#c7c7c7", height:"auto",
    padding:"2px"
  },

  avatar: {
    backgroundColor: "#EE3672",
    
  },
  chipAvatar:{
    backgroundColor: "transparent",
    width:"auto",
    height:"auto",
    margin:"0",
    color:"#c7c7c7"
  },
  candidateElements: {
    padding: "0 10px",
    margin: "5px 0 0 0",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor:"#fafafa",
    width:"100%",
    borderTop:"1px solid #ececec",
  },
  candidateElementsSpan: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
    display: "inline-block",
    paddingRight: 5,
    
  },
  chip: {
    justifyContent: "left", border:"0", margin:0, padding:0,
  },
  cardDesc:{
    color:"#666",
    fontSize:"11px",
  }
});

export default withStyles(styles)(JobPostingChip);

JobPostingChip.propTypes = {
  jobItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
