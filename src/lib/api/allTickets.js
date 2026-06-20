import { getMutation } from "../core/server";

export const getAllTickets = async () => {
    return await getMutation(`/api/tickets/all`);
};

export const getTicketDetails = async (id) => {
    return await getMutation(`/api/tickets/${id}`);
};