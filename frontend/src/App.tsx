import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignUpContainer } from "./SignupForm/SignupContainer";
import { User } from "./SignupForm/types";
import { Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F26522",
    },
    secondary: {
      main: "#222222",
    },
  },
});

type Props = {};
type State = {
  user: User | undefined;
};
class App extends React.Component<Props> {
  state: State = {
    user: undefined,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.state.user && (
          <Paper style={{ margin: 16, padding: 8 }}>
            <h2>{`Welcome ${this.state.user.full_name}!`}</h2>
            <img
              src={this.state.user.avatar_medium}
              width={200}
              height={200}
              style={{ borderRadius: 10 }}
              alt="profile picture"
            />
            <h3>Your YC Profile</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <strong>
                <p>
                  {`Email `}
                  <a href={"mailto:" + this.state.user.email}>
                    {this.state.user.email}
                  </a>
                </p>
                <p>
                  {`Bookface Account`}{" "}
                  <a
                    href={`https://bookface.ycombinator.com/users/${this.state.user.id}`}
                  >
                    {this.state.user.id}
                  </a>
                </p>
              </strong>
            </div>
          </Paper>
        )}

        {!this.state.user && (
          <SignUpContainer
            onSuccess={(user: User) => this.setState({ user })}
          />
        )}
      </ThemeProvider>
    );
  }
}

export default App;
