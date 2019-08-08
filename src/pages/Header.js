import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import { updateFilter } from "../actions/FilterAction";
import Button from "@material-ui/core/Button";

import DialogueForForms from "./Forms/Candidate/DialogueForForms";
import DialogueForJobPost from "./Forms/JobPost/DiologueForJobPost";
import { createCandidate } from "../actions/CandidateListAction";
import { createJob } from "../actions/JobListAction";
class Header extends Component {
  state = {
    profileSubmitDialogOpen: false,
    jobSubmitDialogOpen:false
  };

  handleSerachInput = event => {
    this.props.updateFilter({ searchTerm: event.target.value });
  };

  handleOpenSubmitProfile = event => {
    // Open Profile Submit Dialog
    this.setState({ profileSubmitDialogOpen: true });
  };

  handleOpenJobPost = event => {
    // Open Job submit Dialog
    this.setState({ jobSubmitDialogOpen: true});
  };

  handleCloseSubmitProfile = () => {
    this.setState({
      profileSubmitDialogOpen: false,
      jobSubmitDialogOpen: false
    });
  };

  handleSave = (formObj) => {
    this.props.createCandidate(formObj,()=>{
      }); 
  };

  handleJobSave = (formObj) => {
    this.props.createJob(formObj,()=>{
      }); 
  };

  render() {
    const { classes, currentTab } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar className={classes.toolBar}>
           
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={this.handleSerachInput}
              />
            </div>
            <div className={classes.grow} />

            <div>
              {currentTab === 0 && (
                <Button
                  variant="contained"
                  component="span"
                  className={classes.SbtnPro}
                  color="SbtnPro"
                  onClick={this.handleOpenSubmitProfile}
                >
                  SUBMIT YOUR PROFILE
                </Button>
              )}
              {currentTab === 1 && (
                <Button
                  variant="contained"
                  component="span"
                  className={classes.SbtnJob}
                  color="SbtnJob"
                  onClick={this.handleOpenJobPost}
                >
                  SUBMIT A JOB
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMenu}
        {this.renderMobileMenu}
        <DialogueForForms
          isOpenDialogue={this.state.profileSubmitDialogOpen}
          handleClose={this.handleCloseSubmitProfile}
          handleSave = {this.handleSave}
        />
        <DialogueForJobPost 
        isOpenDialogue={this.state.jobSubmitDialogOpen}
        handleClose={this.handleCloseSubmitProfile}
        handleSave={this.handleJobSave}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%", boxShadow:"none", minHeight:"32px", padding:"10px 0 0 0", backgroundColor:"#fff",
  },
  grow: {
    flexGrow: 1
  },
  toolBar:{
    minHeight:"32px",
  },
  search: {
    position: "relative",
    borderRadius: 25,
    color: theme.palette.primary.dark,
    backgroundColor: fade("#f6f6f6", 0.15),
    "&:hover": {
      backgroundColor: fade("#f2f2f2", 0.25)
    },
    border:"1px solid #ddd",
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 4,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:"#666"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    borderRadius: 25
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    transition: theme.transitions.create("width"),
    color:"#666",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  appbar: { backgroundColor:"#fff", boxShadow:"none"},
  SbtnPro:{
    backgroundColor: "#EE3672",
    borderRadius:4, color:"#fff"
  },
  SbtnJob:{
    backgroundColor: "#6E389B",
    borderRadius:4, color:"#fff"
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { updateFilter,createCandidate, createJob}
)(withStyles(styles)(Header));

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired,
  createCandidate:PropTypes.func.isRequired,
  createJob:PropTypes.func.isRequired
};
