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
import { ordersSelector } from "@/redux/selectors";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaCheckCircle, FaPencilAlt, FaSearch, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getOrders } from "@/redux/reducers/orders";
import { InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import greenBookAPI from "@/api/greenBookAPI";
import { debounce } from "lodash";

export function Orders() {
  const [page, setPage] = useState(1);
  const orders = useSelector(ordersSelector);
  const dispatch = useDispatch();
  const getItemProps = (index) => ({
    variant: page === index ? "filled" : "text",
    color: page === index ? "blue" : "blue-gray",
    onClick: () => setPage(index),
  });

  const handleChangeStatus = async({id, status})=>{
   
    const getListOrder = () => {
      dispatch(getOrders())
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        });
    };
    const debouncedSearch = debounce(getListOrder, 1000);
    try {
      await greenBookAPI.updateStatusOrder(id,status)
      debouncedSearch();
    } catch (error) {
      console.log(error.message);
    }
    
    
  }

  const Item = (props)=>{
     const [showEdit, setShowEdit] = useState(false);
     const [selected, setSelected] = useState('');
     const data=[ "Mới", "Đang xác nhận","Đã xác nhận", "Đang vận chuyển","Thành công", "Thất bại"]
    return(
      <tr>
        <td className={props.className}>
          <div className="flex items-center gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
              >
                {props?.user}
              </Typography>
            </div>
          </div>
        </td>
        <td className={`${props.className} hidden lg:block`}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {props?.created_at}
          </Typography>
        </td>
        <td className={props.className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {props?.ship_address != "string"
              ? props?.ship_address
              : props?.default_address}
          </Typography>
        </td>
        <td className={props.className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {props?.total_price?.toLocaleString() ?? ""}
          </Typography>
        </td>
        <td className={props.className}>
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {props?.items?.length ?? ""}
          </Typography>
        </td>
        <td className={props.className}>
          {showEdit? 
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected?selected: props?.status}
            variant="outlined"
            sx={{
            height: 35,
            }}
            onChange={(event)=>setSelected(event.target.value)}
          >
            {data.map((e)=><MenuItem key={e}  className="text-sm" value={e}><small>{e}</small></MenuItem>)}
          
          </Select>
        :
          <Chip
            variant="gradient"
            color={
              props?.status &&
              props?.status == "Mới"
                ? "blue"
                : props?.status == "Thành công"
                ? "green"
                : "red"
            }
            value={props?.status ?? ""}
            className="py-0.5 px-2 text-[11px] font-medium"
          />}
        </td>
        <td className={props.className} onClick={()=>setShowEdit(!showEdit)}>
        {showEdit ?
        <div className="flex gap-2"> 
          <b className="cursor-pointer" onClick={()=>{handleChangeStatus({id:props?.id, status:selected}); setShowEdit(false)}}><FaCheckCircle className="text-[#03943b]"></FaCheckCircle></b>
          <span className="cursor-pointer" onClick={()=>setShowEdit(false)}><FaTimesCircle className="text-[#941903]"></FaTimesCircle></span>
        </div>: 
          <Tippy content="Chỉnh sửa">
            <span>
              <Typography
                variant="small"
                as="a"
                className="flex items-center justify-center text-xs font-semibold text-blue-gray-600"
              >
                <FaPencilAlt></FaPencilAlt>
              </Typography>
            </span>
          </Tippy>}
        </td>
      </tr>
    )
  }

  const next = () => {
    if (page === 5) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  useEffect(() => {
    const getListOrder = () => {
      dispatch(getOrders())
        .then(unwrapResult)
        .catch((err) => {
          console.log(err);
        });
    };
    getListOrder();
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
            Đơn hàng
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
                  "Khách hàng",
                  "Ngày dặt hàng",
                  "Địa chỉ",
                  "Tổng",
                  "Số sản phẩm",
                  "Trạng thái",
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
              {orders &&
                orders.map((order, key) => {
                  const className = `p-1 xl:py-2 xl:px-4 ${
                    key === orders.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <Item 
                    key={order?.order?.id}
                    id={order?.order?.id}
                    user={order?.user?.first_name + " " +order?.user?.last_name}
                    className={className}
                    created_at={order?.order?.created_at}
                    total_price={order?.order?.total_price}
                    items={order?.order?.items}
                    status={order?.order?.status}
                    ship_address={order?.user?.ship_address}
                    default_address={order?.user?.default_address}
                    ></Item>
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

export default Orders;
