'use client';

import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TablaMensajes() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchMensajes = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/mensajes`);
      const mensajes = await response.json();
      setRowData(mensajes);
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/mensajes`);
    };

    fetchMensajes();
  }, []);

  const handleSave = async (data) => {
    const { idioma, ...dataToSend } = data;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/mensajes/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      const result = await response.json();
      console.log('Registro guardado exitosamente:', result);
      toast.success('Cambios guardados', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/mensajes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el registro');
      }

      const result = await response.json();
      console.log('Registro eliminado exitosamente:', result);
      toast.error('Registro eliminado', {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRowData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };

  const localeText = AG_GRID_LOCALE_ES;

  const [colDefs, setColDefs] = useState([
    {
      headerName: "Prenombre",
      field: "prenombre",
      filter: true,
      floatingFilter: true,
      editable: true,
    },
    {
      headerName: "Contenido",
      field: "contenido",
      filter: true,
      floatingFilter: true,
      editable: true,
    },
    {
      headerName: "Idioma",
      field: "idioma.nombre",
      editable: true,
    },
    {
      headerName: "Acciones",
      field: "",
      cellRenderer: (params) => {
        return (
          <div> 
            <Button className='h-7 mr-2' onClick={() => handleSave(params.data)}>Guardar</Button> 
            <Button className='h-7' color="danger" onClick={() => handleDelete(params.data.id)}>Eliminar</Button>
          </div>
        );
      },
    },
  ]);

  return (
    <div className={"ag-theme-quartz-dark"} style={{ height: 795, zIndex: 1000 }}>
      <ToastContainer />
      <AgGridReact
        localeText={localeText}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={'single'}
        pagination={true}
        paginationPageSize={20}
        paginationPageSizeSelector={[10, 20, 30, 40, 50]}
        onGridReady={(params) => params.api.sizeColumnsToFit()}
      />
    </div>
  );
}