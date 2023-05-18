import REST_API from "../support/RESTAPI";

import {
  Table,
  TextInput,
  Label,
} from "flowbite-react";
import { AiOutlinePlus } from "react-icons/ai";
import { Card } from "antd";
import { useEffect, useState } from "react";

function Food() {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: null,
    price: null,
  });
  const [modal, setModal] = useState(false);
  const [img, setimg] = useState();

  let getData = async() =>{
    try {
        let {data} = await REST_API({
            url: "/product/get",
            method: "GET",
          });

          setData(data.data)
    } catch (error) {
        
    }
  }

  let Addmenu = async () => {
    const fd = new FormData();
    fd.append("images", img);
    fd.append("data", JSON.stringify(newProduct));
    try {
      await REST_API({
        url: "/product/postnew",
        method: "POST",
        data: fd,
      });
      alert("Product added");
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validateImage = (e) => {
    console.log(e, "eaa");
    const err = {
      msg1: "Select 1 Image only!",
      msg2: `${e.target.files[0].name} more than 1MB`,
    };
    try {
      if (e.target.files > 1) throw err.msg1;

      if (e.target.files[0].size > 10000000) throw err.msg2;
      setimg(e.target.files[0]);
      alert("photo uploaded");
    } catch (error) {
      alert(error);
    }
  };

  function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("dropzone-file").files[0]);

    oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
  }

    useEffect(()=>{
      getData()
    },[data])

  if (modal === false) {
    return (
      <div className="bg-slate-200 h-auto pt-10">
        <p className="text-slate-500 text-start ml-[10%] pb-10">
          Tambahkan menu makanan yang ada di resto
        </p>
        <Card className="mx-auto !rounded-none " style={{ width: "85%" }}>
          <div className="flex justify-start">
            <button
              className="bg-blue-500 flex items-center text-white"
              onClick={() => setModal(true)}
            >
              <AiOutlinePlus className="" />
              Tambahkan menu
            </button>
          </div>
          <div className="pt-6">
            <Table className="w-full">
              <Table.Head className="bg-slate-200">
                <Table.HeadCell className="w-1/6">No</Table.HeadCell>
                <Table.HeadCell className="w-3/6">Nama</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Foto</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Harga</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
             {
                data? data.map((value,index)=>{
                    return (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {index+1}
                        </Table.Cell>
                        <Table.Cell>{value.name}</Table.Cell>
                        <Table.Cell className="pt-4 pb-4"><img src={`http://localhost:5010/${value.img}`}/></Table.Cell>
                        <Table.Cell>{value.price.toLocaleString('id-ID')}</Table.Cell>
                      </Table.Row>
                    )
                }) :
                null
             }
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="bg-slate-200 h-[1500px] pt-10">
        <Card className="mx-auto !rounded-none" style={{ width: "85%" }}>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-left">
              Tambahkan Menu
            </h3>
            <div className="space-y-2">
              <div>
                <div className="mb-2 flex justify-start">
                  <Label
                    htmlFor="name"
                    className="text-left"
                    value="Edit product name"
                  />
                </div>
                <TextInput
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  type="text"
                />
                <div className="pt-4">
                  <div className="flex justify-center pt-4">
                    <img
                      src="#"
                      alt="new product"
                      id="uploadPreview"
                      className="rounded-md max-w-full max-h-64"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>

                  <div class="flex items-center justify-center w-full pt-6">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          class="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        //    type="file"
                        //    name="myImage"
                        //    id="uploadImage"
                        //    accept="image/png, image/gif, image/jpeg, image/jpg"
                        onChange={(e) => {
                          validateImage(e);
                          PreviewImage();
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-full">
                    <div className="mb-2 flex justify-start">
                      <Label htmlFor="price" value="Edit product price" />
                    </div>
                    <TextInput
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end space-x-2">
              <button
                onClick={() => Addmenu()}
                className="bg-green-500 h-10 text-white w-48"
              >
                Simpan
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Food;
