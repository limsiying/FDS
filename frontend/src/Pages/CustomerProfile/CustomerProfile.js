import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import NavBar from "../../components/Navigation/Navigation";

import { AccountDetails, RewardPoints } from "./components";
import { Sidebar } from "../../layouts/Customer/components";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     //padding: theme.spacing(4),
//   },
// }));

class Account extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <RewardPoints />
            </Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <AccountDetails />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
