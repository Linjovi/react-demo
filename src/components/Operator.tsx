import React from "react";
import SelectContext from "@/components/selectContext";
import io from "socket.io-client";
import * as path from "path";
import { Input, Modal, Button } from "antd";
import "./Operator.css";
import * as actionCreators from "@/store/actions";
import { useSelector, useDispatch } from "react-redux";

const { Search } = Input;
const socket = io("http://localhost:4000");

export function Operator() {
  const list = React.useContext(SelectContext);
  const [result, setResult] = React.useState([{ type: "", data: "" }]);
  const [current, setCurrent] = React.useState("");
  const [step, setStep] = React.useState(0);
  const _repos = useSelector((state: any) => state._repos);
  const dispatch = useDispatch();

  React.useEffect(() => {
    socket.on("connect", function() {
      console.log("connected");
    });
    socket.on("out", (data: any) => {
      setResult(prevResult => prevResult.concat({ type: "out", data }));
    });
    socket.on("err", (data: any) => {
      setResult(prevResult => prevResult.concat({ type: "error", data }));
    });
    socket.on("close", (data: any) => {
      setResult(prevResult => prevResult.concat({ type: "close", data: "" }));
    });
    socket.on("disconnect", function() {
      console.log("Disconnected");
    });
  }, []);

  React.useEffect(() => {
    let data = result[result.length - 1];
    if (!data) {
      return;
    }
    data.data = data.data.replace(/\n/g, "");
    const begin = /^\/(.*):$/;
    const end = /^\/(.*)\s✓/;
    if (data.type === "error") {
      return;
    } else {
      switch (step) {
        case 0:
          setCurrent(path.basename(data.data.split(":")[0]));
          setStep(1);
          return;
        case 1:
          if (data.type === "close") {
            dispatch(
              actionCreators.getStatus({ name: current, status: "fail" })
            );
            setCurrent("");
            setStep(0);
            return;
          }
          if (end.test(data.data)) {
            //success
            dispatch(
              actionCreators.getStatus({ name: current, status: "success" })
            );
            if (begin.test(data.data)) {
              setCurrent(path.basename(data.data.split("✓")[1].split(":")[0]));
            } else {
              setCurrent("");
              setStep(0);
            }
          } else {
            //info or error
            if (begin.test(data.data)) {
              dispatch(
                actionCreators.getStatus({ name: current, status: "fail" })
              );
              setCurrent(path.basename(data.data.split(":")[0]));
            }
          }
          return;
        default:
          return;
      }
    }
  }, [result]);

  const run = (repos: string[], opera: string) => {
    setResult([]);
    setStep(0);
    let newList = _repos.map((item: any) => {
      item.status = null;
      return item;
    });
    dispatch(actionCreators.getRepos(newList));
    console.log("run")
    socket.emit("operator", { repos, opera }, (response: any) =>
      console.log("Operator:", response)
    );
  };

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  return (
    <div>
      <Search
        enterButton="运行"
        onSearch={value => run(list, value)}
        style={{ width: 300 }}
      />
      <Button onClick={showModal}>shell log</Button>
      <Modal
        title="Shell Log"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="operator-model"
      >
        {result.map((item, index) => (
          <p key={index} className={item.type === "error" ? "error" : ""}>
            {item.data}
          </p>
        ))}
      </Modal>
    </div>
  );
}
