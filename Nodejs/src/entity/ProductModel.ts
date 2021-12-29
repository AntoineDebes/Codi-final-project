export interface ProductRequestModel {
  userID: any;
  body: {
    name: string;
    serialNumber: string;
    price: string;
    quantity: string;
    packaging: string;
    transport: string;
    productPlacement: string;
    content: string;
  };
  file: {
    filename: string;
  };
}

export interface ProductModel {
  name: string;
  serialNumber: string;
  price: string;
  quantity: string;
  packaging: string;
  transport: string;
  productPlacement: string;
  content: string;
  filename: string;
}
