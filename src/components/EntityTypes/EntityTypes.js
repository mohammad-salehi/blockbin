import React, { useEffect, useState } from "react";
import "./style.css";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'; // Importing the fallback icon

const EntityTypes = (props) => {
  const [PersianEntityNumber, SetPersianEntityNumber] = useState(0);
  const [EntityNumber, SetEntityNumber] = useState(0);
  const [imageError, setImageError] = useState(false); // State to track if image fails to load

  useEffect(() => {
    GetRequest(`${serverAddress}/entity/entities/?category=${props.id}&is_iranian=false&page_number=1&page_size=1000`)
      .then((response) => {
        if (response.status === 200) SetEntityNumber(response.data.data.count);
        else SetEntityNumber(0);
      })
      .catch((err) => console.log(err));

    GetRequest(`${serverAddress}/entity/entities/?category=${props.id}&is_iranian=true&page_number=1&page_size=1000`)
      .then((response) => {
        if (response.status === 200) SetPersianEntityNumber(response.data.data.count);
        else if (response.status === 204) SetPersianEntityNumber(0);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fallback image error handler
  const handleImageError = () => {
    setImageError(true); // Set the error state to true when image fails to load
  };

  return (
    <div
      className="bg-gradient-main shadow-lg font-iranSans text-sm rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
      style={{ "--dynamic-color": props.NetworkColor }}
    >
      <a className="block cursor-pointer" href={`/panel/entity/types/${props.id}`}>
        {/* Row 1: Title + Logo (Aligned in mobile view) */}
        <div className="flex flex-nowrap items-center justify-between gap-4 p-4">
          {/* Title */}
          <div className="min-w-0">
            <h4
              className="text-textColor font-semibold truncate hover:text-primary transition duration-300"
              title={props.name}
            >
              {props.name}
            </h4>
          </div>

          {/* Logo */}
          <div className="shrink-0">
            {imageError ? (
              <ImageNotSupportedIcon className="w-16 h-16 text-gray-400" /> // Show icon if image fails to load
            ) : (
              <img
                src={props.logo}
                className="w-16 h-16 object-contain rounded-full border-2 border-white shadow-md"
                alt="Logo"
                onError={handleImageError} // Trigger error handler if image fails to load
              />
            )}
          </div>
        </div>

        {/* Row 2: Entity Counts */}
        <div className="p-4">
          <div className="w-full mb-2">
            <h6 className="text-textColor text-sm">
              <span className="font-bold text-lg">{EntityNumber.toLocaleString()}</span> موجودیت
            </h6>
          </div>

          <div className="w-full">
            <h6 className="text-textColor text-sm">
              <span className="font-bold text-lg">{PersianEntityNumber.toLocaleString()}</span> موجودیت ایرانی
            </h6>
          </div>
        </div>
      </a>
    </div>
  );
};

export default EntityTypes;