import React from "react";
import SelectContext from "@/components/selectContext";
import Repo from "@/api/repo"
import { Input } from "antd";
const { Search } = Input;


export function Operator() {
  const list = React.useContext(SelectContext);
  console.log(list)
  const run = (data:string[],opera:string)=>{
    Repo.run(data,opera)
  }
  return (
    <div>
      <Search
        enterButton="运行"
        onSearch={value => run(list,value)}
        style={{ width: 300 }}
      />
    </div>
  )
}
