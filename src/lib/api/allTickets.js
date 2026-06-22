import { getMutation } from "../core/server";


export const getAllTickets = async (searchParams = {}) => {
  const { from = '', to = '', transport = 'all', sort = 'none', page = 1 } = searchParams;

  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  if (transport && transport !== 'all') params.append('transport', transport);
  if (sort && sort !== 'none') params.append('sort', sort);
  params.append('page', page);
  params.append('limit', 6);

  return await getMutation(`/api/tickets/all?${params.toString()}`);
};

export const getTicketDetails = async (id) => {
    return await getMutation(`/api/tickets/${id}`);
};