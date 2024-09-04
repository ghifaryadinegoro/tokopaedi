import SweetAlert from "@/components/SweetAlert";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Register() {
  const handleRegister = async (formData: FormData) => {
    "use server";

    const form = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
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
      console.log(errorBody, "<<<<< errorBody");
      console.log(errorBody.error, "<<<<< errorBodyErrorr");
      return redirect(`/register?error=${errorBody.error}`);
    }
    console.log(response, "<<<< responseRegister");

    const responseBody = await response.json();
    console.log(responseBody, "<<<< responseBody register");
    return redirect(`/login?message=success`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col justify-center bg-white font-[sans-serif]">
        <SweetAlert />
        <div className="mx-auto mt-10">
          <img
            src="/tokopaediLogoNoBg.png"
            alt="Tokopedia Logo"
            width={150}
            height={50}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {/* Left Side - Image and Text */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-10">
            <img
              src="https://images.tokopedia.net/img/user/register_icon_new.png"
              alt="Tokopedia Mascot"
              width={300}
              height={300}
            />
            <h1 className="mt-8 text-2xl font-semibold text-gray-800">
              Discover Millions of Trusted Shops
            </h1>
            <p className="mt-4 text-gray-600">
              Join and enjoy the best online shopping experience
            </p>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-1/3 bg-white p-10">
            <div className="flex flex-col items-center">
              <h2 className="mt-6 text-xl leading-9 font-bold text-gray-900">
                Sign up now
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have a Tokopaedi account?{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-500"
                >
                  Login
                </Link>
              </p>
            </div>

            <form action={handleRegister} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none "
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-600 text-center">
              By registering, i agree to{" "}
              <Link href="#" className="text-green-600 hover:text-green-500">
                Terms and Conditions
              </Link>{" "}
              with{" "}
              <Link href="#" className="text-green-600 hover:text-green-500">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        <footer className="w-full text-center py-4 absolute bottom-0">
          <p className="text-sm text-gray-500">
            © 2009-2024, PT Tokopaedi <span className="text-gray-100"> | </span>
            <Link
              href="#"
              className="text-green-600 hover:text-green-500 font-bold"
            >
              Tokopaedi Care
            </Link>
          </p>
        </footer>
      </div>
    </Suspense>
  );
}
