import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { couponsSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getCoupons } from "@/redux/reducers/coupons";

export function Coupons() {
  const coupons = useSelector(couponsSelector);
  const dispatch = useDispatch();
  console.log(coupons);

  useEffect(() => {
    const getListCoupon = () => {
      dispatch(getCoupons())
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        });
    };
    getListCoupon();
  }, []);

  return (
    <div className="mt-12 mb-8 flex min-h-[100vh] flex-col gap-12">
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
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Mã giảm giá",
                  "Amount",
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
                      <td className={className}>
                        <Tippy content="Edit">
                          <span>
                            <Typography
                              variant="small"
                              as="a"
                              href="#"
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
  );
}

export default Coupons;
