const db = require('../db');

const crearVenta = async (req, res) => {
  const { cliente_id, descuento, productos } = req.body;

  try {
    let montoTotal = 0;
    let detalles = [];

    for (const item of productos) {
      const [producto] = await db.query('SELECT precio FROM productos WHERE id = ?', [item.producto_id]);
      const precio = producto[0].precio;
      const subtotal = precio * item.cantidad;
      montoTotal += subtotal;

      detalles.push({
        producto_id: item.producto_id,
        precio,
        cantidad: item.cantidad,
        subtotal
      });
    }

    const montoConDescuento = montoTotal - (montoTotal * (descuento / 100));
    const [result] = await db.query(
      'INSERT INTO ventas (cliente_id, descuento, monto_final) VALUES (?, ?, ?)',
      [cliente_id, descuento, montoConDescuento]
    );

    const ventaId = result.insertId;

    for (const d of detalles) {
      await db.query(
        'INSERT INTO detalle_venta (venta_id, producto_id, precio_venta, cantidad, subtotal) VALUES (?, ?, ?, ?, ?)',
        [ventaId, d.producto_id, d.precio, d.cantidad, d.subtotal]
      );
    }

    res.status(201).json({ message: 'Venta registrada', ventaId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar la venta' });
  }
};

module.exports = { crearVenta };
