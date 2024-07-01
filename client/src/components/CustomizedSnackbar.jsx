import * as React from 'react';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbar({open,close}) {
//   const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

 

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={close}>
        <Alert
          onClose={close}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          cart added successful!
        </Alert>
      </Snackbar>
    </div>
  );
}
