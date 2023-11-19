import type { MetaFunction } from "@remix-run/node";
import Header from "../components/Header/header.index";

export const meta: MetaFunction = () => {
  return [
    { title: "Amazon - Bookshop" },
    { name: "description", content: "Welcome to this new amazon bookshop" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Header title="Amazon - Bookshop" />
    </div>
  );
}
