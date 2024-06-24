import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Row,
  Select,
} from "antd";

import ItemSearch from "./Component/ItemSearch";

import { usePostsApi } from "../../apiHelper/api/PostsApi";
import { Content } from "antd/lib/layout/layout";
import { columPostList } from "./Component/Comon";
import { Footer } from "antd/es/layout/layout";
import PaginationV2 from "../../components/controls/PaginationV2";
import ProductCard from "./Component/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faPlus,
  faSubtract,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ItemInCart from "./Component/ItemInCart";
import { formatNumberV2 } from "../../utils/convertData";
import { useGlobalConst } from "../../utils/constData";
import { useBillApi } from "../../apiHelper/api/BillApi";
import { useProductApi } from "../../apiHelper/api/ProductApi";
import { useFieldApi } from "../../apiHelper/api/FieldApi";
import { useCustomerApi } from "../../apiHelper/api/CustomerApi";
import FormItemsPayment from "./Component/FormItemsPayment";
import moment from "moment";
import { PAYMENT_TYPE } from "../FieldBookingList/Component/Comon";

const Index = () => {
  const globalConst = useGlobalConst();
  const apiClient = useBillApi();
  const apiProduct = useProductApi();
  const apiField = useFieldApi();
  const apiCustomer = useCustomerApi();

  const [modalOpen, setModalOpen] = useState(false);

  const [formSearch] = Form.useForm();
  const [formPayment] = Form.useForm();
  const [formConfirm] = Form.useForm();

  const [listProductSearch, setListProductSearch] = useState([]);

  const [listProduct, setListProduct] = useState([]);
  const [listProductInCart, setListProductInCart] = useState([]);

  const [lstField, setLstField] = useState([]);

  const totalBill = useMemo(() => {
    return listProductInCart.reduce((acc, product) => acc + product.Total, 0);
  }, [listProductInCart]);

  useEffect(() => {
    GetProducts();
    LoadFields();
  }, []);

  useEffect(() => {
    Search("");
  }, [listProduct]);

  const LoadFields = () => {
    apiField.GetAll().then((data) => {
      if (data) {
        setLstField(data);
      }
    });
  };

  const GetProducts = () => {
    apiProduct
      .GetAll()
      .then((res) => {
        if (res) {
          setListProduct(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Search = (value = "") => {
    const searchData = listProduct?.filter((x) =>
      x.ProductName.toUpperCase().includes(value.toUpperCase())
    );
    setListProductSearch(searchData);
  };

  useEffect(() => {
    formPayment.setFieldValue("Total", totalBill);
  }, [totalBill]);

  const handleAddItem = (item) => {
    //tìm sản phẩm vừa chọn trong giỏ hàng
    const find = listProductInCart.find((x) => x.ProductId === item.ProductId);

    if (find) {
      //nếu có trong giỏ hàng rồi thì cộng số lượng lên 1
      handleUpdateCount(find, find.Count + 1);
    } else {
      //nếu chưa có trong giỏ hàng thì thêm vào với số lượng là 1
      const lstInCartNew = [...listProductInCart];
      lstInCartNew.push({ ...item, Count: 1, Total: item.Price });
      setListProductInCart(lstInCartNew);
    }
  };

  const handleSubtractItem = (item) => {
    handleUpdateCount(item, item.Count - 1);
  };

  const handlePlusItem = (item) => {
    handleUpdateCount(item, item.Count + 1);
  };

  const handleRemoveItem = (item) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      okText: "Xác nhận",
      cancelText: "Đóng",
      centered: true,
      onOk: () => {
        const lstInCartNew = listProductInCart.filter(
          (x) => x.ProductId !== item.ProductId
        );
        setListProductInCart(lstInCartNew);
      },
    });
  };

  const handleUpdateCount = (item, newCount) => {
    if (newCount === 0) {
      //nếu số lượng mới là 0 thì xóa khỏi giỏ hàng
      handleRemoveItem(item);
    } else {
      //tìm thông tin sản phẩm trong danh sách sản phẩm
      const product = listProduct.find((x) => x.ProductId === item.ProductId);
      if (newCount > product.Count) {
        //nếu như số lượng mới cần cập nhật trong giỏ hàng lớn hơn số lượng sản phẩm trong kho thì báo lỗi
        toast.error("Số lượng sản phẩm đã đạt mức tối đa");
        return -1;
      }

      //cập nhật số lượng trong giỏ hàng bằng newCount và tính lại tổng giá
      const lstInCartNew = listProductInCart.map((e) => {
        const newTotal = e.Price * newCount;
        if (e.ProductId === item.ProductId) {
          return {
            ...e,
            Count: newCount,
            Total: newTotal,
          };
        } else {
          return e;
        }
      });
      setListProductInCart(lstInCartNew);
    }
  };

  const HandlePayment = (values) => {
    apiClient
      .Insert(values)
      .then((res) => {
        if (res && res.code > 0) {
          toast.success("Thanh toán thành công");
          //thanh toán thành công thì reset dữ liệu trong trang
          CloseModal();
          handleRefresh();
        } else {
          toast.error("Thanh toán thất bại");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRefresh = () => {
    setListProductInCart([]);
    formPayment.resetFields();
    GetProducts();
  };

  const handleOnBlurPhoneNumber = (event) => {
    const value = event.target.value;

    const pattern = /^0\d{9}$/;
    if (value && pattern.test(value) === true) {
      apiCustomer.GetPhoneNumber(value).then((data) => {
        if (data?.PhoneNumber !== undefined) {
          Modal.confirm({
            title: "Xác nhận",
            content:
              "Thông tin khách hàng này đã tồn tại trong hệ thống bạn có muốn tự động điền?",
            okText: "Xác nhận",
            cancelText: "Đóng",
            centered: true,
            onOk: () => {
              formPayment.setFieldsValue(data);
            },
          });
        } else {
          formPayment.setFieldsValue({
            CustomerId: 0,
            CustomerName: undefined,
          });
        }
      });
    }
  };

  const ShowModal = (param) => {
    formPayment.submit();
    formPayment
      .validateFields()
      .then((values) => {
        setModalOpen(true);

        const billDetails =
          listProductInCart.map((e) => ({
            ProductId: e.ProductId,
            ProductName: e.ProductName,
            Description: e.Note,
            Count: e.Count,
            Price: e.Price,
            Total: e.Price * e.Count,
            Type: "PR"
          })) || [];

        console.log(billDetails);

        const fieldName = lstField.find(
          (x) => x.FieldId == values.FieldId
        )?.FieldName;
        //tạo thông tin hóa đơn
        const bill = {
          Code: "HD-" + moment().format("DDMMYYYYHHmmSSFF"),
          CustomerId: values.CustomerId || 0,
          CustomerName: values.CustomerName,
          PhoneNumber: values.PhoneNumber,
          FieldId: values.FieldId,
          FieldName: fieldName,
          BillDetails: billDetails,
          Total: totalBill,
          Discount: 0,
          PaymentMethod: PAYMENT_TYPE.card,
          Fee: 0,
          TotalBeforeDiscount: totalBill,
        };
        console.log(bill);
        formConfirm.setFieldsValue(bill);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="content-scroll h-screen scroll">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: "Tạo hóa đơn" }]}
          />

          <div className="flex-content">
            <Row>
              <Col span={16}>
                <div>
                  <div className="card-content">
                    <div className="font-bold mb-4">Điều kiện tìm kiếm</div>
                    <Form className="form-search" form={formSearch}>
                      <ItemSearch onSubmit={Search} />
                    </Form>
                  </div>
                  <div className="not_allow_hightlight mt-4">
                    <List
                      pagination={{ pageSize: 10, align: "center" }}
                      grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 6,
                      }}
                      dataSource={listProductSearch}
                      renderItem={(item) => (
                        <List.Item>
                          <ProductCard item={item} onClick={handleAddItem} />
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <Form className="form-search" form={formPayment}>
                  <div className="field-list">
                    <Form.Item name={"Total"} hidden />
                    <div className="card-content ml-4">
                      <div>
                        <Form.Item name={"CustomerId"} hidden />
                        <Form.Item
                          label={`Sân`}
                          name={"FieldId"}
                          {...globalConst.ANT.FORM.ITEM.SELECT.FORMAT_SELECT}
                          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                        >
                          <Select
                            allowClear
                            mode="single"
                            showSearch
                            optionFilterProp="children"
                          >
                            {lstField.map((item, key) => (
                              <Option key={key} value={item.FieldId}>
                                {item.FieldName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label={`Số điện thoại`}
                          name={"PhoneNumber"}
                          rules={[
                            globalConst.ANT.FORM.RULES.yeuCauNhap,
                            globalConst.ANT.FORM.RULES.soDienThoai,
                          ]}
                        >
                          <Input
                            autoComplete="off"
                            onBlur={handleOnBlurPhoneNumber}
                          />
                        </Form.Item>
                        <Form.Item
                          label={`Tên khách hàng`}
                          name={"CustomerName"}
                          rules={[globalConst.ANT.FORM.RULES.yeuCauNhap]}
                        >
                          <Input autoComplete="off" />
                        </Form.Item>
                      </div>
                      <div className="max-h-80 scroll">
                        {listProductInCart.map((item) => (
                          <ItemInCart
                            item={item}
                            onPlus={handlePlusItem}
                            onSubTract={handleSubtractItem}
                            onRemove={handleRemoveItem}
                            onUpdateCount={handleUpdateCount}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-4 my-4 text-base">
                        <span>Tổng tiền</span>
                        <span className="font-bold">
                          {formatNumberV2(totalBill)}đ
                        </span>
                      </div>
                      {/* <div className="w-full flex justify-end"> */}
                      <Button
                        type="primary"
                        size="large"
                        className="light-orange w-full"
                        onClick={ShowModal}
                      >
                        <FontAwesomeIcon icon={faCashRegister} />
                        <span>Thanh toán</span>
                      </Button>
                      {/* </div> */}
                    </div>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </div>

      {modalOpen && (
        <Modal
          title={"Xác nhận thanh toán"}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => CloseModal()}
          footer={[
            <Button
              key="ok"
              htmlType="submit"
              type="outline"
              onClick={() => {
                formConfirm.submit();
                formConfirm
                  .validateFields()
                  .then((values) => {
                    HandlePayment(values);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Xác nhận
            </Button>,
            <Button key="cancel" type="primary" onClick={() => CloseModal()}>
              Đóng
            </Button>,
          ]}
          className="ant-modal-scrollbar"
        >
          <Form
            form={formConfirm}
            // disabled={action === "detail" ? true : false}
            // className={action === "detail" ? "ant-form-details" : ""}
          >
            <FormItemsPayment formInstance={formConfirm} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
