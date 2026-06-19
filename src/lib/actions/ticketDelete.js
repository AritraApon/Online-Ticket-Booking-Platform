export const deleteTicket = async (ticketId) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
    
    const res = await fetch(`${baseUrl}/api/tickets/vendor/${ticketId}`, {
        method: "DELETE",
    });

    return await res.json();
};