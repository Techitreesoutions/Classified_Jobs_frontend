import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import SelectOptions from "../components/SelectOptions";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class SelectRange extends Component {
  render() {
    const { classes, min, max, step, onChange, theme } = this.props;
    return (
      <Range
        min={min}
        max={max}
        step={step}
        dots={true}
        onAfterChange={onChange}
        defaultValue={[min, max]}
        tipFormatter={value => `${value}`}
        allowCross={false}
        handleStyle={{
          border: 0,
          height: 30,
          width: 30,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: theme.palette.primary.dark
        }}
        railStyle={{ backgroundColor: "red", height: 10 }}
        trackStyle={{ backgroundColor: "blue", height: 10 }}
      />
    );
  }
}

const styles = theme => ({});

export default withStyles(styles, { withTheme: true })(SelectRange);

SelectRange.propTypes = {
  classes: PropTypes.object.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired
};
