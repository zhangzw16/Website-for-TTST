import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiFab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// table
import MaterialTable from 'material-table';
import tableIcons from 'components/tableIcons';
// axios
import axios from 'axios';
// show
import { getRecordArray, daysLookup } from 'dashboard/components/WorkingHours';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Fab = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  }
}))(MuiFab);

function convertNumber(newData) {
  newData.workingHours = Number(newData.workingHours);
  newData.scores = Number(newData.scores);
}

export default function EditHoursDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [workingRecordDays, setWorkingRecordDays] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const workingRecord = props.workingRecord;

  React.useEffect(() => {
    setWorkingRecordDays(getRecordArray('show', props.workingRecord));
  }, [props.workingRecord]);

  const handleClickOpen = () => {
    // console.log(getRecordArray('show', workingRecordDays))
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const commit = () => {
    for (let recordDay of workingRecordDays) {
      workingRecord.workingHours[recordDay.day] = recordDay.workingHours;
      workingRecord.scores[recordDay.day] = recordDay.scores;
    }
    delete workingRecord._id;
    workingRecord.confirm = false;
    workingRecord.comment = comment;
    console.log(workingRecord);
    axios.post(process.env.REACT_APP_SERVER_IP + 'api/working', workingRecord).then((res) => {
      setOpen(false);
    }).catch((error) => {
      console.log(error);
    })

  }
  const _handleCommentChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <div>
      <Tooltip title="申报工时" aria-label="申报工时">
        <Fab color="primary" aria-label="申报" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          申报工时和积分
        </DialogTitle>
        <DialogContent dividers>
          <MaterialTable
            components={{
              Container: props => <Paper {...props} elevation={0} />
            }}
            icons={tableIcons}
            columns={[
              { title: '日期', field: 'day', lookup: daysLookup },
              { title: '工时', field: 'workingHours', type: 'numeric' },
              { title: '积分', field: 'scores', type: 'numeric' }
            ]}
            data={workingRecordDays}
            title="本周工时和积分详情"
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    convertNumber(newData);
                    setWorkingRecordDays(prev =>
                      prev.concat(newData)
                    );
                    resolve()
                  }, 500)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    convertNumber(newData);
                    console.log(newData);
                    setWorkingRecordDays(prev =>
                      prev.map((item) => { return item === oldData ? newData : item; }))
                    resolve()
                  }, 500)
                }),
            }}
            options={{
              actionsColumnIndex: -1,
              search: false,
              paging: false
            }}
          />
          <TextField
            id="outlined-full-width"
            label="备注"
            style={{ margin: 8}}
            placeholder="备注"
            helperText="注意请先保存您的更改！请在这里填写您的其他信息"
            fullWidth
            margin="normal"
            variant="outlined"
            value={comment}
            onChange={_handleCommentChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={commit} color="primary">
            确认并提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
