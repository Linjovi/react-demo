import React from "react";
import { Table } from "antd";
import Repo from "@/api/repo";

export function RepoList(props:any){
  const [repos, setRepos] = React.useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name"
      // render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: "Url",
      dataIndex: 'gitInfo.remote "origin".url'
    }
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      let newSelects:any = []
      selectedRows.forEach((element:any) => {
        newSelects.push(element.name)
      });
      props.callback(newSelects)
    }
  };
  React.useEffect(() => {
    Repo.getRepos(props.repoPath).then(res => {
      setRepos(res.data);
    });
  }, [props.repoPath]);

  return (
    <div className="repoList">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={repos}
        rowKey={(record: any) => record.name}
      />
    </div>
  );
}