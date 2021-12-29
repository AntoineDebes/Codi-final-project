import { GetProductInfoRequest } from "../entity/Request";
import { ProductModel } from "../entity/ProductModel";
import query from "./db";

const unkownError = "Something went wrong, Please try again later";

async function GetAllProduct() {
  const result = (await query(`SELECT * FROM product`)).map((_product) => {
    return {
      ..._product,
      image_path: `${process.env.SERVER_URL}upload/${_product.image_path}`,
    };
  });

  let nestedObject: any = {
    hero: [],
    sales: [],
    normal: [],
  };
  if (result) {
    nestedObject.hero = result.filter((_product: any) => {
      return _product.productPlacement === "hero";
    });
    nestedObject.sales = result.filter((_product: any) => {
      return _product.productPlacement === "sales";
    });
    nestedObject.normal = result.filter((_product: any) => {
      return _product.productPlacement === "normal";
    });

    return nestedObject;
  }
  throw new Error(unkownError);
}

async function GetOneProduct(product_ID: string | number) {
  const result = await query(`SELECT * FROM product WHERE ID = ${product_ID}`);

  if (result.length) {
    return {
      ...result[0],
      image_path: `${process.env.SERVER_URL}upload/${result[0].image_path}`,
    };
  }
  throw new Error(unkownError);
}

async function CreateProduct({
  name,
  serialNumber,
  price,
  quantity,
  packaging,
  transport,
  productPlacement,
  content,
  filename,
}: ProductModel) {
  const result = await query(
    `INSERT INTO product
      (name, serial_number, price, quantity, packaging, transport, productPlacement, content, image_path) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      serialNumber,
      price,
      quantity,
      packaging,
      transport,
      productPlacement,
      content,
      filename,
    ]
  );

  if (result.affectedRows) {
    return {
      message: "Product has been added",
    };
  }

  throw new Error(unkownError);
}

async function DeleteProduct({ productID, userID }) {
  const result = await query(`DELETE FROM product WHERE ID=?`, [productID]);

  if (result.affectedRows) {
    return {
      message: "Product has been deleted",
    };
  }
  throw new Error(unkownError);
}

const UserCrud = {
  GetAllProduct,
  CreateProduct,
  DeleteProduct,
  GetOneProduct,
};
export default UserCrud;
