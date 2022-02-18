import { Outlet } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Outlet />
      Handsome!
    </div>
  );
}