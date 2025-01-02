import React, {useState, useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { 	AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";



export default function ModalIdiomas({onSubmit}) {


    useEffect(( ) => {
      const fetchIdiomas = async () => {
        const response = await fetch("http://localhost:3000/pv-api/idiomas");
        const idiomas = (await response.json())
        setRowData(idiomas)
      }

      fetchIdiomas()

    }, [])

    const [rowData, setRowData] = useState() 
    const localeText = AG_GRID_LOCALE_ES;
    const [colDefs, setColDefs] = useState([
        {
          headerName: "Nombre",
          field: "nombre",
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
      const idioma_seleccionado = event.api.getSelectedRows()
      const valorarry = idioma_seleccionado.map(p => p.id)
      const valor = valorarry[0]
      setModalData(valor)
    }

		const handleSubmit = () => {
			onSubmit(modalData)
    }
  
    return (
      <div >
        <Button onPress={onOpen}>Selecciona Idioma</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark" hideCloseButton backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-blue-50">Selecciona Idioma</ModalHeader>
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
                  <Button color="danger" variant="light" onPress={onClose} >
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
  