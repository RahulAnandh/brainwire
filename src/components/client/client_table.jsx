import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  SearchOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Tooltip,
  Modal,
  Row,
  Col,
  Divider,
  Avatar,
} from "antd";
import Highlighter from "react-highlight-words";

const ClientTable = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [arrow, setArrow] = useState("Show");
  const [modalData, setModalData] = useState({ open: false, data: {} });
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "E Mail",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Web Site",
      dataIndex: "website",
      key: "website",
      width: "15%",
      ...getColumnSearchProps("website"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => {
        return (
          <a>
            <Space>
              <GlobalOutlined />
              {record.website}
            </Space>
          </a>
        );
      },
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.phone.length - b.phone.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "25%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      render: (_, record) => {
        return (
          <>
            <Space>
              <Tooltip
                placement="top"
                title={`LAT: ${record.lat},  LNG: ${record.lat}`}
                arrow={mergedArrow}
              >
                <EnvironmentOutlined />
              </Tooltip>

              {record.address}
            </Space>
          </>
        );
      },
    },
    {
      title: "View",
      width: "7%",
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setModalData({ open: !modalData.open, data: record });
            }}
          >
            <Space>
              <EyeOutlined />
              View
            </Space>
          </a>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={props?.user_list ? props?.user_list : []}
        size="small"
        loading={props?.loading}
      />
      {console.log("1---1:", props)}
      <Modal
        title="User Details"
        x
        open={modalData.open}
        onOk={() => setModalData({ data: {}, open: false })}
        onCancel={() => {
          setModalData({ data: {}, open: false });
        }}
      >
        <Row>
          <Col style={{ width: "20%" }}>
            <Avatar
              size={70}
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Col>
          <Col style={{ width: "80%" }}>
            <Row>
              <Col style={{ textAlign: "left", width: "50%" }}>ID</Col>{" "}
              <Col style={{ textAlign: "right", width: "50%" }}>
                {modalData.data.id}
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "left", width: "50%" }}>Name</Col>{" "}
              <Col style={{ textAlign: "right", width: "50%" }}>
                {modalData.data.name}
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "left", width: "50%" }}>User Name</Col>{" "}
              <Col style={{ textAlign: "right", width: "50%" }}>
                {modalData.data.username}
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider plain>Contact</Divider>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>E Mail</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.email}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Website</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.website}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Phone Number</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.phone}
          </Col>
        </Row>
        <Divider plain>Address</Divider>

        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Suite</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.suite}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Street</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.street}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>City</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.city}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Zip Code</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.zipcode}
          </Col>
        </Row>
        <Divider plain>Company Details</Divider>

        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Company Name</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.company_name}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>Company BS</Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.company_bs}
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>
            Company Catch Phrase
          </Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.company_catch_phrase}
          </Col>
        </Row>
        <Divider plain>Location Details</Divider>

        <Row>
          <Col style={{ textAlign: "left", width: "50%" }}>
            Latitude and Longitude
          </Col>{" "}
          <Col style={{ textAlign: "right", width: "50%" }}>
            {modalData.data.lat} , {modalData.data.lng}
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ClientTable;
