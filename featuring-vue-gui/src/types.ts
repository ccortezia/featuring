export interface RootState {
  version: string;
}

export type EntityID = number;

export interface TicketData {
  ticketId: EntityID;
  productId: EntityID;
  clientId: EntityID;
  title: string;
  description: string;
  priority: number;
  deadline: Date;
}

export interface ClientData {
  clientId: EntityID;
  clientName: string;
}

export interface ProductData {
  productId: EntityID;
  productName: string;
}

export interface TicketBoardState {
  selectedClient: string | null;
  tickets: TicketData[];
  clients: ClientData[];
  products: ProductData[];
}

export interface SelectOption {
  value: EntityID | null;
  text: string;
}


export interface APITicketData {
  ticket_id: EntityID;
  product_id: EntityID;
  client_id: EntityID;
  title: string;
  description: string;
  priority: number;
  deadline: Date;
}

export interface APIClientData {
  client_id: EntityID;
  client_name: string;
}

export interface APIProductData {
  product_id: EntityID;
  product_name: string;
}
