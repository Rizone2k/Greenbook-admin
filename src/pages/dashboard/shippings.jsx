import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { shippingsSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaPencilAlt, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  createShipping,
  getShippings,
  updateShipping,
} from "@/redux/reducers/shippings";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Shippings() {
  const [page, setPage] = useState(1);
  const shippings = useSelector(shippingsSelector);
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const [color, setColor] = useState("#980303");

  const [price, setPrice] = useState("");
  const [fromWeight, setFromWeight] = useState("");
  const [toWeight, setToWeight] = useState("");
  const [shippingId, setShippingId] = useState("");

  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleClearOldData = () => {
    setPrice("");
    setFromWeight("");
    setToWeight("");
  };

  const handleClickCreateShipping = () => {
    handleClearOldData();
    setShippingId("");
    setShowCreate(!showCreate);
  };

  const handleCreateShipping = () => {
    const debouncedShippingCreate = debounce(getListShipping, 1000);
    if (parseInt(price) > 1) {
      try {
        setShowCreate(false);
        dispatch(
          createShipping({
            price: price,
            fromWeight: fromWeight,
            toWeight: toWeight,
          })
        ).then(notify("Đã tạo!"));
        handleClearOldData();
        debouncedShippingCreate();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setColor("#980303");
      notify("Vui lòng kiểm tra lại thông tin!");
    }
  };

  const handleClickUpdateShipping = (id, price, fromWeight, toWeight) => {
    setPrice(price);
    setFromWeight(fromWeight);
    setToWeight(toWeight);
    setShippingId(id);
  };

  const handleUpdateShipping = () => {
    const debouncedShippingUpdate = debounce(getListShipping, 1000);
    if (parseInt(price) > 1 && shippingId) {
      try {
        setShowCreate(false);
        dispatch(
          updateShipping({
            id: shippingId,
            price: price,
            fromWeight: fromWeight,
            toWeight: toWeight,
          })
        );
        notify("Đã cập nhật!");
        handleClearOldData();
        debouncedShippingUpdate();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setColor("#980303");
      notify("Vui lòng kiểm tra lại!");
    }
  };

  const notify = (content) =>
    toast(`🦄 ${content}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "text-sm font-bold",
      theme: "light",
    });

  const getListShipping = () => {
    dispatch(getShippings())
      .then(unwrapResult)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListShipping();
  }, []);

  return (
    <>
      <ToastContainer
        toastStyle={{
          backgroundColor: "#b8fcf6ea",
          color: color,
          marginTop: "10vh",
        }}
      />
      <div className="mt-12 mb-8 flex min-h-[100vh] flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 flex w-full items-center gap-10 p-6"
          >
            <Typography variant="h5" color="white">
              Phí Vận chuyển
            </Typography>
            <div className="relative flex w-1/2 items-center  rounded-lg border-b-2 border-[white] py-2 px-4 shadow-md">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className=" w-3/4 bg-transparent px-2 text-base font-normal text-white"
                name="search"
                id="search"
              />
              <div className="absolute right-0 flex h-full items-center rounded-r-lg py-2 px-3">
                <FaSearch className="text-[white]"></FaSearch>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="flex w-full justify-end">
              <Tippy content="Tạo mới">
                <span>
                  <Button
                    className="mr-2 rounded-2xl bg-[#0c9dd6] text-white"
                    onClick={() => {
                      handleClickCreateShipping();
                      handleShowCreate();
                    }}
                  >
                    <FaPlus></FaPlus>
                  </Button>
                </span>
              </Tippy>
            </div>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Mã vận chuyển",
                    "Trọng lượng tối thiểu",
                    "Trọng lượng tối đa",
                    "Giá",
                    "Ngày cập nhật",
                    "",
                  ].map((el, index) => (
                    <th
                      key={index}
                      className={`border-b border-blue-gray-50 py-3 px-5 text-left ${
                        el == "Ngày cập nhật" ? "hidden lg:block" : ""
                      }`}
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shippings &&
                  shippings.map((shipping, key) => {
                    const className = `p-1 xl:py-2 xl:px-4 ${
                      key === shippings.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={shipping.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {shipping.id}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {shipping.from_weight}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {shipping.to_weight}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {shipping.price.toLocaleString()}
                          </Typography>
                        </td>
                        <td className={`${className} hidden lg:block`}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {shipping.updated_at}
                          </Typography>
                        </td>

                        <td
                          className={className}
                          onClick={() => {
                            handleShowCreate(),
                              handleClickUpdateShipping(
                                shipping?.id ?? "",
                                shipping?.price ?? "",
                                shipping?.from_weight ?? "",
                                shipping?.to_weight ?? ""
                              );
                          }}
                        >
                          <Tippy content="Sửa">
                            <span>
                              <Typography
                                variant="small"
                                as="p"
                                className="flex items-center justify-center text-xs font-semibold text-blue-gray-600"
                              >
                                <FaPencilAlt></FaPencilAlt>
                              </Typography>
                            </span>
                          </Tippy>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      {shippings && showCreate && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className=" relative my-6 w-[100vw]">
              {/*content*/}
              <div className="relative mx-auto flex w-4/5 flex-col rounded-lg border-0 bg-[#f3fcf9f8] py-12 px-5 shadow-lg xl:w-4/6">
                {/*header*/}
                <div className="flex w-full flex-row items-center lg:w-4/5">
                  <button
                    className="absolute right-0 top-0 px-2 py-2 text-xl font-bold uppercase text-red-500 lg:px-6"
                    type="button"
                    onClick={handleShowCreate}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative max-h-[70vh] flex-auto overflow-auto md:p-4">
                  <div className="mx-auto flex max-w-7xl flex-col items-center rounded-lg p-1 sm:flex-row sm:items-start">
                    <div
                      className={`w-full rounded-2xl p-1 text-sm shadow-md shadow-[#bedcd7e1] sm:w-2/3 lg:p-5 ${"sm:w-full"}`}
                    >
                      <div className="flex items-center p-2">
                        <Input
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                          type="number"
                          variant="standard"
                          label="1. Giá"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setFromWeight(e.target.value)}
                            value={fromWeight}
                            type="number"
                            variant="standard"
                            label="2. Trọng lượng tối thiểu (gram)"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setToWeight(e.target.value)}
                            value={toWeight}
                            type="number"
                            variant="standard"
                            label="3. Trọng lượng tối đa (gram)"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="pt-9 text-center">
                          <Button
                            type={"submit"}
                            onClick={() =>
                              shippingId
                                ? handleUpdateShipping()
                                : handleCreateShipping()
                            }
                            className="text-md font-base md:text-md bg-[#0bcaca] p-2 text-white shadow-md shadow-[#5f5e5eb5] hover:shadow-none"
                          >
                            <p>Xác nhận</p>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
}

export default Shippings;
