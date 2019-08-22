/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>本周{props.title}</Title>
      <Typography component="p" variant="h4">
        {props.value}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {props.date}
      </Typography>
      {/* <div>
        <Link color="primary" >
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
