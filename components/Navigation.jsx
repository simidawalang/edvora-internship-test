import React from "react";
import Link from "next/link";
import Image from "next/image";
import { user } from "../data/user";

import avatar from "../public/avatar.png";

const Navigation = () => {
  return (
    <>
      <header>
        <h1 className="title">Edvora</h1>
        <div className="user-details">
          <p>{user.name}</p>
          <Image src={avatar} width={44} height={44} alt="user avatar" />
        </div>
      </header>
    </>
  );
};

export default Navigation;
