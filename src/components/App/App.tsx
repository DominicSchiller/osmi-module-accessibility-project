import React, { Component, FunctionComponent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.scss";
import { Senso } from "../Senso/Senso";

export const Header: FunctionComponent = () => (
  <aside>
    <header>
      <h1>Accessible Senso</h1>
      <Box>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </Box>
    </header>
  </aside>
);

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Senso />
      </div>
    );
  }
}
