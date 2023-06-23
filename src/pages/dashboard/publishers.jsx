import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { publisherSelector } from "@/redux/selectors";
import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaSearch } from "react-icons/fa";
import { getPublishers } from "@/redux/reducers/publisher";

export function Publishers() {
  const publishers = useSelector(publisherSelector);
  const dispatch = useDispatch();
  console.log(publishers);

  const getListPublisher = () => {
    dispatch(getPublishers())
      .then(unwrapResult)
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getListPublisher();
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
            Nhà xuất bản
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
                {["Nhà xuất bản", "Ngày tạo", "Đã xoá", "Ngày cập nhật"].map(
                  (el, index) => (
                    <th
                      key={index}
                      className={`border-b border-blue-gray-50 py-3 px-5 text-left ${
                        el == "Thể loại" ? "hidden lg:block" : ""
                      }`}
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {publishers &&
                publishers.map((publisher, key) => {
                  const className = `p-1 xl:py-2 xl:px-4 ${
                    key === publishers.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={publisher.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {publisher.first_name + " " + publisher.last_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {publisher.created_at}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={
                            publisher.is_deleted &&
                            publisher.is_deleted === false
                              ? "red"
                              : "green"
                          }
                          value={JSON.stringify(publisher.is_deleted)}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {publisher.updated_at}
                        </Typography>
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

export default Publishers;
