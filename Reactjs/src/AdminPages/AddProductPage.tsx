import Api from "../API";
import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdminProductModel } from "../Models/FormModels/AdminProduct.model";
import "./AddProductPage.css";
import { toast } from "react-toastify";

function AddProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminProductModel>();
  const [image, setImage] = useState<File>();
  const [fileName, setFileName] = useState<string>("");
  const hiddenFileInput = useRef<any>(null);
  const [productPlacement, setProductPlacement] = useState(undefined);
  const handleSelectedChange = (event: any) => {
    setProductPlacement(event.target.value);
  };
  const onSubmitHandler: SubmitHandler<AdminProductModel> = (data) => {
    if (image) {
      let params: any = {
        name: data.name,
        serialNumber: data.serial_number,
        price: data.price,
        quantity: data.quantity,
        packaging: data.packaging,
        transport: data.transport,
        productPlacement: data.productPlacement,
        content: data.description,
        image: image,
      };
      const bodyFormData = new FormData();
      Object.keys(params).forEach((key) => {
        bodyFormData.append(key, params[key]);
      });

      Api({ method: "POST", fetchApiUrl: "products", data: bodyFormData })
        .then((res: any) => {
          reset();
          setFileName("");
          toast(res.data.message);
        })
        .catch((err: any) => {
          toast(err.response.data.message);
        });
    }
  };

  async function FileUploadChange(event: any) {
    const file = event.target.files[0];
    setFileName(file.name);

    setImage(file);
  }
  function handleUploadClick() {
    hiddenFileInput?.current?.click();
  }

  return (
    <>
      <main style={{ height: "max-content" }}>
        <h2 className="admin-add-product__title">Add Product</h2>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="wrapper__add--product__form"
        >
          <div className="add-product-grid__inputs__container">
            <div>
              <div>
                <label>Product Placement*</label>
                <div className="wrapper__add--product__form__product__placement">
                  <div className="wrapper__signin__form__input__container">
                    <select
                      className="wrapper__add--product__form__select"
                      value={productPlacement}
                      {...register("productPlacement", {
                        required: true,
                      })}
                      onChange={handleSelectedChange}
                    >
                      <option value="normal">Normal</option>
                      <option value="hero">Hero Section</option>
                      <option value="sales">Hot Sales</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                {errors.productPlacement && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Product Name*</label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>
              <div>
                {errors.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>
                  Serial Number{productPlacement !== "hero" ? "*" : ""}
                </label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("serial_number", {
                      required: productPlacement === "hero" ? false : true,
                    })}
                  />
                </div>
              </div>
              <div>
                {errors.serial_number && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Price{productPlacement !== "hero" ? "*" : ""}</label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("price", {
                      required: productPlacement === "hero" ? false : true,
                      pattern: {
                        value: /^\d{1,}$/,
                        message: "Only Numbers are allowed",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                {errors.price && (
                  <span className="text-danger">
                    {errors.price?.message
                      ? errors.price.message
                      : "This field is required"}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Quantity{productPlacement !== "hero" ? "*" : ""}</label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("quantity", {
                      required: productPlacement === "hero" ? false : true,
                      pattern: {
                        value: /^\d{1,}$/,
                        message: "Only Numbers are allowed",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                {errors.quantity && (
                  <span className="text-danger">
                    {errors.quantity?.message
                      ? errors.quantity.message
                      : "This field is required"}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Packaging{productPlacement !== "hero" ? "*" : ""}</label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("packaging", {
                      required: productPlacement === "hero" ? false : true,
                      pattern: {
                        value: /^\d{1,}$/,
                        message: "Only Numbers are allowed",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                {errors.packaging && (
                  <span className="text-danger">
                    {errors.packaging?.message
                      ? errors.packaging.message
                      : "This field is required"}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Transport{productPlacement !== "hero" ? "*" : ""}</label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("transport", {
                      required: productPlacement === "hero" ? false : true,
                      pattern: {
                        value: /^\d{1,}$/,
                        message: "Only Numbers are allowed",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                {errors.transport && (
                  <span className="text-danger">
                    {errors.transport?.message
                      ? errors.transport.message
                      : "This field is required"}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div>
                <label>Description*</label>
                <div className="wrapper__signin__form__input__container">
                  <input
                    type="text"
                    {...register("description", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div>
                {errors.description && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => handleUploadClick()}
              className="upload-iamge-container"
            >
              Upload an Image
            </div>
            <span>{fileName}</span>
          </div>
          <div>
            <input
              style={{ display: "none" }}
              ref={hiddenFileInput}
              accept="image/png, image/jpeg, image/webp"
              type="file"
              name="inputFile"
              onChange={(e) => FileUploadChange(e)}
            />
          </div>

          <button type="submit" className="add-product__form__button">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
export default AddProductPage;
