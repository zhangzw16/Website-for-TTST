/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [people, setPeople] = React.useState(null);
  
  React.useEffect(() => {
    fetch("http://" + process.env.REACT_APP_SERVER_IP + ":8008/people")
      .then(res => res.json())
      .then(data => { setPeople(data); });
  }, []);

  return (
    <React.Fragment>
      <Title>科服人员</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>学号</TableCell>
            <TableCell>姓名</TableCell>
            <TableCell>院系</TableCell>
            <TableCell>联系电话</TableCell>
            <TableCell>电子邮件</TableCell>
            <TableCell>住址</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(people || []).map(row => (
            <TableRow>
              <TableCell>{row.学号}</TableCell>
              <TableCell>{row.姓名}</TableCell>
              <TableCell>{row.院系}</TableCell>
              <TableCell>{row.联系电话}</TableCell>
              <TableCell>{row.电子邮件}</TableCell>
              <TableCell>{row.住址}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}