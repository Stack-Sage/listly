import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const App = () => {
  return (
    <div className="  items-center flex justify-center  bg-black ">
      <HoverBorderGradient
        containerClassName="my-custom-container"
        className="my-custom-class"
        duration={1.5}
        clockwise={false}
        
      >
        ListLy - List your todo's
      </HoverBorderGradient>
    </div>
  );
};

export default App;
