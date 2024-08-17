import { DataTable } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { columns, Payment } from "@/components/table/Columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default async function AdminPage() {
  const appointments = await getRecentAppointmentList();
  const data = await getData();
  const { scheduledCount, pendingCount, cancelledCount, documents } =
    appointments;
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            width={162}
            height={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome </h1>
          <p className="text-dark-700">Start managing new appointments</p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={scheduledCount}
            label="Scheduled Appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={pendingCount}
            label="Pending Appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={cancelledCount}
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable data={documents} columns={columns} />
      </main>
    </div>
  );
}
