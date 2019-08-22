import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from 'dashboard/Deposits';
import axios from 'axios';
import Plot from 'react-plotly.js';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paperCol: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  paperRow: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  fixedHeight: {
    height: 150,
  },
  fab: {
    margin: theme.spacing(1),
  }
}))

const days = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'];
const daysToShow = ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]

function getMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(d.setDate(diff));

  const dd = String(monday.getDate()).padStart(2, '0');
  const mm = String(monday.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = monday.getFullYear();
  return yyyy + mm + dd;
}

function getDate() {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();
  return yyyy + '.' + mm + '.' + dd;
}

function calHours(type, workingRecord) {
  let result = 0;
  if (type === 'hours') {
    if (workingRecord.workingHours) {
      for (let day of days) {
        result += workingRecord.workingHours[day] ? workingRecord.workingHours[day] : 0;
      }
    }
  } else if (type === 'scores') {
    if (workingRecord.scores) {
      for (let day of days) {
        result += workingRecord.scores[day] ? workingRecord.scores[day] : 0;
      }
    }
  } else if (type === 'days') {
    if (workingRecord.workingHours) {
      for (let day of days) {
        result += workingRecord.workingHours[day] > 0 ? 1 : 0;
      }
    }
  }
  return result;
}

function getRecordArray(type, workingRecord) {
  let res = [];
  if (type === 'hours') {
    if (workingRecord.workingHours) {
      for (let day of days) {
        res.push(workingRecord.workingHours[day] ? workingRecord.workingHours[day] : 0);
      }
    }
  } else if (type === 'scores') {
    if (workingRecord.scores) {
      for (let day of days) {
        res.push(workingRecord.scores[day] ? workingRecord.scores[day] : 0);
      }
    }
  }
  return res;
}

export default function WorkingHours(props) {
  const classes = useStyles();
  const fixedHeightColPaper = clsx(classes.paperCol, classes.fixedHeight);
  const fixedHeightRowPaper = clsx(classes.paperRow, classes.fixedHeight)
  const [workingRecord, setWorkingRecord] = React.useState({});

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_IP + `api/working/${props.studentID}?week=${getMonday()}`).then((res) => {
      console.log(res.data);
      setWorkingRecord(res.data);
    }).catch(err => {
      console.error(err);
    })
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2} justify="center">
          {/* 本周工时 */}
          <Grid item xs={8} md={6} lg={3}>
            <Paper className={fixedHeightColPaper}>
              <Deposits title='工时' value={calHours('hours', workingRecord)} date={getDate()} />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={8} md={6} lg={3}>
            <Paper className={fixedHeightColPaper}>
              <Deposits title='积分' value={calHours('scores', workingRecord)} date={getDate()} />
            </Paper>
          </Grid>
          <Grid item xs={8} md={6} lg={3}>
            <Paper className={fixedHeightColPaper}>
              <Deposits title='出勤天数' value={calHours('days', workingRecord)} date={getDate()} />
            </Paper>
          </Grid>
          <Grid item xs={8} md={6} lg={3}>
            <Paper className={fixedHeightRowPaper}>
              <Tooltip title="申报工时" aria-label="申报工时">
                <Fab color="primary" aria-label="申报" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="确认工时" aria-label="确认工时">
                <Fab color="secondary" aria-label="确认" className={classes.fab}>
                  <SaveIcon />
                </Fab>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper>
              <Plot useResizeHandler={true} style={{ width: '100%', height: '100%' }}
                data={[
                  {
                    name: '工时',
                    type: 'bar',
                    x: daysToShow,
                    y: getRecordArray('hours', workingRecord)
                  },
                  {
                    name: '积分',
                    type: 'bar',
                    x: daysToShow,
                    y: getRecordArray('scores', workingRecord)
                  }
                ]}
                layout={{
                  barmode: 'group',
                  // autosize: true,
                  title: '本周工时积分图表'
                }}
              />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={6}>
            <Paper>
              <Plot useResizeHandler={true} style={{width: '100%'}}
                data={[
                  {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                  },
                  { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{ autosize: true, title: '本周积分图表' }}
              />
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  )
}