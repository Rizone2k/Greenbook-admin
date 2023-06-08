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
import { shippingsSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaPencilAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getShippings } from "@/redux/reducers/shippings";

export function Shippings() {
  const [page, setPage] = useState(1);
  const shippings = useSelector(shippingsSelector);
  const dispatch = useDispatch();
  console.log(shippings);

  useEffect(() => {
    const getListShipping = () => {
      dispatch(getShippings())
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        });
    };
    getListShipping();
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
                      <td
                        className={className}
                        onClick={() => alert(shipping.id)}
                      >
                        <Tippy content="Delete">
                          <span>
                            <Typography
                              variant="small"
                              as="a"
                              href="#"
                              className="flex items-center justify-center text-xs font-semibold text-red-400"
                            >
                              <FaTrashAlt></FaTrashAlt>
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

export default Shippings;
