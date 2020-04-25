import React from "react";
import { useDispatch } from "react-redux";
import echo from "./../../config/sockets";
import {
  agregarPedidoyDetallePrepararLiveAction,
  agregarPedidoEntregaryQuitarPedidoPrepararAction,
  quitarPedidoDePrepararAction,
  quitarPedidoDeEntregarAction,
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

  echo
    .channel("pedidoCancelado")
    .listen("PedidoCancelado", (ev) =>
      borrarPedidoCancelado(ev.pedido, ev.detalles)
    );

  const borrarPedidoCancelado = (pedido, detalle) => {
    if (pedido !== null && detalle !== null) {
      dispatch(quitarPedidoDePrepararAction(pedido, detalle));
    }
  };

  echo
    .channel("pedidoEntregado")
    .listen("PedidoEntregado", (ev) =>
      borrarPedidoEntregado(ev.pedido, ev.detalles)
    );

  const borrarPedidoEntregado = (pedido, detalle) => {
    if (pedido !== null && detalle !== null) {
      dispatch(quitarPedidoDeEntregarAction(pedido, detalle));
    }
  };

  return <div></div>;
};

export default Listener;
