import React, { useState } from "react"; // Make sure to import useState
import ScaleLoader from "react-spinners/ScaleLoader";

function Loading() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading text-center" style={{ marginTop: "150px" }}>
      <ScaleLoader
        color="#000000"
        loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
