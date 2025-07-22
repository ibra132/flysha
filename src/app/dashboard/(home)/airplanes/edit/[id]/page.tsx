import React, { FC } from "react";
import FormAirplane from "../../components/form-airplane";
import { getAirplaneById } from "../../lib/action";

type Params = {
  id: string;
};

interface EditAirplanePageProps {
  params: Params;
}

const EditAirplane: FC<EditAirplanePageProps> = async ({ params }) => {
  const data = await getAirplaneById(params.id);
  return (
    <div>
      <div className="my-5 flex items-center justify-start">
        <div className="font-bold text-2xl">Edit Data Airplane</div>
      </div>

      <FormAirplane defaultValues={data} type="EDIT" />
    </div>
  );
};

export default EditAirplane;
