import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UnauthedUser } from "./types";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type SignUpFormProps = {
  onSubmit: (a: any) => void;
  onChange: any;
  errors: { message?: string; password?: string; username?: string };
  user: UnauthedUser;
  btnTxt: string;
  type: string;
  pwMask: any;
  onPwChange: any;
};

const SignUpForm = (props: SignUpFormProps) => {
  return (
    <div>
      {props.errors?.message && (
        <p style={{ color: "red" }}>{props.errors.message}</p>
      )}

      <form onSubmit={props.onSubmit}>
        <DialogTitle>Sign in with Bookface</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            name="username"
            label="Bookface Username"
            value={props.user.username}
            onChange={props.onChange}
            // errorText={props.errors.username}
            error={!!props.errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            size="small"
            type={props.type}
            name="password"
            label="Password"
            value={props.user.password}
            onChange={props.onPwChange}
            // errorText={props.errors.password}
            error={!!props.errors.username}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: "-10px 14px 14px 14px" }}
            fullWidth
            variant="contained"
            onClick={props.onSubmit}
          >
            Continue
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default SignUpForm;
