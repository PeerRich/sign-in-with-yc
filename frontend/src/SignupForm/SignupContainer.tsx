import React, { Component } from "react";
import SignUpForm from "./SignupForm";
import { UnauthedUser, User } from "./types.js";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { validateSignUpForm } from "./validate";

type Props = {
  onSuccess: (user: User) => void;
};
type State = {
  errors: object;
  user: UnauthedUser;
  btnTxt: string;
  type: string;
};

// TODO: we should turn this into hooks, classes are a bit outdated
export class SignUpContainer extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: "",
      },
      btnTxt: "show",
      type: "password",
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event: any) {
    const user = this.state.user;
    user.username = event.target.value;

    this.setState({
      user,
    });
  }

  pwHandleChange(event: any) {
    const user = this.state.user;
    user.password = event.target.value;

    this.setState({
      user,
    });
  }

  submitSignup = async (user: UnauthedUser) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    };
    const response = await fetch("http://localhost:8080/login", requestOptions);
    try {
      const data = await response.json();
      this.props.onSuccess(data);
    } catch (err) {
      this.setState({
        errors: { message: "Authentication Failed" },
      });
    }
  };

  validateForm(event: any) {
    console.log("submitting?");
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        username: this.state.user.username,
        password: this.state.user.password,
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors,
      });
    }
  }

  pwMask(event: any) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  render() {
    return (
      <div>
        <SignupDialog>
          <SignUpForm
            onSubmit={this.validateForm}
            onChange={this.handleChange}
            onPwChange={this.pwHandleChange}
            errors={this.state.errors}
            user={this.state.user}
            btnTxt={this.state.btnTxt}
            type={this.state.type}
            pwMask={this.pwMask}
          />
        </SignupDialog>
      </div>
    );
  }
}

function SignupDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Sign in with Bookface
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        {props.children}
      </Dialog>
    </>
  );
}
