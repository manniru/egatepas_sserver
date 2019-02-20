import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const p1 = {
    // margin: 5,
    // padding: 5,
    // width: 300,
    // height: 400,
    // textAlign: "center"
  };

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


function Galleries(props) {
  const { classes, images } = props;
  console.log(images)

  return (
    <div className={classes.root}>
    <Paper style={p1} elevation={3}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Febuary</ListSubheader>
        </GridListTile>
        {
            (images.length>0) ?
            images.map(tile => (
          <GridListTile key={tile.downloadURL}>
            <img src={tile.downloadURL} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))
        : <h3>{'Loading...'}</h3>
        }
      </GridList>
      </Paper>
    </div>
  );
}

Galleries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Galleries);
