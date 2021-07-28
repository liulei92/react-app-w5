/*
 * @Description: Home.tsx
 * @Date: 2021-07-27 16:43:27
 * @Author: LeiLiu
 */
import React from "react";
import { observer } from "mobx-react";
import Timestamp from "@/components/Timestamp";

import "./home.less";
import logo from "@/assets/images/logo192.png";

function Home(props: any) {
  return (
    <div className="home">
      <img src={logo} alt="" />
      Home
      <Timestamp />
    </div>
  );
}

export default observer(Home);
