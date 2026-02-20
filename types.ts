
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  sku: string;
  description: string;
  image: string;
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
