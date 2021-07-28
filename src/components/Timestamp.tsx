/*
 * @Description: Timestamp.tsx
 * @Date: 2021-07-28 11:47:14
 * @Author: LeiLiu
 */
import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { useStore } from "@/store";

function Timestamp() {
  const { datex } = useStore("datex");

  return (
    <div>
      {datex?.timeString}
      <Button onClick={() => datex?.updateTimestamp()}>updateTime</Button>
    </div>
  );
}

export default observer(Timestamp);
