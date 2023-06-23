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
import { authorsSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaPencilAlt, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "@/redux/reducers/authors";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Authors() {
  const [page, setPage] = useState(1);
  const authors = useSelector(authorsSelector);
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const [color, setColor] = useState("#980303");

  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");

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

  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleDeleteAuthor = async (id) => {
    const debouncedAuthor = debounce(getListAuthor, 1000);
    try {
      await dispatch(deleteAuthor({ id }));
      notify("Đang xoá!");
      debouncedAuthor();
    } catch (error) {
      console.log(error.message);
      notify(error.message);
    }
  };

  const getListAuthor = () => {
    let row = "20";
    dispatch(getAuthors({ limit: row, page: page }))
      .then(unwrapResult)
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClearOldData = () => {
    setName("");
  };

  const handleClickCreateAuthor = () => {
    handleClearOldData();
    setAuthorId("");
    setShowCreate(!showCreate);
  };

  const handleCreateAuthor = () => {
    const debouncedAuthorCreate = debounce(getListAuthor, 1000);
    if (name.length > 1) {
      try {
        setShowCreate(false);
        dispatch(
          createAuthor({
            name: name,
            img: "",
          })
        ).then(notify("Đã tạo!"));
        handleClearOldData();
        debouncedAuthorCreate();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setColor("#980303");
      notify("Vui lòng kiểm tra lại thông tin!");
    }
  };

  const handleClickUpdateAuthor = (name, id) => {
    setName(name);
    setAuthorId(id);
  };

  const handleUpdateAuthor = () => {
    const debouncedAuthorUpdate = debounce(getListAuthor, 1000);
    if (name.length > 1 && authorId) {
      try {
        setShowCreate(false);
        dispatch(
          updateAuthor({
            id: authorId,
            name: name,
            image: "",
          })
        );
        notify("Đã cập nhật!");
        handleClearOldData();
        debouncedAuthorUpdate();
      } catch (error) {
        console.log(error.message);
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

  useEffect(() => {
    getListAuthor();
  }, [page]);

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
            <div className="flex w-full justify-end">
              <Tippy content="Tạo mới">
                <span>
                  <Button
                    className="mr-2 rounded-2xl bg-[#0c9dd6] text-white"
                    onClick={() => {
                      handleClickCreateAuthor();
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
                        <td
                          className={className}
                          onClick={() => {
                            handleShowCreate(),
                              handleClickUpdateAuthor(
                                author?.name ?? "",
                                author?.id ?? ""
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
                        <td
                          className={className}
                          onClick={() => handleDeleteAuthor(author.id)}
                        >
                          <Tippy content="Xoá">
                            <span>
                              <Typography
                                variant="small"
                                as="p"
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
      {authors && showCreate && (
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
                        <img
                          className="mx-auto transition-transform duration-500 hover:scale-105"
                          width={200}
                          src={"/img/logo-ct.png"}
                          alt={"Author"}
                        />
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            variant="standard"
                            label="Tên tác giả"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="pt-9 text-center">
                          <Button
                            type={"submit"}
                            onClick={() =>
                              authorId
                                ? handleUpdateAuthor()
                                : handleCreateAuthor()
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

export default Authors;
