import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function AppFrame({ titulo, body }) {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography
          component="div"
          style={{ backgroundColor: "#F5F5F5", height: "100%" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {titulo ? (
                <Typography variant="h3" className={classes.paper}>
                  <Box fontWeight="fontWeightBold" mt={12}>{titulo}</Box>
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              {body}
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Fragment>
  );
}

export default AppFrame;
