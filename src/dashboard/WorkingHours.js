import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Deposits from 'dashboard/Deposits';
// material-kit-react
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

export default function WorkingHours() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs md={8} lg={9}>
              {/* <Typography variant="h5" component="h3">
                This is a sheet of paper.
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your application.
              </Typography> */}
              <Card style={{ width: "20rem" }}>
                <CardHeader color="warning">Featured</CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Special title treatment</h4>
                  <p>
                    With supporting text below as a
                    natural lead-in to additional content.
                  </p>
                </CardBody>
              </Card>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {/* <Peoples /> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}