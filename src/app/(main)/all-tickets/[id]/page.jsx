import TicketDetailsClient from '@/Components/Main/DetailsCard/TicketDetailsClient';
import { getTicketDetails } from '@/lib/api/allTickets';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: "TicketBari || Ticket-Details",
  description: "Online ticket booking platform",
};

const TicketDetailsPage = async ({ params }) => {
  const { id } = await params;

const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

if(!session){
  redirect('/login')
}
  // Fetch single ticket server data
  const ticket = await getTicketDetails(id);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400">
          Ticket network data not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Pass fetched data to dynamic client element */}
        <TicketDetailsClient ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketDetailsPage;