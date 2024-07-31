import { Metadata } from "next";
import Login from "./login/page";

export const metadata: Metadata = {
  title: "Edit UI",
  description: "This is Home ",
};

export default function Home() {
  return (
    <>
      <Login/>
    </>
  );
}
