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

class Header extends Component {
  state = {
    profileSubmitDialogOpen: false
  };

  handleSerachInput = event => {
    this.props.updateFilter({ searchTerm: event.target.value });
  };

  handleOpenSubmitProfile = event => {
    // Open Profile Submit Dialog
    this.setState({ profileSubmitDialogOpen: true });
  };

  handleCloseSubmitProfile = () => {
    this.setState({
      profileSubmitDialogOpen: false,
      jobSubmitDialogOpen: false
    });
  };

  render() {
    const { classes, currentTab } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Classified Jobs
            </Typography>
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
                  className={classes.orangeButton}
                  color="primary"
                  onClick={this.handleOpenSubmitProfile}
                >
                  SUBMIT YOUR PROFILE
                </Button>
              )}
              {currentTab === 1 && (
                <Button
                  variant="contained"
                  component="span"
                  className={classes.blueButton}
                  color="primary"
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
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: 25,
    color: theme.palette.primary.dark,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  appbar: {
    backgroundColor: theme.palette.primary.contrastText,
    boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.1)"
  },
  orangeButton: {
    margin: theme.spacing.unit,
    backgroundColor: "#FFC300"
  },
  blueButton: {
    margin: theme.spacing.unit,
    backgroundColor: "#9B83FB"
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { updateFilter }
)(withStyles(styles)(Header));

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired
};
