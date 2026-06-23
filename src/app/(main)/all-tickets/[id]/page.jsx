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
      // 🎯 ডাটা না পাওয়া গেলে যে এরর স্ক্রিন আসে, সেটাকেও ডার্ক মোড ফ্রেন্ডলি করা হলো
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex items-center justify-center transition-colors duration-300">
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-slate-500">
          Ticket network data not found.
        </p>
      </div>
    );
  }

  return (
    // 🎯 মেইন ব্যাকগ্রাউন্ড কন্টেইনার: ডার্ক মোডে ডিপ স্লেট ব্লু কালার অ্যাড করা হয়েছে
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#1E293B] dark:text-slate-200 antialiased p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Pass fetched data to dynamic client element */}
        <TicketDetailsClient ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketDetailsPage;