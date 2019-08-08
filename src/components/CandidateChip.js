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
    backgroundColor: "#fff",
    color: "#666",
    maxWidth: 220,
    fontSize: 9,
    border: "1px solid #ddd"
  }
}))(Tooltip);

class CandidateChip extends Component {
  renderskillsChips = () => {
    const { candidateItem, classes } = this.props;
    if(candidateItem.skills == undefined)
    {
      candidateItem.skills = [];
    }
    return candidateItem.skills.map(key => {
      return (
        <Chip
          key={key}
          label={key}
          className={classes.skillsChip}
        />
      );
    });
  };

  getCandidateNameLabel = () => {
    const { candidateItem, classes } = this.props;
    if (candidateItem.hidePersonalInfo === true) {
      return "Candidate Name - Confidencial";
    } else if(!candidateItem.lastName) {
      return `${candidateItem.firstName}`;
    }
    else
    {
      return `${candidateItem.firstName} ${candidateItem.lastName}`;
    }
  };

  render() {
    const { candidateItem, classes } = this.props;
    let location;
    if (candidateItem.location) {
      location = candidateItem.location.join(", ");
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="profilePic" className={classes.avatar}>
              {/* {candidateItem.firstName} */}
              {candidateItem.firstName.charAt(0)}
            </Avatar>
          }
          
          title={this.getCandidateNameLabel()}
          subheader={candidateItem.title}
        />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardDesc}>{candidateItem.description}</Typography>
          <div className={classes.skillsArea}>{this.renderskillsChips()}</div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.candidateElements}>
          {candidateItem.experienceYears &&
            <span className={classes.candidateElementsSpan}>
              <HtmlTooltip title="Years of Experience">
                <Chip 
                  avatar={
                    <Avatar className={classes.chipAvatar}>
                      <FaSuitcase />
                    </Avatar>
                  }
                  label={`${candidateItem.experienceYears}.${
                    candidateItem.experienceMonths
                  }`}
                  className={classes.chip}
                  variant="outlined"
                />
              </HtmlTooltip>
            </span>
          }
            {candidateItem.expectedSalary && (
              <span className={classes.candidateElementsSpan}>
                <HtmlTooltip title="Expected Salary" placement="bottom-start">
                  <Chip
                    avatar={
                      <Avatar className={classes.chipAvatar}>
                        <FaRupeeSign />
                      </Avatar>
                    }
                    label={`${candidateItem.expectedSalary} PM`}
                    className={classes.chip}
                    variant="outlined"
                  />
                </HtmlTooltip>
              </span>
            )}

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
            
            {candidateItem.hidePersonalInfo !== true && (
              <span>
                {candidateItem.phone && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip title="Contact Number">
                      <Chip
                        avatar={
                          <Avatar className={classes.chipAvatar}>
                            <FaMobile />
                          </Avatar>
                        }
                        label={candidateItem.phone}
                        className={classes.chip}
                        variant="outlined"
                      />
                    </HtmlTooltip>
                  </span>
                )}
                {candidateItem.email && (
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
                        label={candidateItem.email}
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
    color:"#666", height:"auto",
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
    width:"100%"
  },
  candidateElementsSpan: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
    display: "inline-block",
    paddingRight: 5,
    
  },

  chip: {
    justifyContent: "left", border:"0", margin:0, padding:0
  },
  cardDesc:{
    color:"#666",
    fontSize:"11px"
  }
});

export default withStyles(styles)(CandidateChip);

CandidateChip.propTypes = {
  candidateItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
