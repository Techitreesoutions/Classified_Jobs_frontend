import React, { PureComponent } from "react";
//Material imports
import CircularProgress from "@material-ui/core/CircularProgress";

class Loading extends PureComponent {
  render() {
    return <CircularProgress size={50} style={{ alignSelf: "center" }} />;
  }
}

export default Loading;
