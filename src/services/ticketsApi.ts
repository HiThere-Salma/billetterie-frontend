import http from "./http";

export type Ticket = {
  id: number;
  eventId: number;
  userId: number;
  quantity: number;
  status?: string;
  createdAt?: string;
};

export type CreateTicketPayload = {
  eventId: number;
  userId: number;
  quantity: number;
  status?: string; // "PENDING" etc
};

export async function fetchTickets(): Promise<Ticket[]> {
  const res = await http.get("/tickets");
  return res.data;
}

export async function createTicket(payload: CreateTicketPayload): Promise<Ticket> {
  const res = await http.post("/tickets", payload);
  return res.data;
}

export async function deleteTicket(id: number): Promise<void> {
  await http.delete(`/tickets/${id}`);
}
