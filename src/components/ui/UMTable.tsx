import { Button, Table } from "antd";

const UMTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a: any, b: any) => a - b,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <Button onClick={() => console.log(data)} type="primary" danger>
            X
          </Button>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const handleChangePaginationOptions = (page: number, size: number): void => {
    console.log("page:", page, "size:", size);
  };

  const paginationOptions = {
    pageSize: 5,
    total: 10,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: true,
    onChange: handleChangePaginationOptions,
  };

  const handleChangeTableOptions = (
    pagination: any,
    filter: any,
    sorter: any
  ) => {
    const { order, field } = sorter;
    console.log(order, field);
  };

  return (
    <Table
      loading={false}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationOptions}
      onChange={handleChangeTableOptions}
    />
  );
};

export default UMTable;
