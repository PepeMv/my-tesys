import Pusher from "pusher-js";
import Echo from "laravel-echo";


window.Pusher = Pusher;
export default window.Echo = new Echo({
  broadcaster: "pusher",
  key: "ASDASD2121",
  wsHost: "https://52.1.160.159",
  wsPort: 6001,
  disableStats: true,
  encrypted: true
});
//escuchar pedidos nuevos

//agregar al state los pedidos que vienen por sockets
/* const agregarPedidoDetalleLive = ($pedido, $detalle) => {
  if($pedido !== null && $detalle !== null){
    dispatch( agregarPedidoyDetallePrepararLiveAction($pedido, $detalle) );
  }    
} */


