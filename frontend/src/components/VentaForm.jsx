import { useState } from 'react';
import axios from 'axios';

const VentaForm = () => {
  const [clienteId, setClienteId] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [productos, setProductos] = useState([
    { producto_id: '', cantidad: 1 }
  ]);

  const handleProductoChange = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][campo] = valor;
    setProductos(nuevosProductos);
  };

  const agregarProducto = () => {
    setProductos([...productos, { producto_id: '', cantidad: 1 }]);
  };

  const enviarVenta = async () => {
    try {
      const venta = {
        cliente_id: parseInt(clienteId),
        descuento: parseFloat(descuento),
        productos: productos.map(p => ({
          producto_id: parseInt(p.producto_id),
          cantidad: parseInt(p.cantidad)
        }))
      };
      const res = await axios.post('http://localhost:3001/ventas', venta);
      alert('Venta registrada con ID: ' + res.data.ventaId);
    } catch (err) {
      alert('Error al registrar venta');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Registrar Venta</h2>
      <label>Cliente ID:</label>
      <input value={clienteId} onChange={e => setClienteId(e.target.value)} />
      <br />
      <label>Descuento (%):</label>
      <input value={descuento} onChange={e => setDescuento(e.target.value)} />
      <br />

      <h3>Productos</h3>
      {productos.map((p, i) => (
        <div key={i}>
          <input
            placeholder="Producto ID"
            value={p.producto_id}
            onChange={e => handleProductoChange(i, 'producto_id', e.target.value)}
          />
          <input
            placeholder="Cantidad"
            value={p.cantidad}
            onChange={e => handleProductoChange(i, 'cantidad', e.target.value)}
          />
        </div>
      ))}
      <button onClick={agregarProducto}>+ Producto</button>
      <br /><br />
      <button onClick={enviarVenta}>Registrar Venta</button>
    </div>
  );
};

export default VentaForm;
