import ClientTransactionsView from '@/Components/Dashboard/User/ClientTransactionsView';
import { getTransactions } from '@/lib/api/userTransaction';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const TransactionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const userId = user?.id;


  const transactions = await getTransactions(userId) || [];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-left">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] tracking-tight">
            Transaction Analytics
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            Monitor financial histories, ticket pipelines, and systemic data node volumes.
          </p>
        </div>

        {/* Client View Components Loader */}
        <ClientTransactionsView transactions={transactions} />

      </div>
    </div>
  );
};

export default TransactionsPage;