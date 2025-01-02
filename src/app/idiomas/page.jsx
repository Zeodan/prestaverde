import React from 'react'
import TablaIdiomas from '@/components/Idiomas/TablaIdiomas/TablaIdiomas'
import { Card, CardHeader, CardBody, Divider, Link } from '@nextui-org/react'
import { FaLanguage, FaPlus  } from 'react-icons/fa'

export default function Idiomas() {
  return (
    <Card className="dark">
          <CardHeader className="flex">
            <div className="flex gap-3 items-center">
              <FaLanguage />
              Idiomas
            </div>
            <div className="ml-96">
              <Link  href="/idiomas/nuevo_idioma" className=" gap-1 text-slate-300" isBlock >
                  <FaPlus />
                  Nuevo Idioma
              </Link>
            </div>
            
          </CardHeader>
          <Divider />
          <CardBody>
            <TablaIdiomas />
          </CardBody>
        </Card>
    
  )
}