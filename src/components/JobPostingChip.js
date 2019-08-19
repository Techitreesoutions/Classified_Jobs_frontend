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
  FaRegGem,
  FaRegMoneyBillAlt,
  FaRegEnvelope,
  FaMobileAlt,
  FaRegBuilding
} from "react-icons/fa";
import {  Chip, CardActions, Tooltip  } from "@material-ui/core";

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
          title={jobItem.title}
          subheader={this.getCompanyNameLabel()}
        />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardDesc}>{jobItem.description}</Typography>
          <div className={classes.skillsArea}>{this.renderskillsChips()}</div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.candidateElements}>
            <span className={classes.candidateElementsSpan}>
              <HtmlTooltip title="Years of Experience">                
                <Typography variant="body2" className={classes.chipText}>
                    <FaRegGem className={classes.icon} />
                    {this.getExperienceLabel()}
                  </Typography>
              </HtmlTooltip>
            </span>

            <span className={classes.candidateElementsSpan}>
              <HtmlTooltip title="Offered Salary" placement="bottom-start">
                <Typography variant="body3" className={classes.chipText}>
                    <FaRegMoneyBillAlt className={classes.icon} />
                    {this.getSalaryLabel()}
                 </Typography>
              </HtmlTooltip>
            </span>

            {location && (
              <span className={classes.candidateElementsSpan}>
                <HtmlTooltip title="Preferred Location">
                
                   <Typography variant="body4" className={classes.chipText}>
                    <FaRegBuilding className={classes.icon} />
                    {location}
                 </Typography>
                </HtmlTooltip>
              </span>
            )}
            {jobItem.hidePersonalInfo !== true && (
              <span>
                {jobItem.phone && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip title="Contact Number">
                    <Typography variant="body5" className={classes.chipText}>
                      <FaMobileAlt className={classes.icon} />
                      {jobItem.phone}
                  </Typography>
                    </HtmlTooltip>
                  </span>
                )}
                {jobItem.email && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip
                      title="Email"
                      className={`${classes.tooltip} ${classes.expand}`}
                    >
                      <Typography variant="body5" className={classes.chipText}>
                      <FaRegEnvelope className={classes.icon} />
                      {jobItem.email}
                  </Typography>
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
    boxShadow: "none",
    height: "fit-content",
    border: "1px solid #9d2e6a",
    "&:hover": {
      boxShadow: "0px 4px 5px -1px rgba(158,158,158,0.8)"
    }
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
    backgroundColor: "#898a98",
    color: "#666",
    height: "auto",
    padding: "2px",
    color:"#fff",
  },

  avatar: {
    backgroundColor: "#EE3672", color:'#fff', textTransform:"uppercase",
    
  },
  chipAvatar:{
    backgroundColor: "transparent",
    width:"auto",
    height:"auto",
    margin:"0",
    color:"#666"
  },
  candidateElements: {
    padding: "0 10px",
    margin: "5px 0 0 0",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fafafa",
    borderTop: "1px solid #ececec",
    width: "100%"
  },
  candidateElementsSpan: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "left",
    display: "inline-block",
    padding: 5
    
  },
  chip: {
    justifyContent: "left",
    border: "0",
    margin: "0",
    padding: "0",
  },
  cardDesc:{
    color:"#666",
    fontSize:"11px",
  },
  icon: {
    margin: "5px",
    fontSize: "16px"
  },
  chipText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize:"13px"
  },
  headerText: {
    display: "flex"
  }
});

export default withStyles(styles)(JobPostingChip);

JobPostingChip.propTypes = {
  jobItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
