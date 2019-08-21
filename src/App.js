import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import LoadingScreen from "./pages/LoadingScreen";
import { loadJobList } from "./actions/JobListAction";
import { loadCandidateList } from "./actions/CandidateListAction";
import { loadSkillList } from "./actions/SkillListAction.js";
import './assets/scss/index.scss';
import { loadLocationList } from "./actions/LocationListAction";

class App extends Component {
  state = {
    loading: true
  };
  componentWillMount = () => {
    const { loadJobList, loadCandidateList, loadSkillList } = this.props;
    console.log("HC componentWillMount");
    this.setState({ loading: true });

    Promise.all([ loadJobList(), loadCandidateList(),loadSkillList(),loadLocationList() ])
    .then((responses) => {
      this.setState({
          loading: false
      });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          <div className={classes.appRoot}>
            {this.state.loading && <LoadingScreen />}
            {!this.state.loading && (
              <Switch>
                <Route
                  exact
                  path={"/"}
                  render={() => {
                    return <Redirect to={"/home"} />;
                  }}
                />
                <Route exact path={"/home"} component={Home} />
              </Switch>
            )}
            <Footer />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const styles = theme => ({
  appRoot: {
    width: "100%",
    backgroundColor:"#f2f2f2",
  }
});

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  { loadJobList, loadCandidateList,loadSkillList ,loadLocationList}
)(withStyles(styles)(App));

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loadJobList: PropTypes.func.isRequired,
  loadSkillList: PropTypes.func.isRequired,
  loadLocationList: PropTypes.func.isRequired,
  loadCandidateList: PropTypes.func.isRequired
};
