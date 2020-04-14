import Swal from "sweetalert2";

export const alerta = (mensaje, icono) =>
 ( Swal.fire({    
    icon: icono,
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  }));
