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
  Radio,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { couponsSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  FaCalendarAlt,
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  createCoupon,
  getCoupons,
  updateCoupon,
} from "@/redux/reducers/coupons";
import moment from "moment";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import { parse, differenceInYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputLabel } from "@mui/material";
import { debounce } from "lodash";

export function Coupons() {
  const coupons = useSelector(couponsSelector);
  const dispatch = useDispatch();

  const [signal, setSignal] = useState(false);
  const [color, setColor] = useState("#980303");
  const [showCreate, setShowCreate] = useState(false);

  // for counpon
  const [couponId, setCouponId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [isPercent, setIsPercent] = useState(true);
  const [expiredAt, setExpiredAt] = useState(new Date());

  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleClearOldData = () => {
    setCoupon("");
    setMinPrice("");
    setAmount("");
    setLimitPrice("");
    setIsPercent(true);
    setExpiredAt(new Date());
  };

  const handleClickCreateCoupon = () => {
    setShowCreate(!showCreate);
    handleClearOldData();
  };

  const handleCreateCoupon = () => {
    const debouncedCoupon = debounce(getListCoupon, 1000);
    if (
      (isPercent === false && parseInt(amount) >= 1000) ||
      (isPercent === true && parseInt(amount) <= 100)
    ) {
      if (coupon.length > 0 && amount > 0 && parseInt(limitPrice) > 0) {
        setShowCreate(false);
        dispatch(
          createCoupon({
            coupon: coupon,
            amount: isPercent ? amount / 100 : amount,
            minPrice: minPrice,
            limitPrice: limitPrice,
            isPercent: isPercent,
            expiredAt: format(expiredAt, "yyyy-MM-dd'T'HH:mm:ss"),
          })
        )
          .then(unwrapResult)
          .then(notify("Đã tạo!"))
          .then(setSignal(!signal))
          .then(handleClearOldData)
          .catch((err) => {
            console.log(err);
            notify(err.message);
          });
        debouncedCoupon();
      } else {
        setColor("#980303");
        notify("Vui lòng kiểm tra lại thông tin!");
      }
    } else {
      setColor("#980303");
      notify("Số lượng quá thấp, vui lòng kiểm tra lại!");
    }
  };

  const handleClickUpdateCoupon = (
    id,
    coupon,
    amount,
    minPrice,
    limitPrice,
    isPercent,
    expiredAt
  ) => {
    setCouponId(id);
    setCoupon(coupon);
    setAmount(isPercent ? amount * 100 : amount);
    setMinPrice(minPrice);
    setLimitPrice(limitPrice);
    setIsPercent(isPercent);
    setExpiredAt(parseISO(expiredAt));
  };

  const handleUpdateCoupon = () => {
    const debouncedCoupon = debounce(getListCoupon, 1000);
    if (
      (isPercent === false && parseInt(amount) >= 1000) ||
      (isPercent === true && parseInt(amount) <= 100)
    ) {
      if (coupon.length > 0 && amount > 0 && parseInt(limitPrice) > 0) {
        setShowCreate(false);
        dispatch(
          updateCoupon({
            id: couponId,
            coupon: coupon,
            amount: isPercent ? amount / 100 : amount,
            minPrice: minPrice,
            limitPrice: limitPrice,
            isPercent: isPercent,
            expiredAt: format(expiredAt, "yyyy-MM-dd'T'HH:mm:ss"),
          })
        )
          .then(unwrapResult)
          .then(notify("Đã cập nhật!"))
          .then(setSignal(!signal))
          .then(handleClearOldData)
          .catch((err) => {
            console.log(err);
            notify(err.message);
          });
        debouncedCoupon();
      } else {
        setColor("#980303");
        notify("Vui lòng kiểm tra lại thông tin!");
      }
    } else {
      setColor("#980303");
      notify("Vui lòng kiểm tra lại số lượng!");
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

  const getListCoupon = () => {
    dispatch(getCoupons())
      .then(unwrapResult)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListCoupon();
  }, [signal]);

  return (
    <>
      <div className="mt-12 mb-8 flex min-h-[100vh] flex-col gap-12">
        <ToastContainer
          toastStyle={{
            backgroundColor: "#b8fcf6ea",
            color: color,
            marginTop: "10vh",
          }}
        />
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 flex w-full items-center gap-10 p-6"
          >
            <Typography variant="h5" color="white">
              Mã giảm giá
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
                      handleClickCreateCoupon();
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
                    "Mã giảm giá",
                    "Số lượng",
                    "Đơn hàng tối thiểu",
                    "Giảm tối đa",
                    "Hạn sử dụng",
                    "Ngày cập nhật",
                    "",
                  ].map((el, index) => (
                    <th
                      key={index}
                      className={`border-b border-blue-gray-50 py-3 px-5 text-left ${
                        el == "Ngày cập nhật" ? "hidden lg:block" : ""
                      } ${el == "Ngày cập nhật" ? "hidden lg:block" : ""}`}
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
                {coupons &&
                  coupons.map((coupon, key) => {
                    const className = `p-1 xl:py-2 xl:px-4 ${
                      key === coupons.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={coupon.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {coupon.coupon}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={`${className}`}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coupon.amount && coupon.is_percent == true
                              ? (coupon.amount * 100).toFixed(0) + "%"
                              : coupon.amount.toLocaleString()}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coupon.min_price.toLocaleString()}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coupon.limit_price.toLocaleString()}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coupon.expired_at}
                          </Typography>
                        </td>
                        <td className={`${className} hidden lg:block`}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {coupon.updated_at}
                          </Typography>
                        </td>
                        <td
                          className={className}
                          onClick={() => {
                            handleShowCreate(),
                              handleClickUpdateCoupon(
                                coupon?.id ?? "",
                                coupon?.coupon ?? "",
                                coupon?.amount ?? "",
                                coupon?.min_price ?? "",
                                coupon?.limit_price ?? "",
                                coupon?.is_percent ?? "",
                                coupon?.expired_at ?? ""
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
      {coupons && showCreate && (
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
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setCoupon(e.target.value)}
                            value={coupon}
                            type="text"
                            variant="standard"
                            label="1. Mã giảm giá"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setAmount(e.target.value)}
                            value={
                              isPercent && amount > 100
                                ? setAmount("10")
                                : amount
                            }
                            type="number"
                            variant="standard"
                            label="2. Số lượng (% được giảm hoặc số tiền được giảm)"
                          />
                          <Checkbox
                            id="true"
                            name="type"
                            label="%"
                            onChange={(e) => {
                              setIsPercent(e.target.checked);
                            }}
                            checked={isPercent}
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setMinPrice(e.target.value)}
                            value={minPrice}
                            type="number"
                            variant="standard"
                            label="3. Đơn tối thiểu"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setLimitPrice(e.target.value)}
                            value={
                              parseInt(limitPrice) > parseInt(amount) &&
                              isPercent == false
                                ? amount
                                : limitPrice
                            }
                            type="number"
                            variant="standard"
                            label="4. Giảm tối đa"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <div className="w-full border-b-[1px] border-[#b9b9b9]">
                            <InputLabel variant="standard" className="w-fit">
                              <span className="w-fit text-xs">5. Thời hạn</span>
                            </InputLabel>
                            <DatePicker
                              label="Controlled picker"
                              className="w-fit px-3 py-2 text-sm"
                              selected={expiredAt}
                              showYearDropdown
                              onChange={(date) => {
                                setExpiredAt(date);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="pt-9 text-center">
                          <Button
                            type={"submit"}
                            onClick={() =>
                              couponId
                                ? handleUpdateCoupon()
                                : handleCreateCoupon()
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

export default Coupons;
