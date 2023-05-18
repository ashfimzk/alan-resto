import { useEffect, useState } from "react";
import REST_API from "../support/RESTAPI";
import { Button, Modal } from "antd";
import { Table } from "flowbite-react";

function Transaction() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [charge, setCharge] = useState(0);
  const [open, setOpen] = useState(false);

  let getData = async () => {
    try {
      let { data } = await REST_API({
        url: "/product/get",
        method: "GET",
      });

      setData(data.data);
    } catch (error) {}
  };

  let addCart = async (product_id, qty) => {
    try {
      let { data } = await REST_API({
        url: "/product/add",
        method: "POST",
        data: { product_id, qty },
      });
    } catch (error) {}
  };

  let getCart = async () => {
    try {
      let { data } = await REST_API({
        url: "/product/getCart",
        method: "GET",
      });

      setCart(data.data);
    } catch (error) {}
  };

  let caunt = async () => {
    try {
      let num = 0;
      cart.map((val, idx) => {
        num += val.price * val.total_qty;
      });

      setCharge(num);
    } catch (error) {}
  };

  let deleteCart = async () => {
    try {
      await REST_API({
        url: "/product/delete-cart",
        method: "DELETE",
      });

      setCart([]);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
    getCart();
    caunt();
  }, [cart]);
  return (
    <div className="bg-slate-200 px-6 pt-10 flex">
      <div className="basis-3/5">
        <div className="grid grid-cols-3 gap-6">
          {data
            ? data.map((value, index) => {
                return (
                  <button onClick={() => addCart(value.id, 1)}>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                      <img
                        class="w-full h-48"
                        src={`http://localhost:5010/${value.img}`}
                        alt="Sunset in the mountains"
                      />
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{value.name}</div>
                        <p class="text-gray-700 text-base">
                          {value.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            : null}
        </div>
      </div>
      <div className="basis-2/5 pl-4">
        <div className="bg-white px-2">
          <h1 className="text-2xl">PESANAN</h1>
          <div className=" mt-6">
            {cart
              ? cart.map((value, index) => {
                  return (
                    <div className="flex items-center justify-between my-4">
                      <img
                        className="h-32 w-32"
                        src={`http://localhost:5010/${value.img}`}
                      />
                      <h1>{value.name}</h1>
                      <h1>x{value.total_qty}</h1>
                      <h1>Rp.{value.price.toLocaleString("id-ID")}</h1>
                    </div>
                  );
                })
              : null}
          </div>
          <button
            onClick={() => deleteCart()}
            className="border-red-700 border w-[500px] mt-20 text-red-700 h-10 !px-4"
          >
            Clear cart
          </button>
          <div className="flex px-2 gap-6 pt-6">
            <button className="basis-1/2 h-10 text-white bg-green-500">
              Save Bill
            </button>
            <button className="basis-1/2 h-10 text-white bg-green-500">
              Print Bill
            </button>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white mt-6 w-[400px] h-10 mb-10"
          >
            Charge Rp.{charge.toLocaleString("id-ID")}
          </button>
        </div>
      </div>
      <Modal
        footer={null}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <div className="flex">
          <div className="basis-2/3">
            <Table className="w-full">
              <Table.Head className="bg-slate-200">
                <Table.HeadCell className="w-1/6">No</Table.HeadCell>
                <Table.HeadCell className="w-3/6">Nama</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Foto</Table.HeadCell>
                <Table.HeadCell className="w-1/6">Harga</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {cart
                  ? cart.map((value, index) => {
                      return (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                          </Table.Cell>
                          <Table.Cell>{value.name}</Table.Cell>
                          <Table.Cell className="pt-4 pb-4">
                            <img src={`http://localhost:5010/${value.img}`} />
                          </Table.Cell>
                          <Table.Cell>
                            {value.price.toLocaleString("id-ID")}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  : null}
              </Table.Body>
            </Table>
          </div>
          <div className="basis-1/3  flex  justify-center pt-10">
            <div className="flex-row justify-center items-center">
              <h1 className="text-center">UANG PEMBELI</h1>
              <input
                type="text"
                id=""
                className="bg-gray-50 border w-[300px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <div className="flex gap-2 mt-4">
                <button className="basis-1/2 h-10 bg-slate-200" >Close</button><button className="basis-1/2 h-10 bg-blue-500 text-white">Pay</button>
              </div>

              <div className="mt-4">
                <h1 className="text-xl text-red-500">KEMBALIAN</h1>
                <h1 className="text-md">Rp.0</h1>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Transaction;
