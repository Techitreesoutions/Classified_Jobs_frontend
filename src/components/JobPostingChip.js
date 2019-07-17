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
import red from "@material-ui/core/colors/red";

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
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: 12,
    border: "1px solid #dadde9"
  }
}))(Tooltip);

class JobPostingChip extends Component {
  renderskillsChips = () => {
    const { jobItem, classes } = this.props;
    return jobItem.skills.map(key => {
      return (
        <Chip
          key={key}
          label={key}
          className={classes.skillsChip}
          color="primary"
        />
      );
    });
  };

  getSalaryLabel = () => {
    const { jobItem } = this.props;
    if (jobItem.hideSalary === true) {
      return "Best as per industry standard";
    } else {
      return `${jobItem.salaryOfferMin} - ${jobItem.salaryOfferMax} PM`;
    }
  };
  getExperienceLabel = () => {
    const { jobItem } = this.props;
    if (jobItem.hideExperience === true) {
      return "No preference";
    } else {
      return `${jobItem.experienceMin} - ${jobItem.experienceMax} Years`;
    }
  };

  getCompanyNameLabel = () => {
    const { jobItem } = this.props;
    if (jobItem.hidePersonalInfo === true) {
      return "Company Name - Confidencial";
    } else {
      return jobItem.copmanyName;
    }
  };

  render() {
    const { jobItem, classes } = this.props;
    let location,companyName;
    if (jobItem.location) {
      location = jobItem.location.join(", ");
    }
    if (jobItem.copmanyName) {
      companyName = jobItem.location.join(", ");
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
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.getCompanyNameLabel()}
          subheader={jobItem.title}
        />

        <CardContent className={classes.cardContent}>
          <Typography>{jobItem.description}</Typography>
          <div className={classes.skillsArea}>{this.renderskillsChips()}</div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.jobElements}>
            <span className={classes.jobElementsSpan}>
              <HtmlTooltip title="Years of Experience">
                <Chip
                  avatar={
                    <Avatar>
                      <FaSuitcase />
                    </Avatar>
                  }
                  label={this.getExperienceLabel()}
                  className={classes.chip}
                  variant="outlined"
                  color="primary"
                />
              </HtmlTooltip>
            </span>

            <span className={classes.jobElementsSpan}>
              <HtmlTooltip title="Offered Salary" placement="bottom-start">
                <Chip
                  avatar={
                    <Avatar>
                      <FaRupeeSign />
                    </Avatar>
                  }
                  label={this.getSalaryLabel()}
                  className={classes.chip}
                  variant="outlined"
                  color="primary"
                />
              </HtmlTooltip>
            </span>

            {location && (
              <span className={classes.jobElementsSpan}>
                <HtmlTooltip title="Preferred Location">
                  <Chip
                    avatar={
                      <Avatar>
                        <FaMapMarkerAlt />
                      </Avatar>
                    }
                    label={location}
                    className={classes.chip}
                    variant="outlined"
                    color="primary"
                  />
                </HtmlTooltip>
              </span>
            )}
            {jobItem.hidePersonalInfo !== true && (
              <span>
                {jobItem.phone && (
                  <span className={classes.jobElementsSpan}>
                    <HtmlTooltip title="Contact Number">
                      <Chip
                        avatar={
                          <Avatar>
                            <FaMobile />
                          </Avatar>
                        }
                        label={jobItem.phone}
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                      />
                    </HtmlTooltip>
                  </span>
                )}
                {jobItem.email && (
                  <span className={classes.jobElementsSpan}>
                    <HtmlTooltip
                      title="Email"
                      className={`${classes.tooltip} ${classes.expand}`}
                    >
                      <Chip
                        avatar={
                          <Avatar>
                            <FaEnvelopeOpen />
                          </Avatar>
                        }
                        color="primary"
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
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
    height: "fit-content"
  },
  cardHeader: {
    paddingBottom: 0
  },
  cardContent: {
    padding: "10px 20px 0px 20px"
  },
  skillsArea: {
    margin: "10px 0 0 0",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  skillsChip: {
    marginRight: 5
  },

  avatar: {
    backgroundColor: red[500]
  },
  jobElements: {
    padding: "10px 0px 0px 0px",
    borderTop: "1px solid #ddd",
    margin: "10px 0 0 0",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  jobElementsSpan: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    display: "inline-block",
    paddingRight: 5,
    paddingBottom: 10
  },

  chip: {
    minWidth: 80,
    justifyContent: "left"
  }
});

export default withStyles(styles)(JobPostingChip);

JobPostingChip.propTypes = {
  jobItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
