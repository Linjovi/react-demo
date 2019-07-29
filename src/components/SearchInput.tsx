import React from "react";
import Repo from "@/api/repo";
import { Input } from "antd";
const { Search } = Input;

export function SearchInput(props:any) {
  const [path, setPath] = React.useState("");

  React.useEffect(() => {
    Repo.getPath().then(res => {
      setPath(res.data);
    });
  }, []);

  const setRepoPath = (newPath:string) => {
    Repo.setPath(newPath)
    props.callback(newPath)
  };

  return (
    <div>
      路径：
      <Search
        value={path}
        onChange={e=>setPath(e.target.value)}
        enterButton="确定"
        onSearch={value => setRepoPath(value)}
        style={{ width: 300 }}
      />
    </div>
  )
}
