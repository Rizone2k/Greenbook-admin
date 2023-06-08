import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  IconButton,
  Chip as ChipTailwind,
  Select as SelectTalwind,
  Input,
  Option,
  Textarea,
} from "@material-tailwind/react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import { useDispatch, useSelector } from "react-redux";
import {
  authorsSelector,
  bookIdJustCreatedSelector,
  booksSelector,
  currentUserSelector,
  genresSelector,
} from "@/redux/selectors";
import {
  createBook,
  deleteBook,
  getBooks,
  getBooksOfPublisher,
  searchBook,
  updateBook,
  updateBookImage,
} from "@/redux/reducers/books";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  FaAt,
  FaHeart,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaPhone,
  FaEdit,
  FaSearch,
  FaTrashAlt,
  FaUserCircle,
  FaCheck,
  FaTimes,
  FaPlus,
  FaSyncAlt,
} from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPublishers } from "@/redux/reducers/publisher";
import { getAuthors } from "@/redux/reducers/authors";
import { getGenres } from "@/redux/reducers/genres";
import greenBookAPI from "@/api/greenBookAPI";
import { debounce } from "lodash";

export function Books() {
  const dispatch = useDispatch();
  let books = useSelector(booksSelector);
  let currentUser = useSelector(currentUserSelector);
  let genres = useSelector(genresSelector);
  let authors = useSelector(authorsSelector);
  let bookIdJustCreated = useSelector(bookIdJustCreatedSelector);
  const [page, setPage] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [color, setColor] = useState("#980303");
  const [showSelectImg, setShowSelectImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const [signal, setSignal] = useState(false);
  const [search, setSearch] = useState("");

  // For edit book
  const [idBook, setIdBook] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [weight, setWeight] = useState("");
  const [ageLimit, setAgeLimit] = useState(0);
  const [handCover, setHandCover] = useState("");
  const [coverType, setCoverType] = useState("");
  const [description, setDescription] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [genreIds, setGenreIds] = useState([]);
  const [authorIds, setAuthorIds] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const base64Image = event.target.result;
      console.log(base64Image);
      setSelectedImage(base64Image);
    };
    fileReader.readAsDataURL(file);
    console.log(event.target.files[0]);
    setSelectedImagePreview(file);
  };

  const handleUpdateImage = (id) => {
    console.log(id);
    console.log(selectedImage);
    // setShowSelectImg(!showSelectImg);
    dispatch(updateBookImage({id:id, image:selectedImage}))
      .then(unwrapResult)
      .then(setSignal(!signal))
      .then(notify("Đã cập nhật!"))
      .catch((err) => {
        console.log(err);
        notify(err.message);
      });
  };

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

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };
  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
      .then(unwrapResult)
      .then(setSignal(!signal))
      .then(notify("Đã xoá!"))
      .catch((err) => {
        console.log(err);
        notify(err.message);
      });
  };
  const handleUpdateBook = () => {
    try {
      dispatch(
        updateBook({
          id: idBook,
          name: name,
          isbn: isbn,
          weight: weight,
          age_limit: ageLimit,
          hand_cover: handCover,
          cover_type: coverType,
          description: description,
          rate: "0",
          total_rating: "0",
          available_quantity: availableQuantity,
          sold_quantity: "0",
          price: price,
          genreIds: genreIds,
          authorIds: authorIds,
        })
      )
        .then(unwrapResult)
        .then(handleRefresh)
        .then(setSignal(!signal))
        .then(notify("Đã cập nhật!"))
        .catch((err) => {
          console.log(err);
          notify(err.message);
        });
    } catch (error) {
      notify(error.message);
      console.log(error);
    }
  };
  const handleCreateBook = () => {
    try {
      if (
        name.length > 0 &&
        isbn.length > 0 &&
        weight.length > 0 &&
        ageLimit.length > 0 &&
        handCover.length > 0 &&
        coverType.length > 0 &&
        description.length > 0 &&
        availableQuantity.length > 0 &&
        price.length > 0 &&
        genreIds.length > 0 &&
        authorIds.length > 0
      ) {
        dispatch(
          createBook({
            name: name,
            isbn: isbn,
            weight: weight,
            age_limit: ageLimit,
            hand_cover: handCover,
            cover_type: coverType,
            description: description,
            rate: "0",
            total_rating: "0",
            available_quantity: availableQuantity,
            sold_quantity: "0",
            price: price,
            genreIds: genreIds,
            authorIds: authorIds,
          })
        )
          .then(unwrapResult)
          .then(notify("Đã tạo!"))
          .then(setSignal(!signal))
          .catch((err) => {
            console.log(err);
            notify(err.message);
          });
      } else {
        notify("Vui lòng nhập đủ thông tin");
        console.log("Người dùng nhập thiếu hoặc sai định dạng");
      }
    } catch (error) {
      notify(error.message);
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    setShowEdit(false);
    try {
      let response;
      if (idBook) {
        response = await greenBookAPI.getBook(idBook, "");
        console.log(response?.data?.data);
        setIdBook(response?.data?.data?.id);
        setImg(response?.data?.data?.images[0]?.url);
        setName(response?.data?.data?.name);
        setAgeLimit(response?.data?.data?.ageLimit);
        setIsbn(response?.data?.data?.isbn);
        setWeight(response?.data?.data?.weight);
        setHandCover(response?.data?.data?.handCover);
        setCoverType(response?.data?.data?.coverType);
        setDescription(response?.data?.data?.description);
        setAvailableQuantity(response?.data?.data?.availableQuantity);
        setPrice(response?.data?.data?.price);
        setGenre(response?.data?.data?.genres?.map((e) => e));
        setAuthor(response?.data?.data?.authors?.map((e) => e));
      } else {
        console.log("error!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCreateBook = () => {
    setIdBook("");
    setImg([]);
    setName("");
    setAgeLimit(0);
    setIsbn("978-604-2-28249-9");
    setWeight(0);
    setHandCover("");
    setCoverType("Bìa mềm");
    setDescription("");
    setAvailableQuantity(0);
    setPrice(0);
    setGenre([]);
    setAuthor([]);
  };
  const handleClickUpdateBook = (
    id,
    img,
    name,
    isbn,
    weight,
    ageLimit,
    handCover,
    coverType,
    description,
    availableQuantity,
    price,
    genre,
    author
  ) => {
    setIdBook(id);
    setImg(img);
    setName(name);
    setAgeLimit(ageLimit);
    setIsbn(isbn);
    setWeight(weight);
    setHandCover(handCover);
    setCoverType(coverType);
    setDescription(description);
    setAvailableQuantity(availableQuantity);
    setPrice(price);
    setGenre(genre);
    setAuthor(author);
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
    function handleSearchBook(search) {
      dispatch(searchBook(search))
        .then(unwrapResult)
        .catch((err) => {
          notify(err.message);
        });
    }
    const debouncedSearch = debounce(handleSearchBook, 500);
    search && search.length > 0 && debouncedSearch(search);
    // : debouncedSearch("a");
  }, [search]);

  useEffect(() => {
    Promise.all([
      dispatch(getPublishers())
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        }),
      dispatch(getAuthors({ limit: 30, page: 1 }))
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        }),
      dispatch(getGenres({ limit: 30, page: 1 }))
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        }),
    ]);
  }, []);

  useEffect(() => {
    const getListBook = () => {
      let row = "20";
      dispatch(
        currentUser.roles.some((role) => role.includes("publisher"))
          ? getBooksOfPublisher({ id: currentUser.id_user })
          : getBooks({ limit: row, page: page })
      )
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        });
    };
    getListBook();
  }, [page, signal]);

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
              Sách
            </Typography>
            <div className="relative flex w-1/2 items-center  rounded-lg border-b-2 border-[white] py-2 px-4 shadow-md">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
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
                      handleClickCreateBook();
                      handleShowCreate();
                    }}
                  >
                    <FaPlus></FaPlus>
                  </Button>
                </span>
              </Tippy>
              <Tippy content="Làm mới">
                <span>
                  <Button
                    className="mr-2 rounded-2xl bg-[#0c9dd6] text-white"
                    onClick={() => {
                      setSignal(!signal);
                    }}
                  >
                    <FaSyncAlt></FaSyncAlt>
                  </Button>
                </span>
              </Tippy>
            </div>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Tên sách",
                    "Thể loại",
                    "Trạng thái",
                    "Ngày cập nhật",
                    "",
                    "",
                  ].map((el, index) => (
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
                  ))}
                </tr>
              </thead>
              <tbody>
                {books ? (
                  books.map((book, key) => {
                    const className = `p-1 xl:py-2 xl:px-4 ${
                      key === books.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={book.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={
                                book?.images[0]?.url ??
                                "/img/logo-ct.png"
                              }
                              alt={book.name}
                              size="sm"
                            />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {book.name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                |{" "}
                                {book.authors.map(
                                  (author) => author.name + " | "
                                )}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={`${className} hidden lg:block`}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {book?.genres[0]?.name ?? ""}
                          </Typography>
                          {book.genres[1]?.name && (
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {book.genres[1]?.name}
                            </Typography>
                          )}
                        </td>
                        <td className={className}>
                          <ChipTailwind
                            variant="gradient"
                            color={
                              book.available_quantity &&
                              book.available_quantity === 0
                                ? "red"
                                : book.available_quantity > 5
                                ? "green"
                                : "blue-gray"
                            }
                            value={
                              book.available_quantity &&
                              book.available_quantity === 0
                                ? "hết hàng"
                                : book.available_quantity > "5"
                                ? "còn hàng"
                                : "còn ít"
                            }
                            className="py-0.5 px-2 text-[11px] font-medium"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {book.updated_at}
                          </Typography>
                        </td>
                        <td
                          className={className}
                          onClick={() => {
                            handleShowEdit(),
                              handleClickUpdateBook(
                                book?.id ?? "",
                                book?.images[0]?.url ?? "",
                                book?.name ?? "",
                                book?.isbn ?? "",
                                book?.weight ?? "",
                                book?.age_limit ?? "",
                                book?.hand_cover ?? "",
                                book?.cover_type ?? "",
                                book?.description ?? "",
                                book?.available_quantity ?? "",
                                book?.price ?? "",
                                book?.genres ?? "",
                                book?.authors ?? ""
                              );
                          }}
                        >
                          <Tippy content="Edit">
                            <span>
                              <Typography
                                variant="small"
                                as="p"
                                className="fex items-center justify-center text-xs font-semibold text-blue-gray-600 "
                              >
                                <FaPencilAlt></FaPencilAlt>
                              </Typography>
                            </span>
                          </Tippy>
                        </td>
                        <td
                          className={className}
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Tippy content="Delete">
                            <span>
                              <Typography
                                variant="small"
                                as="p"
                                className="fex items-center justify-center text-xs font-semibold text-red-400 "
                              >
                                <FaTrashAlt></FaTrashAlt>
                              </Typography>
                            </span>
                          </Tippy>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <b className="p-5 ">
                    Không tìm thấy sách nào có tên {search}!
                  </b>
                )}
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

      {books && showEdit && (
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
                    onClick={handleShowEdit}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative max-h-[70vh] flex-auto overflow-auto md:p-4">
                  <div className="mx-auto flex max-w-7xl flex-col items-center rounded-lg p-1 sm:flex-row sm:items-start">
                    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-3 p-1 sm:w-1/3 sm:items-start lg:p-5">
                      <img
                        className="transition-transform duration-500 hover:scale-105"
                        width={300}
                        src={
                          showSelectImg && selectedImagePreview
                            ? URL.createObjectURL(selectedImagePreview)
                            : img.length > 0
                            ? img
                            : "/img/logo-ct.png"
                        }
                        alt={"img"}
                      />
                      <div
                        className={`flex w-full items-center justify-center ${
                          showSelectImg && "gap-3"
                        }`}
                      >
                        <Tippy
                          content={showSelectImg ? "Huỷ" : "Chọn"}
                          placement="bottom"
                        >
                          <div className="text-center">
                            <Button
                              type="button"
                              className={`rounded-xl ${
                                showSelectImg
                                  ? "bg-[#d3d3d3] text-black"
                                  : "bg-[#4b4b4c]"
                              }`}
                              data-mdb-ripple-color="dark"
                              onClick={() => {
                                setShowSelectImg(!showSelectImg);
                                selectedImage && setSelectedImage(null);
                              }}
                            >
                              {showSelectImg ? (
                                <FaTimes></FaTimes>
                              ) : (
                                <FaEdit></FaEdit>
                              )}
                            </Button>
                          </div>
                        </Tippy>
                        {showSelectImg && (
                          <Button
                            type="button"
                            className="rounded-xl bg-[#0f7ab8]"
                            data-mdb-ripple-color="dark"
                            onClick={() => {
                              handleUpdateImage(idBook);
                            }}
                          >
                            <FaCheck></FaCheck>
                          </Button>
                        )}
                      </div>
                      <input
                        type="file"
                        className={`cursor-pointer bg-transparent p-2 text-xs ${
                          showSelectImg ? "" : "hidden"
                        }`}
                        id="image-upload"
                        accept="image/*"
                        multiple={false}
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="w-full rounded-2xl p-1 text-sm shadow-md shadow-[#bedcd7e1] sm:w-2/3 lg:p-5">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            variant="standard"
                            label="1. Tên sách"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            type="number"
                            variant="standard"
                            label="2. Giá"
                          />
                        </div>

                        <div className="flex items-center p-2">
                          <MultiSelect
                            data={genres}
                            selected={genre && genre}
                            title={"3. Thể loại"}
                            onUpdate={setGenreIds}
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <MultiSelect
                            data={authors}
                            selected={author && author}
                            title={"4. Tác giả"}
                            onUpdate={setAuthorIds}
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setWeight(e.target.value)}
                            value={weight}
                            type="text"
                            variant="standard"
                            label="5. Trọng lượng"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setAgeLimit(e.target.value)}
                            value={ageLimit}
                            type="text"
                            variant="standard"
                            label="6. Độ tuổi"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setHandCover(e.target.value)}
                            value={handCover}
                            type="number"
                            variant="standard"
                            label="7. Số trang"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setCoverType(e.target.value)}
                            value={coverType}
                            type="text"
                            variant="standard"
                            label="7. Bìa"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) =>
                              setAvailableQuantity(e.target.value)
                            }
                            value={availableQuantity}
                            type="text"
                            variant="standard"
                            label="8. Số lượng có sẵn"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            type="text"
                            variant="standard"
                            label="9. Giá"
                          />
                        </div>
                      </div>
                      <div className="flex items-center p-2">
                        <Textarea
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          type="text"
                          variant="standard"
                          label="10. Mô tả"
                        />
                      </div>
                      <div>
                        <div className="pt-9 text-center">
                          <Button
                            type={"submit"}
                            onClick={() => handleUpdateBook()}
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
      {books && showCreate && (
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
                    {bookIdJustCreated && bookIdJustCreated.length > 0 && (
                      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-3 p-1 sm:w-1/3 sm:items-start lg:p-5">
                        <img
                          className="transition-transform duration-500 hover:scale-105"
                          width={300}
                          src={
                            showSelectImg && selectedImage && img.length > 0
                              ? URL.createObjectURL(selectedImage)
                              : img.length > 0
                              ? img
                              : "/img/logo-ct.png"
                          }
                          alt={"img"}
                        />
                        {!selectedImage && (
                          <p className="w-full text-center">Chọn ảnh</p>
                        )}
                        <div
                          className={`flex w-full items-center justify-center ${
                            showSelectImg && "gap-3"
                          }`}
                        >
                          <Tippy
                            content={showSelectImg ? "Huỷ" : "Chọn"}
                            placement="bottom"
                          >
                            <div className="text-center">
                              <Button
                                type="button"
                                className={`rounded-xl ${
                                  showSelectImg
                                    ? "bg-[#d3d3d3] text-black"
                                    : "bg-[#4b4b4c]"
                                }`}
                                data-mdb-ripple-color="dark"
                                onClick={() => {
                                  setShowSelectImg(!showSelectImg);
                                  selectedImage && setSelectedImage(null);
                                }}
                              >
                                {showSelectImg ? (
                                  <FaTimes></FaTimes>
                                ) : (
                                  <FaEdit></FaEdit>
                                )}
                              </Button>
                            </div>
                          </Tippy>
                          {showSelectImg && (
                            <Button
                              type="button"
                              className="rounded-xl bg-[#0f7ab8]"
                              data-mdb-ripple-color="dark"
                              onClick={() => {
                                handleUpdateImage(bookIdJustCreated);
                              }}
                            >
                              <FaCheck></FaCheck>
                            </Button>
                          )}
                        </div>
                        <input
                          type="file"
                          className={`cursor-pointer bg-transparent p-2 text-xs ${
                            showSelectImg ? "" : "hidden"
                          }`}
                          id="image-upload"
                          accept="image/*"
                          multiple={false}
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                    <div
                      className={`w-full rounded-2xl p-1 text-sm shadow-md shadow-[#bedcd7e1] sm:w-2/3 lg:p-5 ${
                        bookIdJustCreated.length > 0 ? "" : "sm:w-full"
                      }`}
                    >
                      {!bookIdJustCreated.length > 0 && (
                        <small className="text-[#947023]">
                          *Bạn sẽ tạo sách trước sau đó chọn ảnh
                        </small>
                      )}
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            variant="standard"
                            label="1. Tên sách"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            type="number"
                            variant="standard"
                            label="2. Giá"
                          />
                        </div>

                        <div className="flex items-center p-2">
                          <MultiSelect
                            data={genres}
                            selected={genre && genre}
                            title={"3. Thể loại"}
                            onUpdate={setGenreIds}
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <MultiSelect
                            data={authors}
                            selected={author && author}
                            title={"4. Tác giả"}
                            onUpdate={setAuthorIds}
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setWeight(e.target.value)}
                            value={weight}
                            type="text"
                            variant="standard"
                            label="5. Trọng lượng"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setAgeLimit(e.target.value)}
                            value={ageLimit}
                            type="text"
                            variant="standard"
                            label="6. Độ tuổi"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setHandCover(e.target.value)}
                            value={handCover}
                            type="number"
                            variant="standard"
                            label="7. Số trang"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setCoverType(e.target.value)}
                            value={coverType}
                            type="text"
                            variant="standard"
                            label="7. Bìa"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) =>
                              setAvailableQuantity(e.target.value)
                            }
                            value={availableQuantity}
                            type="text"
                            variant="standard"
                            label="8. Số lượng có sẵn"
                          />
                        </div>
                        <div className="flex items-center p-2">
                          <Input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            type="text"
                            variant="standard"
                            label="9. Giá"
                          />
                        </div>
                      </div>
                      <div className="flex items-center p-2">
                        <Textarea
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          type="text"
                          variant="standard"
                          label="10. Mô tả"
                        />
                      </div>
                      <div>
                        <div className="pt-9 text-center">
                          <Button
                            type={"submit"}
                            onClick={() => handleCreateBook()}
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

export const MultiSelect = (props) => {
  const [selected, setSelected] = useState(
    props.selected.map((select) => select.name)
  );
  const [selectedIds, setSelectedIds] = useState(
    props.selected.map((select) => select.id)
  );
  useEffect(() => {
    props.onUpdate(() => selectedIds);
  }, [selectedIds]);

  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel variant="standard">
        <span className="text-sm">{props.title}</span>
      </InputLabel>
      <Select
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: 0,
            borderBottom: "1px solid rgb(176, 190, 197)",
            borderRadius: 0,
            width: "100%",
          },
        }}
        multiple
        variant="standard"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap" variant="standard">
            {selected.map((value, index) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => {
                  setSelected(selected.filter((item) => item !== value)),
                    setSelectedIds(selectedIds.splice(index, 1));
                }}
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {props.data.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              if (selectedIds.includes(item.id)) {
                setSelectedIds(selectedIds.filter((id) => id !== item.id));
              } else {
                setSelectedIds([...selectedIds, item.id]);
              }
            }}
            value={item.name}
            sx={{ justifyContent: "space-between" }}
          >
            {item.name}
            {JSON.stringify(selected).includes(item.name) ? (
              <CheckIcon color="info" />
            ) : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Books;
