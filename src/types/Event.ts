export type Event = {
  id: number;
  name: string;
  location: string;
  description: string;
  date: string; // exemple: "2025-12-20"
};

export type EventCreate = {
  name: string;
  location: string;
  description: string;
  date: string;
};
