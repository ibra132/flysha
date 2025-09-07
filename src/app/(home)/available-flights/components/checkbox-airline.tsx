"use client";

import { Airplane } from "@/generated/prisma";
import React, { type FC } from "react";

interface CheckboxAirlineProps {
  val: Airplane;
}

const CheckboxAirline: FC<CheckboxAirlineProps> = ({ val }) => {
  return (
    <label
      htmlFor={val.name}
      className="font-semibold flex items-center gap-[10px] text-white"
    >
      <input
        type="checkbox"
        name="airlines"
        value={val.id}
        id={val.name}
        className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
      />
      {val.name}
    </label>
  );
};

export default CheckboxAirline;
