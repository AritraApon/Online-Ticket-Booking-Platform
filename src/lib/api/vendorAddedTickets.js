
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
export const getVendorAddedTickets = async (userId) => {
   const res = await fetch(`${baseUrl}/api/tickets/vendor/${userId}`);
   return await res.json();
};