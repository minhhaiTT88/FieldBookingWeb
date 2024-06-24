import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal } from "antd";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/controls/DataTableV2";

import { Content } from "antd/lib/layout/layout";
import { columCustomerDefs } from "./Component/Comon";
import FormItems from "./Component/FormItems";
import { useCustomerApi } from "../../apiHelper/api/CustomerApi";

const Index = () => {
  const apiClient = useCustomerApi();
  const [formSearch] = Form.useForm();

  const [form] = Form.useForm();
  const [action, setAction] = useState("");
  const [title, setTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);

  const ShowModal = (data, action) => {
    if (action === "create") {
      setTitle("Thêm mới");
    } else if (action === "detail") {
      setTitle("Chi tiết");
    } else if (action === "update") {
      setTitle("Cật nhật");
    }
    setAction(action);
    setRowSelected(data);
    setModalOpen(true);
    console.log(data)
    form.setFieldsValue(data);
  };

  const CloseModal = () => {
    setAction("");
    setRowSelected(undefined);
    setModalOpen(false);
  };

  const HandleDelete = (param) => {
    apiClient
      .Delete(param.ProductId)
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
          CloseModal();
          Search();
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
          CloseModal();
          Search();
        } else {
          toast.error(data.message);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const HandleGetDetail = (param, action) => {
    apiClient
      .GetById(param.CustomerId)
      .then((data) => {
        ShowModal(data, action);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const columns = columCustomerDefs({ HandleGetDetail, HandleDelete });

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
            items={[{ title: "Danh sách khách hàng" }]}
          />

          <div className="flex-content">
            <div className="card-content">
              <Form
                className="form-search"
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
            <FormItems formInstance={form} action={action} data={rowSelected} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
