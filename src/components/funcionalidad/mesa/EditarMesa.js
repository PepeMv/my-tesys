import React, { useState, useEffect } from "react";
import AppFrame from "../../layout/AppFrame";
import { Formulario } from "../../layout/Formulario";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import {editarMesaAction} from './../../../actions/mesasActions';
import Spinner from "../../layout/Spinner";


const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: 12,
  },
}));

const EditarMesa = () => {

  const loading = useSelector((state) => state.mesas.loading);
  const mesaEditar = useSelector(
    (state) => state.mesas.mesaEditar
  );
  useEffect(() => {
    setMesa(mesaEditar);
    //eslint-disable-next-line
  }, [])
  const history = useHistory();
  const distpach = useDispatch();
  const classes = useStyles();
  const [mesa, setMesa] = useState({
    nombre: "",
    descripcion: "",
  });
  const [nombreerror, setNombreError] = useState({
    error: false,
    texto: "*",
  });
  const [descripcionerror, setDescripcionError] = useState({
    error: false,
    texto: "*",
  });
  const actualizarMesa = (e) => {
    setMesa({
      ...mesa,
      [e.target.name]: e.target.value,
    });
  };
  const { nombre, descripcion } = mesa;
  const enviarEditarMesa = () =>{
    if(nombre.trim()===""){
      setNombreError({
        error: true,
        texto: "Un nombre es requerido"
      });
    }else if (descripcion.trim()===""){
      setDescripcionError({
        error: true,
        texto: "Añade una descripcion de la mesa"
      });
    }else {
      setNombreError({
        error: false,
        texto: "*"
      });
      setDescripcionError({
        error: false,
        texto: "*"
      });
      //distpach
      distpach(editarMesaAction(mesa));
      //go back 
      history.goBack();
    }
  }
  const renderBody = () => (
    <Formulario>
      <Spinner active={loading} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            helperText={nombreerror.texto}
            error={nombreerror.error}
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={actualizarMesa}
            label={<Typography variant="h4"> Nombre </Typography>}
            style={{ width: "70%" }}
            fullWidth
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            helperText={descripcionerror.texto}
            error={descripcionerror.error}
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={actualizarMesa}
            label={<Typography variant="h4"> Descripción </Typography>}
            style={{ width: "70%" }}
            fullWidth
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth onClick={()=>enviarEditarMesa()} >
            <Typography variant="h5"> Guardar </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" color="primary" fullWidth onClick={()=>history.goBack()} >
            <Typography variant="h5"> Cancelar </Typography>
          </Button>
        </Grid>
      </Grid>
    </Formulario>
  );

  return <AppFrame titulo="Editar Mesa" body={renderBody()} />;
};

export default EditarMesa;
