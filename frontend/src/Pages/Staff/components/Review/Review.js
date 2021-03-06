import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import { List, data } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const RestaurantReview = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container item spacing={4}>
        <Grid item lg={12} sm={10} xl={12} xs={12}>
          <List data={data} />
        </Grid>
      </Grid>
    </div>
  );
};

class Review extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid item lg={6} sm={6} xl={6} xs={12}></Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <RestaurantReview></RestaurantReview>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Review;
