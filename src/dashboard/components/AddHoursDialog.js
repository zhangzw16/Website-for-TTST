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
// table
import MaterialTable from 'material-table';
import tableIcons from 'components/tableIcons';

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

export default function AddHoursDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [workingRecord, setWorkingRecord] = React.useState([]);

  React.useEffect(() => {
    setWorkingRecord(props.workingRecord);
  }, [props.workingRecord]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            icons={tableIcons}
            columns={[
              { title: '日期', field: 'day' },
              { title: '工时', field: 'workingHours', type: 'numeric' },
              { title: '积分', field: 'scores', type: 'numeric' }
            ]}
            data={workingRecord}
            title="本周工时和积分详情"
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setWorkingRecord(prev => 
                      prev.concat(newData)
                    );
                    resolve()
                  }, 500)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setWorkingRecord(prev => 
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
           {/* TODO 在下面添加操作说明 */}
          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            确认并提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
