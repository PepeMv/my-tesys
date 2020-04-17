import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@material-ui/core";
import uuid from "react-uuid";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  contenedorTituloSubtotal: {
    /* textAlign:'right' */
    textAlign: "left",
  },
}));

const MostrarDatosFacturacion = ({ data, setSelectDatoFacturacion }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data.length !== 0 ? (
            data.map((item) => (
              <div key={uuid()}>
                <Paper className={classes.paper} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={10}
                      className={classes.contenedorTituloSubtotal}
                    >
                      <Box fontWeight="fontWeightBold" m={1}>
                        <Typography variant="h4">
                          {item.nombre}
                        </Typography>
                      </Box>
                      <Box fontWeight="" ml={1}>
                        <Typography variant="h5">{item.numeroDocumento}</Typography>
                      </Box>
                      <Box fontWeight="" ml={1}>
                        <Typography variant="h5">{item.direccion}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={()=> setSelectDatoFacturacion(item)} >
                        <AssignmentTurnedInTwoToneIcon
                          fontSize="large"
                          color="secondary"
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
                <Divider />
              </div>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="warning">
                <Typography variant="h6">
                  No existen datos de facturacion!
                </Typography>
              </Alert>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.push("/datosFacturacion/nuevo")}
          >
            <Typography variant="h5"> Agreagr nuevos datos </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MostrarDatosFacturacion;
