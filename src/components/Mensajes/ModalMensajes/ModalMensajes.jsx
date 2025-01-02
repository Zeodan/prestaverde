'use client '

import React, {useEffect, useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { 	AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";



export default function ModalMensajes({onSubmit}) {

  useEffect(( ) => {
    const fetchMensajes = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/mensajes`);
      const mensajes = (await response.json())
      setRowData(mensajes)
    }

    fetchMensajes()

  }, [])

    const [rowData, setRowData] = useState() 
    const localeText = AG_GRID_LOCALE_ES;
    const [colDefs, setColDefs] = useState([
        {
					headerName: "Prenombre",
					field: "prenombre",
					filter: true,
          checkboxSelection: true,
          headerCheckBoxSelection: true,
          floatingFilter: true,
          filter: true,
				},
				{
					headerName: "Contenido",
					field: "contenido",
					filter: true,
          checkboxSelection: true,
          headerCheckBoxSelection: true,
          floatingFilter: true,
          filter: true,
				},
    ])

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

		const [modalData, setModalData] = useState([])

    const valueChanged = (event) => {
      const mensajes_seleccionados = event.api.getSelectedRows()
      const valor = mensajes_seleccionados.map(p => p.id)
      setModalData(valor)
    }

		const handleSubmit = () => {
			onSubmit(modalData)
		}
  
    return (

      <div className='dark' >
        <Button onPress={onOpen}>Selecciona Mensaje</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark" hideCloseButton backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-blue-50">Selecciona Mensaje</ModalHeader>
                <ModalBody>
                  <div
                    className={"ag-theme-quartz-dark"}
                    style={{ height: 500 }} 
                  >
                    <AgGridReact 
                      localeText={localeText}
                      rowData={rowData}
                      columnDefs={colDefs}
                      rowSelection={'single'}
                      onSelectionChanged={valueChanged}
                      onGridReady={(params) => params.api.sizeColumnsToFit()}
                    />
                </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
  