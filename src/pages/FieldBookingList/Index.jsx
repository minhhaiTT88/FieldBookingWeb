import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal } from "antd";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/controls/DataTableV2";

import { Content } from "antd/lib/layout/layout";
import { PAYMENT_TYPE, columFieldBookingDefs } from "./Component/Comon";
import FormItems from "./Component/FormItems";
import { useSearchParams } from "react-router-dom";
import { useFieldBookingApi } from "../../apiHelper/api/FieldBookingApi";
import FormItemsPayment from "./Component/FormItemsPayment";
import { formatDate } from "date-fns";
import moment from "moment";
import { useBillApi } from "../../apiHelper/api/BillApi";

const Index = () => {
  const apiClient = useFieldBookingApi();
  const apiBill = useBillApi();
  const [formSearch] = Form.useForm();

  const [form] = Form.useForm();
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);

  const ShowModal = (param, action) => {
    if (action === "create") {
      setTitle("Thêm mới");
    } else if (action === "detail") {
      setTitle("Chi tiết");
    } else if (action === "update") {
      setTitle("Cật nhật");
    } else if (action === "payment") {
      setTitle("Thanh toán");
    }
    setAction(action);
    setRowSelected(param);
    setModalOpen(true);

    if (param) {
      apiClient
        .GetById(param.FieldBookingId)
        .then((data) => {
          if (data) {
            console.log(data);
            form.setFieldsValue({
              ...data,
              CashMustPay: data.FieldPrice - data.Deposit,
              Discount: 0,
            });
            if (action === "payment") {
              //tạo thông tin hóa đơn
              const bill = {
                Code: "HD-" + moment().format("DDMMYYYYHHmmSSFF"),
                CustomerId: data.CustomerId,
                CustomerName: data.CustomerName,
                PhoneNumber: data.PhoneNumber,
                FieldId: data.FieldId,
                FieldBookingId: data.FieldBookingId,
                FieldName: data.FieldName,
                BillDetails: [
                  {
                    ProductId: data.FieldId,
                    ProductName: data.FieldName,
                    Description: `Ngày ${formatDate(
                      data.BookingDate,
                      "dd/MM/yyyy"
                    )}, Khung giờ ${data.TimeSlotText}`,
                    Count: 1,
                    Price: data.FieldPrice,
                    Total: data.FieldPrice,
                  },
                ],
                Total: data.FieldPrice,
                Discount: 0,
                PaymentMethod: PAYMENT_TYPE.card,
                Fee: 0,
                TotalBeforeDiscount: data.FieldPrice,
              };
              form.setFieldValue("Bill", bill);
            }
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      form.resetFields();
    }
  };

  const CloseModal = () => {
    setAction("");
    setRowSelected(undefined);
    setModalOpen(false);
  };

  const HandleDelete = (param) => {
    apiClient
      .Delete(param.FieldBookingId)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleUpdateStatus = (id, status, reason) => {
    apiClient
      .UpdateStatus(id, status, reason)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleUpdate = (param) => {
    apiClient
      .Update(param)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
          CloseModal();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandlePayment = (param) => {
    apiBill
      .PaymentField(param)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
          CloseModal();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleCreate = (param) => {
    apiClient
      .Insert(param)
      .then((data) => {
        if (data?.code > 0) {
          toast.success(data.message);
          Search();
          CloseModal();
        } else {
          if (data?.code == -2) {
            toast.error(
              "Thêm mới đơn đặt sân thất bại, khung giờ này đã được đặt!"
            );
          } else {
            toast.error(data.message);
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const columns = columFieldBookingDefs({
    ShowModal,
    HandleDelete,
    HandleUpdateStatus,
  });

  const refs = useRef({ refDataGrid: useRef(null) });

  const onEvent = (data) => {
    return {
      DataGrid: refs.current.refDataGrid?.current?.onEvent(data),
    };
  };

  const Search = () => {
    formSearch.submit();
    formSearch
      .validateFields()
      .then((values) => {
        onEvent({
          type: "HANDLE_SEARCH",
          data: values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  useEffect(() => {
    Search();
  }, []);

  return (
    <>
      <div className="content-scroll">
        <Content className="main-layout-content">
          <Breadcrumb
            className="main-layout-breadcrumb"
            items={[{ title: "Danh sách đơn đặt sân tổng hợp" }]}
          />

          <div className="flex-content">
            <div className="card-content">
              <Form
                className="form-search pb-4"
                form={formSearch}
                onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    Search();
                  }
                }}
              >
                <ItemSearch onSubmit={Search} ShowModal={ShowModal} />
              </Form>
            </div>

            <div className="card-content">
              <DataTableV2
                ref={refs.current.refDataGrid}
                columns={columns}
                SearchData={apiClient.SearchData}
              />
            </div>
          </div>
        </Content>
      </div>

      {modalOpen && (
        <Modal
          title={title}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => CloseModal()}
          footer={[
            <Button
              key="ok"
              htmlType="submit"
              type="outline"
              hidden={action === "detail"}
              onClick={() => {
                form.submit();
                form
                  .validateFields()
                  .then((values) => {
                    console.log(values);
                    if (action === "create") {
                      HandleCreate(values);
                    } else if (action === "update") {
                      HandleUpdate(values);
                    } else if (action === "payment") {
                      HandlePayment(values.Bill);
                    }
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
            form={form}
            disabled={action === "detail" ? true : false}
            className={action === "detail" ? "ant-form-details" : ""}
          >
            {action == "payment" ? (
              <FormItemsPayment
                formInstance={form}
                action={action}
                data={rowSelected}
              />
            ) : (
              <FormItems
                formInstance={form}
                action={action}
                data={rowSelected}
              />
            )}
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
