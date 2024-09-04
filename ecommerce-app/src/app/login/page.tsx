import SweetAlert from "@/components/SweetAlert";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function Login() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorBody = (await response.json()) as { error: string };
      // console.log(errorBody, "<<<<< errorBody");
      // console.log(errorBody.error, "<<<<< errorBodyErrorr");
      return redirect(`/login?error=${errorBody.error}`);
    }
    console.log(response, "<<<< responseLogin");

    const responseBody = (await response.json()) as { access_token: string };
    console.log(responseBody, "<<<< responseBody login");

    cookies().set(`Authorization`, `Bearer ${responseBody.access_token}`);

    return redirect("/wishlists");
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="font-[sans-serif]">
        <SweetAlert />
        <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center gap-4">
          <div className="max-md:order-1 overflow-hidden">
            <img
              src="https://img.freepik.com/premium-photo/vibrant-green-shopping-bag-surrounded-by-lush-foliage-perfect-showcasing-ecofriendly-products-sustainable-fashion_1300237-3152.jpg?w=360"
              className="w-full max-h-screen object-cover"
              alt="login-image"
            />
          </div>
          <form action={handleLogin} className="max-w-xl w-full p-6 mx-auto">
            <div className="mb-12">
              <h3 className="text-gray-800 text-4xl font-extrabold">Sign in</h3>
              <p className="text-gray-800 text-sm mt-6">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-green-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>
            <div>
              <label className="text-gray-800 text-sm block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-green-600 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000" />
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit={10}
                      strokeWidth={40}
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    />
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-gray-800 text-sm block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-green-600 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  />
                </svg>
              </div>
            </div>
            {/* <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="jajvascript:void(0);"
                  className="text-blue-600 font-semibold text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div> */}
            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>
            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-gray-300" />
              <p className="text-sm text-gray-800 text-center">or</p>
              <hr className="w-full border-gray-300" />
            </div>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-1 py-2.5 px-4 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-transparent hover:bg-gray-100 focus:outline-none"
            >
              <div>Continue without sign in</div>
              <div>
                <svg
                  className="w-[24px] h-[24px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
