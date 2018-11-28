export interface RootState {
  version: string;
}

export interface TicketData {
  ticketId: number;
  title: string;
  description: string;
  priority: number;
  deadline: Date;
}

export interface ClientData {
  clientId: number;
  clientName: string;
}

export interface ProductData {
  productId: number;
  productName: string;
}

export interface TicketBoardState {
  selectedClient: string | null;
  tickets: TicketData[];
  clients: ClientData[];
  products: ProductData[];
}
