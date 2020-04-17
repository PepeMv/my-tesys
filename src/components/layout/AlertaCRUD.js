import Swal from "sweetalert2";

export const alerta = (mensaje, icono) =>
  Swal.fire({
    icon: icono,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });

export const alertaConfirmacion = (titulo, subtitulo, icono) =>
  Swal.fire(` ${titulo}`, `${ subtitulo }`, `${ icono }`);
