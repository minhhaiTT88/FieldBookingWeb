import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Breadcrumb, Button, Form, Modal } from "antd";

import ItemSearch from "./Component/ItemSearch";

import DataTableV2 from "../../components/controls/DataTableV2";

import { Content } from "antd/lib/layout/layout";
import { columStaffDefs } from "./Component/Comon";
import FormItems from "./Component/FormItems";
import { useBillApi } from "../../apiHelper/api/BillApi";

const Index = () => {
  const apiClient = useBillApi();
  const [formSearch] = Form.useForm();

  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);

  const ShowModal = (param, action) => {
    setModalOpen(true);
console.log(param)
    if (param) {
      apiClient
        .GetById(param.BillId)
        .then((data) => {
          if (data) {
            form.setFieldValue("Bill", data);
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
    setModalOpen(false);
  };

  const HandleDelete = (param) => {
    apiClient
      .Delete(param.StaffId)
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

  const columns = columStaffDefs({ ShowModal, HandleDelete });

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
            items={[{ title: "Danh sách hóa đơn" }]}
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
          title={"Chi tiết"}
          centered
          width={1226}
          open={modalOpen}
          onCancel={() => CloseModal()}
          footer={[
            <Button key="cancel" type="primary" onClick={() => CloseModal()}>
              Đóng
            </Button>,
          ]}
          className="ant-modal-scrollbar"
        >
          <Form form={form} disabled className={"ant-form-details"}>
            <FormItems formInstance={form} />
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Index;
