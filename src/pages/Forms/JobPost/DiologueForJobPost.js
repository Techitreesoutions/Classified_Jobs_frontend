import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import JobPostingStepper from "./JobPostingStepper";
import DialogContent from "@material-ui/core/DialogContent";

class DiologueForJobPost extends Component {
  state = {
    spacing: "16"
  };

  DialogTitle = withStyles(theme => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500]
    }
  }))(props => {
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  render() {
    const { isOpenDialogue, handleClose } = this.props;

    return (
      <Dialog
        open={isOpenDialogue}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        handleClose={handleClose}
      >
        <DialogTitle id="simple-dialog-title" onClose={handleClose}>
          We are Hiring
        </DialogTitle>
        <DialogContent>
          <JobPostingStepper />
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = theme => ({});

export default withStyles(styles)(DiologueForJobPost);

DiologueForJobPost.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpenDialogue: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
