import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table1 from './Table1'


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  
  class Tabs1 extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (
        <Paper>

<div style={{ flexGrow: 1, }}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
            <Tab label="All Vehicles" />
            <Tab label="Vehicles In (Oldsite)" />
              <Tab label="Vehicles Out (Oldsite)" />
              <Tab label="Vehicles In (Newsite)" />
              <Tab label="Vehicles Out (Newsite)" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><Table1 /></TabContainer>}
          {value === 1 && <TabContainer><Table1 /></TabContainer>}
          {value === 2 && <TabContainer><Table1 /></TabContainer>}
          {value === 3 && <TabContainer><Table1 /></TabContainer>}
          {value === 4 && <TabContainer><Table1 /></TabContainer>}
        </div>
        </Paper>
      );
    }
  }


const p1 = {
  padding: 10,
  margin: 5,
  width: 300,
  height: 120,
  backgroundColor: "red",
  textAlign: 'center'
};
const p2 = {
  padding: 10,
  margin: 5,
  width: 300,
  height: 120,
  backgroundColor: "purple" ,//0d47a1,
  textAlign: 'center'

};
const p3 = {
  padding: 10,
  margin: 5,
  width: 300,
  height: 120,
  backgroundColor: "blue",
  textAlign: 'center'

};

const p4 = {
  padding: 10,
  margin: 5,
  width: 300,
  height: 120,
  backgroundColor: "green",
  textAlign: 'center'

};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const Dashboard = props => {
  const { classes } = props;
  return (
    <div>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            {/* {[0, 1, 2, 3].map(value => ( */}
            <Grid item>
              <Paper style={p1} elevation={3}>
                <Typography variant="h6" style={{ color: "white" }}>
                  No. of Vehicles In (Oldsite)
                </Typography>

                <Typography
                  variant="h2"
                  component="h2"
                  style={{ color: "white" }}
                >
                  88888
                </Typography>

                <Typography component="p" style={{ color: "white" }}>
                  Number of Registered Users
                </Typography>
              </Paper>
            </Grid>

            <Grid item>
              <Paper style={p2} elevation={3}>
                <Typography variant="h6" style={{ color: "white" }}>
                  No. of Vehicle Out (Oldsite)
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  style={{ color: "white" }}
                >
                  36782
                </Typography>
                <Typography component="p" style={{ color: "white" }}>
                  Number of Registered Users
                </Typography>
              </Paper>
            </Grid>

            <Grid item>
              <Paper style={p3} elevation={3}>
                <Typography
                  variant="h6"
                  component="h4"
                  style={{ color: "white" }}
                >
                  No. of Vehicle In (Newsite)
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  style={{ color: "white" }}
                >
                  36782
                </Typography>
                <Typography component="p" style={{ color: "white" }}>
                  Number of Registered Users
                </Typography>
              </Paper>
            </Grid>

            <Grid item>
              <Paper style={p4} elevation={3}>
                <Typography
                  variant="h6"
                  component="h4"
                  style={{ color: "white" }}
                >
                  No. of Vehicle Out (Newsite)
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  style={{ color: "white" }}
                >
                  36782
                </Typography>
                <Typography component="p" style={{ color: "white" }}>
                  Number of Registered Users
                </Typography>
              </Paper>
            </Grid>

            {/* ))} */}
          </Grid>
        </Grid>
      </Grid>

      <Tabs1 />
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
