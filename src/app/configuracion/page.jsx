
import React from "react";
import Image from "next/image";


export default function Configuracion() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-3rem)]'>
      <label className="mb-10 text-blue-200 text-2xl">Configuracion</label>
      <Image  
      src={'https://res.cloudinary.com/digypbibv/image/upload/v1735735816/tmsdpvigzjsu0kuzkf8p.png'}
          width={800} 
          height={800} 
          alt="background image"/>
    </div>
      
  );
}