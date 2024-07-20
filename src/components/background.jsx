import React from "react";
import { Vortex } from "./ui/vortex";
import Body from "./body";

export function VortexDemo() {
  return (
    <div className="w-screen mx-auto  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center  px-2 md:px-10 py-4 w-full h-full"
        
        
      >
      
      <div>
         <Body/>
      </div>
         
        
       
      </Vortex>
    </div>
  );
}
