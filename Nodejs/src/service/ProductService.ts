import { GetProductInfoRequest } from "../entity/Request";
import { ProductModel } from "../entity/ProductModel";
import query from "./db";
import { isAdminCheck } from "./IsAdminCheck";

const unkownError = "Something went wrong, Please try again later";

async function GetAllProduct() {
  const result = await query(`SELECT * FROM product`);

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
async function GetOneProduct(productId: number | string) {
  const result = await query(`SELECT * FROM product WHERE ID = ${productId}`);

  if (result.length) {
    return result[0];
  }
  throw new Error(unkownError);
}

async function CreateProduct(req: ProductModel) {
  const {
    userID,
    body: {
      name,
      serialNumber,
      price,
      quantity,
      packaging,
      transport,
      base64,
      imageFormat,
      productPlacement,
      content,
    },
  }: ProductModel = req;
  // console.log(name, serialNumber, price, quantity, packaging, transport);

  await isAdminCheck(userID);

  const result = await query(
    `INSERT INTO product
      (name, serial_number, price, quantity, packaging, transport, Base64, ImageFormat, productPlacement, content) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      serialNumber,
      price,
      quantity,
      packaging,
      transport,
      base64,
      imageFormat,
      productPlacement,
      content,
    ]
  );

  if (result.affectedRows) {
    return {
      message: "Product has been added",
    };
  }

  throw new Error(unkownError);
}

async function DeleteProduct(req: GetProductInfoRequest) {
  const {
    body: { productID },
    userID,
  } = req;

  await isAdminCheck(userID);

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
