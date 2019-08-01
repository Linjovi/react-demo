import React from "react";
import { Table } from "antd";
import Repo from "@/api/repo";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "@/store/actions";

export function RepoList(props: any) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Url",
      dataIndex: 'gitInfo.remote "origin".url'
    },
    {
      title: "status",
      dataIndex: "status",
      render: (text: string) => (
        <span className={text === "success" ? "success" : "error"}>{text}</span>
      )
    }
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      let newSelects: any = [];
      selectedRows.forEach((element: any) => {
        newSelects.push(element.name);
      });
      props.callback(newSelects);
    }
  };

  const repos = useSelector((state: any) => {
    return state._repos;
  });

  const dispatch = useDispatch();

  const initFetch = React.useCallback(() => {
    Repo.getRepos(props.repoPath).then(res => {
      dispatch(actionCreators.getRepos(res.data));
    });
  }, [dispatch, props.repoPath]);

  React.useEffect(() => {
    initFetch();
  }, [initFetch]);

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
