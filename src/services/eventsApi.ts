import http from './http';
import type { Event, EventCreate } from '../types/Event';

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await http.get('/events');
  return res.data;
};

export const createEvent = async (payload: EventCreate): Promise<Event> => {
  const res = await http.post('/events', payload);
  return res.data;
};

export const deleteEvent = async (id: number) => {
  await http.delete(`/events/${id}`);
};
