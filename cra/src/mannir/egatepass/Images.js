import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
});

function AdvancedGridList(props) {
  const { classes, images } = props;

  return (
    <div className={classes.root}>
    <Paper style={{width: 400}} elevation={3}>
      {images.length > 0 ? (
        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
          {images.map(tile => (
            <GridListTile
              key={tile.img}
              cols={tile.in ? 2 : 1}
              rows={tile.in ? 2 : 1}
            >
              <img src={tile.downloadURL} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
                actionIcon={
                  <IconButton className={classes.icon}>
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      ) : (
        <h3>{"Loading..."}</h3>
      )}
      </Paper>
    </div>
  );
}

AdvancedGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvancedGridList);
