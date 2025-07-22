import React, { FC } from "react";
import FormAirplane from "../components/form-airplane";

const CreateAirplane: FC = () => {
  return (
    <div>
      <div className="my-5 flex items-center justify-start">
        <div className="font-bold text-2xl">Tambah Data Airplane</div>
      </div>

      <FormAirplane type="ADD" />
    </div>
  );
};

export default CreateAirplane;
