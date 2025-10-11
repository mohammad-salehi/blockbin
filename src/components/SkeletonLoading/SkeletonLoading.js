import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
export default function SkeletonLoading({}) {
  return (
    <div style={{ textAlign: "center", marginBottom:'10px' }}>
      <Skeleton width="100%" height="50px" className="bg-boxColor" />
      <Skeleton width="70%" height="50px"  className="bg-boxColor" />
      <Skeleton width="90%" height="50px"  className="bg-boxColor" />
      <Skeleton width="60%" height="50px"  className="bg-boxColor" />
      <Skeleton width="80%" height="50px"  className="bg-boxColor" />
      <Skeleton width="90%" height="50px"  className="bg-boxColor" />
      <Skeleton width="70%" height="50px"  className="bg-boxColor" />
      {/* <div style={{width:'100%', marginTop:'-150px'}}>
      </div> */}
    </div>
  );
}
