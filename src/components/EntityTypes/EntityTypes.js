import React, { useEffect, useState } from "react";
import "./style.css";
import { GetRequest } from "@/functions/GetRequest";
import { serverAddress } from "@/functions/ServerAddress";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const EntityTypes = (props) => {
  const [PersianEntityNumber, SetPersianEntityNumber] = useState(0);
  const [EntityNumber, SetEntityNumber] = useState(0);
  const [imageError, setImageError] = useState(false);

  const getLogoSrc = (logo) => {
    if (!logo) return "";
    if (logo.startsWith("data:image")) return logo;
    return `data:image/png;base64,${logo}`;
  };

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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="bg-gradient-main shadow-lg font-iranSans text-sm rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
      style={{ "--dynamic-color": props.NetworkColor }}
    >
      <a className="block cursor-pointer" href={`/panel/entity/types/${props.id}`}>
        <div className="flex flex-nowrap items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <h4
              className="text-textColor font-semibold truncate hover:text-primary transition duration-300"
              title={props.name}
            >
              {props.name}
            </h4>
          </div>

          <div className="shrink-0">
            {imageError ? (
              <ImageNotSupportedIcon className="w-16 h-16 text-gray-400" />
            ) : (
              <img
                src={getLogoSrc(props.logo)}
                className="w-16 h-16 object-contain rounded-full border-2 border-white shadow-md"
                alt="Logo"
                onError={handleImageError}
              />
            )}
          </div>
        </div>

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