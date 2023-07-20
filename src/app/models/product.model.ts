export interface Category {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

/*
  La interface Product es la interfaz esencial pues lo renderizamos en casi todos los componentes.
  Pero cuando se quiere crear un producto, al transferir datos a una API difiere un poco la interfaz.
  Para ello se utiliza la tecnica (extends), para heredar su interfaz Product y con el(Omit) omitimos el 'id' y 'category'
*/
