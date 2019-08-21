import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import {
  FaRegHourglass,
  FaRegMoneyBillAlt,
  FaRegEnvelope,
  FaMobileAlt,
  FaRegBuilding,
  FaRegCommentDots
} from "react-icons/fa";
import { Chip, CardActions, Tooltip, IconButton } from "@material-ui/core";

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
    if (candidateItem.skills === undefined) {
      candidateItem.skills = [];
    }
    return candidateItem.skills.map(key => {
      return <Chip key={key} label={key} className={classes.skillsChip} />;
    });
  };

  getCandidateNameLabel = () => {
    const { candidateItem, classes } = this.props;
    if (candidateItem.hidePersonalInfo === true) {
      return <Typography>Confidencial</Typography>;
    } else if (!candidateItem.lastName) {
      return <Typography>{candidateItem.firstName}</Typography>;
    } else {
      return (
        <span className={classes.headerText}>
          <Typography variant="h6">
            {candidateItem.firstName} {candidateItem.lastName}
          </Typography>
        </span>
      );
    }
  };

  getCandidateSubHeader = () => {
    const { candidateItem } = this.props;

    return (
      <span>
        <Typography variant="body2">{candidateItem.title}</Typography>
      </span>
    );
  };

  getAction = () => {
    const { candidateItem } = this.props;

    if (candidateItem.hidePersonalInfo === true) {
      return (
        <IconButton aria-label="Information">
          <FaRegCommentDots />
        </IconButton>
      );
    } else {
      return;
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
              {candidateItem.firstName.charAt(0)}
            </Avatar>
          }
          title={this.getCandidateNameLabel()}
          subheader={this.getCandidateSubHeader()}
          action={this.getAction()}
        />

        <CardContent className={classes.cardContent}>
          <Typography variant="body2">{candidateItem.description}</Typography>
          <div className={classes.skillsArea}>{this.renderskillsChips()}</div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.candidateElements}>
            {candidateItem.experienceYears && (
              <span className={classes.candidateElementsSpan}>
                <HtmlTooltip title="Years of Experience">
                  <Typography variant="body2" className={classes.chipText}>
                    <FaRegHourglass className={classes.icon} />
                    {`${candidateItem.experienceYears}.${
                      candidateItem.experienceMonths
                    } Years`}
                  </Typography>
                </HtmlTooltip>
              </span>
            )}
            {candidateItem.expectedSalary && (
              <span className={classes.candidateElementsSpan}>
                <HtmlTooltip title="Expected Salary" placement="bottom-start">
                  <Typography variant="body2" className={classes.chipText}>
                    <FaRegMoneyBillAlt className={classes.icon} />
                    {`${candidateItem.expectedSalary} PM`}
                  </Typography>
                </HtmlTooltip>
              </span>
            )}

            {location && (
              <span className={classes.candidateElementsSpan}>
                <HtmlTooltip title="Preferred Location">
                  <Typography variant="body2" className={classes.chipText}>
                    <FaRegBuilding className={classes.icon} />
                    {location}
                  </Typography>
                </HtmlTooltip>
              </span>
            )}

            {candidateItem.hidePersonalInfo !== true && (
              <span>
                {candidateItem.phone && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip title="Contact Number">
                      <Typography variant="body2" className={classes.chipText}>
                        <FaMobileAlt className={classes.icon} />
                        {candidateItem.phone}
                      </Typography>
                    </HtmlTooltip>
                  </span>
                )}
                {candidateItem.email && (
                  <span className={classes.candidateElementsSpan}>
                    <HtmlTooltip
                      title="Email"
                      className={`${classes.tooltip} ${classes.expand}`}
                    >
                      <Typography variant="body2" className={classes.chipText}>
                        <FaRegEnvelope className={classes.icon} />
                        {candidateItem.email}
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
  actions: {
    margin: 0,
    padding: 0
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
    padding: "2px"
  },

  avatar: {
    backgroundColor: "#EE3672",
    color: "#fff",
    textTransform: "uppercase"
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
    margin: 0,
    padding: 0
  },

  icon: {
    margin: 5,
    fontSize: 16
  },
  chipText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px"
  },
  headerText: {
    display: "flex"
  }
});

export default withStyles(styles)(CandidateChip);

CandidateChip.propTypes = {
  candidateItem: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
