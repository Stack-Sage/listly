
import React from 'react';
import Navbar from './components/navbar'; // Import Navbar here
import Body from './components/body'; // Use capitalized component name
import { VortexDemo } from './components/background';
import Footer from './components/footer';

const App = () => {
  return (
    <>
  
    <Navbar />

     
      
      <div className="flex h-screen absolute top-0 w-full  inset-0 bg-black  ">
      <VortexDemo/>
      
      <div className=" absolute  flex items-center bottom-2  w-full justify-center   text-violet-500 hover:text-violet-800  bg-transparent z-10 ">
      <Footer/>
      </div>
      </div>

     
     
     
      
    </>
  );
}

export default App;
