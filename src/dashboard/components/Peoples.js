/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import { Update } from '@material-ui/icons';
import axios from 'axios';
import tableIcons from 'components/tableIcons';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const batchLookUp = {
  201901: '19春季学期',
  201902: '19暑期第1批次',
  201903: '19暑期第2批次',
  201904: '19暑期第3批次',
  201905: '19秋季学期'
};

const batchColumn = (rowData) =>{
  if (rowData.批次) {
    for (const key of Object.keys(rowData.批次).sort().reverse()) {
      if (rowData.批次[key]) {
        return batchLookUp[key];
      } 
    }
  }
};

const batchFilter = (term, rowData) => {
  // console.log(term);
  if (rowData.批次) {
    return rowData.批次[term];
  }
  return false;
};

const changeBatchData = (newData) => {
  newData.批次 = {
    [newData.批次]: true
  };
};

export default function Peoples(props) {
  const classes = useStyles();
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_IP + "api/people")
      .then(res => res.json())
      .then(data => { setPeople(data); });
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
      {/* <Title>科服人员</Title> */}
      <MaterialTable
        icons={tableIcons}
        title="科服暑期批次人员名单"
        columns={[
          { title: '批次', field: '批次', lookup: batchLookUp, render: batchColumn, customFilterAndSearch: batchFilter},
          { title: '学号', field: '学号' },
          { title: '姓名', field: '姓名' },
          { title: "性别", field: "性别", lookup: { 男: '男', 女: '女' }  },
          { title: '院系', field: '院系' },
          { title: '联系电话', field: '联系电话' },
          { title: '电子邮件', field: '电子邮件' },
          { title: '住址', field: '住址' },
        ]}
        data={people}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                changeBatchData(newData);
                axios.post(process.env.REACT_APP_SERVER_IP + 'api/people', newData).then((res) => {
                  setPeople(prevPeople => 
                    prevPeople.concat(newData)
                  );
                }).catch((error) => {
                  console.error(error);
                })
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                changeBatchData(newData);
                axios.put(process.env.REACT_APP_SERVER_IP + `api/people/${oldData.学号}`, newData).then((res) => {
                  setPeople(prevPeople => 
                    prevPeople.map((item) => { return item === oldData ? newData : item; })
                  )
                }).catch((error) => {
                  console.log(error);
                })
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.delete(process.env.REACT_APP_SERVER_IP + `api/people/${oldData.学号}`).then((res) => {
                  setPeople(prevPeople => 
                    prevPeople.filter(item => ![oldData].includes(item))
                  );
                })
                resolve()
              }, 1000)
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          filtering: true
        }}
        // for refresh
        actions={[
          {
            icon: () => <Update></Update>,
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
              axios.get(process.env.REACT_APP_SERVER_IP + "api/people")
              .then(res => { setPeople(res.data); })
              .catch(err => console.error);
            },
          }
        ]}
      />
      </Container>
    </React.Fragment>
  );
}