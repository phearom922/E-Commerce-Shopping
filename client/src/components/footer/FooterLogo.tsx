import React from "react";
import { ShoppingBag } from "lucide-react";
import Assets from "../../../public/Asset14.png"

const FooterLogo: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        
        <div className="h-8 w-8">
          <img className="w-full" src={Assets} alt="" />
        </div>
        <span className="text-lg font-medium text-gray-800">
          cambo shopping
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Enjoy the biggest sale
        <br />
        of your life.
      </p>
    </div>
  );
};

export default FooterLogo;
