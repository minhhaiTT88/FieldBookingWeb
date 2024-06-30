//view
import Dashboard from "../pages/Dashboard/Index";

import Product from "../pages/Product/Index";
import Field from "../pages/Field/Index";
import Staff from "../pages/Staff/Index";
import Store from "../pages/Store/Index";

import FieldBookingList from "../pages/FieldBookingList/Index";
import BillSearch from "../pages/BillSearch/Index";
import Customer from "../pages/Customer/Index";

//layout
import LayoutLeftSideBar from "../components/layout/LayoutLeftSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faHome,
  faIdBadge,
  faListCheck,
  faMagnifyingGlass,
  faMoneyBill,
  faStore,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { User_Type_Enum } from "../utils/constData";

export const RoutersConfig = [
  {
    Function_Id: "DASHBOARD",
    Function_Name: "Trang chủ",
    icon: <FontAwesomeIcon icon={faHome} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Dashboard },
  },
  {
    Function_Id: "STORE",
    Function_Name: "Bán hàng",
    icon: <FontAwesomeIcon icon={faStore} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/ban-hang",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Store },
  },
  {
    Function_Id: "FEILDBOOKING",
    Function_Name: "Quản lý đặt sân",
    icon: <FontAwesomeIcon icon={faListCheck} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-don-dat-san",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: FieldBookingList },
  },
  {
    Function_Id: "FIELD",
    Function_Name: "Quản lý sân bóng",
    icon: <FontAwesomeIcon icon={faMoneyBill} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-san-bong",
    FunctionType: [User_Type_Enum.Admin],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Field },
  },
  {
    Function_Id: "BILLSEARCH",
    Function_Name: "Tra cứu hóa đơn",
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/tra-cuu-hoa-don",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: BillSearch },
  },
  {
    Function_Id: "PRODUCT",
    Function_Name: "Quản lý sản phẩm",
    icon: <FontAwesomeIcon icon={faBottleWater} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-san-pham",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Product },
  },
  {
    Function_Id: "STAFF",
    Function_Name: "Quản lý nhân viên",
    icon: <FontAwesomeIcon icon={faIdBadge} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/quan-ly-nhan-su",
    FunctionType: [User_Type_Enum.Admin],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Staff },
  },
  {
    Function_Id: "CUSTOMER",
    Function_Name: "DS khách hàng",
    icon: <FontAwesomeIcon icon={faUsers} />,
    DisplayOnMenu: 1,
    checkRight: false,
    Function_Url: "/danh-sach-khach-hang",
    FunctionType: [User_Type_Enum.Admin, User_Type_Enum.Staff],
    pageLayout: LayoutLeftSideBar,
    pageContent: { component: Customer },
  },
];
