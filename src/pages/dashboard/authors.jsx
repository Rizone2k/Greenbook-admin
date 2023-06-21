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
import { authorsSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
import { getAuthors } from "@/redux/reducers/authors";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export function Authors() {
  const [page, setPage] = useState(1);
  const authors = useSelector(authorsSelector);
  const dispatch = useDispatch();

  console.log(authors);

  const getItemProps = (index) => ({
    variant: page === index ? "filled" : "text",
    color: page === index ? "blue" : "blue-gray",
    onClick: () => setPage(index),
  });

  const next = () => {
    if (page === 5) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  useEffect(() => {
    const getListAuthor = () => {
      let row = "20";
      dispatch(getAuthors({ limit: row, page: page }))
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        });
    };
    getListAuthor();
  }, [page]);

  return (
    <div className="mt-12 mb-8 flex min-h-[100vh] flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 flex w-full items-center gap-10 p-6"
        >
          <Typography variant="h5" color="white">
            Tác giả
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
                  "Tác giả",
                  "Ngày tạo",
                  "Đã xoá",
                  "Ngày cập nhật",
                  "",
                  "",
                ].map((el, index) => (
                  <th
                    key={index}
                    className={`border-b border-blue-gray-50 py-3 px-5 text-left ${
                      el == "Ngày tạo" ? "hidden lg:block" : ""
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
              {authors &&
                authors.map((author, key) => {
                  const className = `py-3 px-5 ${
                    key === authors.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={author.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={
                              author?.image[0]?.url ??
                              "/img/logo-ct.png"
                            }
                            alt={author.name}
                            size="sm"
                          />
                          {author?.images && (
                            <Avatar
                              src={author?.images ?? ""}
                              alt={author.name}
                              size="sm"
                            />
                          )}
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {author.name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={`${className} hidden lg:block`}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {author?.created_at ?? ""}
                        </Typography>
                      </td>
                      <td className={`${className}`}>
                        <Chip
                          variant="gradient"
                          color={
                            author.is_deleted && author.is_deleted == false
                              ? "red"
                              : "green"
                          }
                          value={JSON.stringify(author.is_deleted)}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {author.updated_at}
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
                      <td className={className} onClick={() => alert(book.id)}>
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
        <div className="flex items-center justify-end  gap-4">
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={page === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton {...getItemProps(1)}>1</IconButton>
            <IconButton {...getItemProps(2)}>2</IconButton>
            <IconButton {...getItemProps(3)}>3</IconButton>
            <IconButton {...getItemProps(4)}>4</IconButton>
            <IconButton {...getItemProps(5)}>5</IconButton>
          </div>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={next}
            disabled={page === 5}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Authors;
