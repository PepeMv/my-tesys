import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1)
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  orangeL: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  orangeS: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

function AvatarPersonalizado({ nombreAvatar, size }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {nombreAvatar ? (
        size === "large" ? (
          <Avatar className={(classes.orangeL)}>
            <Typography variant="h3">{nombreAvatar}</Typography>
          </Avatar>
        ) : (
          <Avatar className={(classes.orangeS )}>
            <Typography variant="h6">{nombreAvatar}</Typography>
          </Avatar>
        )
      ) : size === "small" ? (
        <Avatar src="/broken-image.jpg" className={classes.smallAvatar} />
      ) : (
        <Avatar src="/broken-image.jpg" className={classes.largeAvatar} />
      )}
    </div>
  );
}

export default AvatarPersonalizado;
