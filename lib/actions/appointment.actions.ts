"use server";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  console.log({ appointmentData });

  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export async function getAppointment(appointmentId: string) {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log({ getAppointmentError: error });
  }
}

export async function getRecentAppointmentList() {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );
    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log({ appointmentListError: error });
  }
}

export async function updateAppointment({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("no appointment found to update");
    }

    //TODO sms notification to user

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log({ updateAppointmentError: error });
  }
}
