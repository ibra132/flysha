"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import React, { useActionState } from "react";
import SubmitFormButton from "../../components/submit-form-button";
import { Airplane, Flight } from "@/generated/prisma";
import { saveFlight, updateFlight } from "../lib/action";
import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { dateFormat } from "@/lib/utils";

export interface FormFlightProps {
  airplanes: Airplane[];
  type?: "ADD" | "EDIT";
  defaultValues?: Flight | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

export default function FormFlight({
  airplanes,
  type,
  defaultValues,
}: FormFlightProps) {
  const updateFlightWithId = (_state: ActionResult, formData: FormData) => {
    return updateFlight(defaultValues?.id as string, formData);
  };

  const [state, formAction] = useActionState(
    type === "ADD" ? saveFlight : updateFlightWithId,
    initialFormState
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.errorTitle !== null && (
        <div className="my-7 p-4 w-[400px]  bg-red-500 text-white rounded-md p">
          <div className="font-bold mb-4">{state.errorTitle}</div>

          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value: string, index: number) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="planeId">Pilih Pesawat</Label>
          <Select name="planeId" defaultValue={defaultValues?.planeId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Pesawat" />
            </SelectTrigger>
            <SelectContent>
              {airplanes.map((airplane) => (
                <SelectItem key={airplane.id} value={airplane.id}>
                  {airplane.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Harga Ticket</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            placeholder="Harga Ticket..."
            defaultValue={defaultValues?.price}
            required
          />
          <span className="text-sm text-gray-900">
            Harga untuk kelas business bertambah Rp 500.000 dan kelas first
            bertambah Rp 750.000
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">Kota Keberangkatan</Label>
          <Input
            id="departureCity"
            name="departureCity"
            placeholder="Kota Keberangkatan..."
            defaultValue={defaultValues?.departureCity}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureDate">Tanggal Keberangkatan</Label>
          <Input
            type="datetime-local"
            className="block"
            id="departureDate"
            name="departureDate"
            placeholder="Tanggal Keberangkatan..."
            defaultValue={dateFormat(
              defaultValues?.departureDate as Date,
              "YYYY-MM-DDTHH:mm"
            )}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Kode Kota</Label>
          <Input
            id="departureCityCode"
            name="departureCityCode"
            placeholder="Kode Kota..."
            defaultValue={defaultValues?.departureCityCode}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="destinationCity">Kota Tujuan</Label>
          <Input
            id="destinationCity"
            name="destinationCity"
            placeholder="Kota Tujuan..."
            defaultValue={defaultValues?.destinationCity}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Tanggal Tiba</Label>
          <Input
            type="datetime-local"
            className="block"
            id="arrivalDate"
            name="arrivalDate"
            placeholder="Tanggal Tiba..."
            defaultValue={dateFormat(
              defaultValues?.arrivalDate as Date,
              "YYYY-MM-DDTHH:mm"
            )}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Kode Kota</Label>
          <Input
            id="destinationCityCode"
            name="destinationCityCode"
            placeholder="Kode Kota..."
            defaultValue={defaultValues?.destinationCityCode}
            required
          />
        </div>
      </div>

      <SubmitFormButton />
    </form>
  );
}
