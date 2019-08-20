/* eslint-disable no-script-url */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import tableIcons from '../components/tableIcons';
import axios from 'axios';
import { Update } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Peoples() {
  const classes = useStyles();
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_IP + "api/people")
      .then(res => res.json())
      .then(data => { setPeople(data); });
  }, []);

  return (
    <React.Fragment>
      {/* <Title>科服人员</Title> */}
      <MaterialTable
        icons={tableIcons}
        title="科服暑期批次人员名单"
        columns={[
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
          pageSize: 10,
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
    </React.Fragment>
  );
}