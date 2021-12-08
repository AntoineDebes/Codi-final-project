import Api from "../API";
import { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AdminProductModel } from "../Models/FormModels/AdminProduct.model";

function ProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminProductModel>();
  const [image, setImage] = useState<any>();
  const [fileName, setFileName] = useState<any>("");
  const hiddenFileInput = useRef<any>(null);

  const onSubmitHandler: SubmitHandler<AdminProductModel> = (data) => {
    let params = {
      name: data.name,
      serialNumber: data.serial_number,
      price: data.price,
      quantity: data.quantity,
      packaging: data.packaging,
      transport: data.transport,
      imageFormat: image == null ? "" : image?.Format,
      base64: image == null ? "" : image?.Base64,
    };
    Api({ method: "POST", fetchApiUrl: "products", data: params });
  };

  function convertBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function FileUploadChange(event: any) {
    const file = event.target.files[0];
    setFileName(file.name);
    let base64: any = (await convertBase64(file)) + "";
    let imagearray: any[] = base64.split(",");

    let Image: any = {
      Format: imagearray[0],
      Base64: imagearray[1],
    };
    setImage(Image);
  }
  function handleUploadClick() {
    hiddenFileInput?.current?.click();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="wrapper__signup__form"
    >
      <div>
        <div>
          <div>
            <label>Product Name</label>
            <input type="text" {...register("name", { required: true })} />
          </div>
          <div>
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div>
            <label>Serial Number</label>
            <input
              type="text"
              {...register("serial_number", { required: true })}
            />
          </div>
          <div>
            {errors.serial_number && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div>
            <label>Price</label>
            <input type="text" {...register("price", { required: true })} />
          </div>
          <div>
            {errors.price && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="text"
              {...register("quantity", {
                required: true,
              })}
            />
          </div>
          <div>
            {errors.quantity && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div>
          <div>
            <label>Packaging</label>
            <input
              type="text"
              {...register("packaging", {
                required: true,
              })}
            />
          </div>
          <div>
            {errors.packaging && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div>
            <label>Transport</label>
            <input
              type="text"
              {...register("transport", {
                required: true,
              })}
            />
          </div>
          <div>
            {errors.transport && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div>
            <button onClick={() => handleUploadClick()}>Upload an Image</button>
            <span>{fileName}</span>
          </div>
          <div>
            <label>Image</label>
            <input
              style={{ display: "none" }}
              ref={hiddenFileInput}
              accept="image/png, image/jpeg, image/webpg"
              type="file"
              name="inputFile"
              onChange={(e) => FileUploadChange(e)}
            />
          </div>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ProductPage;
