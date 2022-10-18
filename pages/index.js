import Head from "next/head";
import Image from "next/image";

import { BGComponent, Footer, Header, HomeBanner } from "../containers";
import Styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={"bodyContainer"}>
      <Header />
      <BGComponent Component={<HomeBanner />} />

      <Footer />
    </div>
  );
}
