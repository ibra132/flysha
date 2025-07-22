import { FC } from "react";
import { getAirplanes } from "../../airplanes/lib/data";

import FormFlight from "../components/form-flight";

const CreateFlightPage: FC = async () => {
  const data = await getAirplanes();
  return (
    <div>
      <div className="my-5 flex items-center justify-start">
        <div className="font-bold text-2xl">Tambah Data Flight</div>
      </div>

      <FormFlight airplanes={data} />
    </div>
  );
};

export default CreateFlightPage;
