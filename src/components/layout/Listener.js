import React from "react";
import { useDispatch } from "react-redux";
import echo from "./../../config/sockets";
import {
  agregarPedidoyDetallePrepararLiveAction,
  agregarPedidoEntregaryQuitarPedidoPrepararAction,
} from "../../actions/pedidosActions";
const Listener = () => {
  const dispatch = useDispatch();
  echo
    .channel("pedidos")
    .listen("NuevoPedido", (ev) =>
      agregarPedidoDetalleLive(ev.pedido, ev.detalles)
    );

  //agregar al state los pedidos que vienen por sockets
  const agregarPedidoDetalleLive = (pedido, detalle) => {
    //console.log(echo.socketId());
    //self.reg
    if (pedido !== null && detalle !== null) {
      dispatch(agregarPedidoyDetallePrepararLiveAction(pedido, detalle));
    }
  };

  echo
    .channel("pedidoPreparado")
    .listen("PedidoPreparado", (ev) =>
      agregarPedidoAEntregar(ev.pedido, ev.detalles)
    );

  const agregarPedidoAEntregar = (pedido, detalle) => {
    if (pedido !== null && detalle !== null) {
      dispatch(
        agregarPedidoEntregaryQuitarPedidoPrepararAction(pedido, detalle)
      );
    }
  };
  return <div></div>;
};

export default Listener;
