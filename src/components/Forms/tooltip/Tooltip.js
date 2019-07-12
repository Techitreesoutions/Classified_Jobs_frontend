import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// Material imports

import { withStyles } from "@material-ui/core/styles";

class ToolTip extends PureComponent {
  render() {
    const { title, children, classes } = this.props;
    return (
      <div
        data-title={title}
        className={`${classes.tooltip} ${classes.expand}`}
      >
        {children}
      </div>
    );
  }
}

const styles = theme => ({
  icon: {
    width: "0.9em"
  },
  tooltip: {
    "&:before, &:after": {
      display: "block",
      opacity: "0",
      pointerEvents: "none",
      position: "absolute"
    },
    "&:before": {
      background: theme.palette.contrast.main,
      borderRadius: 4,
      color: theme.palette.contrast.light,
      content: "attr(data-title)",
      fontSize: 10,
      fontFamily: theme.typography.fontFamily,
      padding: "4px 8px",
      bottom: 40
    }
  },
  expand: {
    "&:before": {
      transform: "scale3d(.2,.2,1)",
      transition: "all .2s ease-in-out"
    },
    "&:after": {
      transform: "translate3d(0,6px,0)",
      transition: "all .1s ease-in-out"
    },
    "&:hover:before, &:hover:after": {
      opacity: "1",
      transform: "scale3d(1,1,1)",
      zIndex: 1
    },
    "&:hover:after": {
      transition: "all .2s .1s ease-in-out"
    }
  }
});

export default withStyles(styles)(ToolTip);

ToolTip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  classes: PropTypes.object.isRequired
};
