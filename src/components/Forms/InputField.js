import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
//Material imports
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import ToolTip from "./tooltip/Tooltip";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    //this prevents the onChange handle to be called too frequently.
    this.onChange = _.debounce(this.props.onChangeHandle, 250);
  }

  componentWillReceiveProps(nextprops) {
    this.setState({ value: nextprops.value });
  }

  /**
   * Usually we let Redux handle all state but as we're debouncing we'll manage it locally in the interim
   *
   * @param {object} event
   */
  handleChange = event => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      this.onChange(val);
    });
  };

  render() {
    const {
      label,
      icon,
      loading,
      classes,
      errorMessage,
      toolTipTitle,
      multiline,
      rows,
      rootStyles,
      type,
      // this object is for Redux-Form support, it spreads to child
      input,
      noGutterBottom,
      id,
      autoComplete,
      largeHelperMessage,
      enableIconButtonHoverStyle,
      inputAdornmentClass
    } = this.props;
    const large = rows > 3;
    return (
      <FormControl
        className={
          noGutterBottom ? classes.noGutterContainer : classes.container
        }
        error={errorMessage ? true : false}
      >
        <InputLabel>{label}</InputLabel>
        <Input
          id={id ? id : label}
          value={this.state.value}
          endAdornment={
            !large ? (
              <InputAdornment
                position="end"
                classes={
                  multiline
                    ? {
                        root: `${
                          classes.adornmentMultiline
                        } ${inputAdornmentClass}`
                      }
                    : {}
                }
              >
                <IconButton
                  className={
                    classes.iconButton && !enableIconButtonHoverStyle
                      ? classes.iconButtonNoHover
                      : ""
                  }
                  component="div"
                  tabIndex="-1"
                  disableRipple={true}
                >
                  {icon}
                </IconButton>
              </InputAdornment>
            ) : null
          }
          onChange={this.handleChange}
          disabled={loading}
          multiline={multiline}
          rows={rows}
          style={rootStyles}
          classes={{
            input: classes.input,
            inputMultiline: classes.inputMultiline,
            multiline: classes.multilineRoot
          }}
          type={type}
          autoComplete={autoComplete}
          {...input}
          inputProps={{
            "aria-label": label
          }}
        />
        <FormHelperText
          component="div"
          className={`${largeHelperMessage && classes.fixedHeightError}`}
        >
          {errorMessage}
        </FormHelperText>
      </FormControl>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex"
  },
  noGutterContainer: {
    display: "flex"
  },
  input: {
    "&:-webkit-autofill": {
      boxShadow: "0 0 0 2px white inset",
      color: theme.palette.primary.main,
      fontSize: 14,
      width: "100%"
    }
  },
  iconButton: {
    width: 15,
    height: 15
  },
  iconButtonNoHover: {
    padding: 0,
    "&:hover": {
      backgroundColor: "unset"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    width: "17px"
  },
  multilineRoot: {
    padding: "6px 0 3px"
  },
  inputMultiline: {
    overflow: "auto"
  },
  adornmentMultiline: {
    alignItems: "flex-start",
    marginBottom: 2
  },
  "@media screen and (min-width: 450px)": {
    container: {
      marginBottom: 2
    }
  },
  "@media screen and (max-width: 450px)": {
    adornmentMultiline: {
      alignItems: "unset",
      height: "unset"
    }
  },
  fixedHeightError: {
    height: 6
  }
});

export default withStyles(styles)(InputField);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  errorMessage: PropTypes.string,
  toolTipTitle: PropTypes.string.isRequired,
  onChangeHandle: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  rootStyles: PropTypes.object,
  type: PropTypes.string,
  input: PropTypes.object,
  noGutterBottom: PropTypes.bool,
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  largeHelperMessage: PropTypes.bool,
  enableIconButtonHoverStyle: PropTypes.bool,
  inputAdornmentClass: PropTypes.string
};

InputField.defaultProps = {
  noGutterBottom: false,
  autoComplete: "off",
  largeHelperMessage: false,
  enableIconButtonHoverStyle: true,
  inputAdornmentClass: ""
};
