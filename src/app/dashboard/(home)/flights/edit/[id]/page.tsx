import React, { FC } from "react";
import FormFlight from "../../components/form-flight";
import { getAirplanes } from "../../../airplanes/lib/data";
import { getFlightById } from "../../lib/data";

type Params = {
  id: string;
};

interface EditFlightPageProps {
  params: Params;
}

const EditAirplane: FC<EditFlightPageProps> = async ({ params }) => {
  const data = await getAirplanes();
  const flight = await getFlightById(params.id);

  console.log(data);
  console.log(flight);

  return (
    <div>
      <div className="my-5 flex items-center justify-start">
        <div className="font-bold text-2xl">Edit Data Airplane</div>
      </div>

      <FormFlight airplanes={data} defaultValues={flight} type="EDIT" />
    </div>
  );
};

export default EditAirplane;
