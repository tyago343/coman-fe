import { getBaseURL } from "../api";
import type { User } from "../models/User/user.interface";

export async function getUserFromCookie(
  request: Request
): Promise<User | null> {
  const cookies = request.headers.get("Cookie") || "";
  const cookiesArray = cookies.split(";");
  const tokenCookie = cookiesArray.find((cookie) =>
    cookie.includes("access_token")
  );
  const data = await fetch(`${getBaseURL()}user/profile`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenCookie?.split("=")[1]}`,
    },
  });
  if (data.status === 401) {
    return null;
  }
  const user = await data.json();
  return user;
}
