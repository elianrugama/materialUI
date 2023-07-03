import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Tabla() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ description: '', cost: '', price: '', quantity: '' });

  useEffect(() => {
    loadDataFromIndexedDB();
  }, []);

  const loadDataFromIndexedDB = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction('products', 'readonly');
      const objectStore = transaction.objectStore('products');
      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        setData(event.target.result);
      };

      request.onerror = (event) => {
        console.log('Error al cargar datos desde IndexedDB', event.target.error);
      };
    } catch (error) {
      console.log('Error al abrir la base de datos', error);
    }
  };

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('myDB', 1);

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('products')) {
          const objectStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('description', 'description', { unique: false });
          objectStore.createIndex('cost', 'cost', { unique: false });
          objectStore.createIndex('price', 'price', { unique: false });
          objectStore.createIndex('quantity', 'quantity', { unique: false });
        }
      };
    });
  };

  const saveDataToIndexedDB = async () => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction('products', 'readwrite');
      const objectStore = transaction.objectStore('products');
      const request = objectStore.add(formData);

      request.onsuccess = () => {
        loadDataFromIndexedDB();
        setFormData({ description: '', cost: '', price: '', quantity: '' });
      };

      request.onerror = (event) => {
        console.log('Error al guardar datos en IndexedDB', event.target.error);
      };
    } catch (error) {
      console.log('Error al abrir la base de datos', error);
    }
  };

  const deleteDataFromIndexedDB = async (id) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction('products', 'readwrite');
      const objectStore = transaction.objectStore('products');
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        loadDataFromIndexedDB();
      };

      request.onerror = (event) => {
        console.log('Error al eliminar datos de IndexedDB', event.target.error);
      };
    } catch (error) {
      console.log('Error al abrir la base de datos', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveDataToIndexedDB();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
        <input type="text" name="cost" placeholder="Costo" value={formData.cost} onChange={handleChange} />
        <input type="text" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
        <input type="text" name="quantity" placeholder="Cantidad" value={formData.quantity} onChange={handleChange} />
        <Button variant="text" type="submit">
          Guardar
          </Button>
    


        
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Costo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src="https://coder.clothing/images/stories/virtuemart/product/react-logo.png" alt="" 
                  height={50}/>
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.cost}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  
                  <Button variant="contained" onClick={() => handleEdit(product)}>
                    Editar
                  </Button>
                  <Button variant="contained" onClick={() => deleteDataFromIndexedDB(product.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Tabla;
