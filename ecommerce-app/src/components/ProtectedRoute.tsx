import { cookies } from "next/headers";
import Link from "next/link";
// import { redirect } from "next/navigation"

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const authCookie = cookies().get("Authorization");

  if (!authCookie) {
    // return redirect("/login")
    return (
      <section className="bg-white font-sans">
        <div className="container flex items-center min-h-[30rem] px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <div className="text-center justify-center">
              <img className="h-72 w-auto"
                src="https://img.freepik.com/premium-vector/leaf-cartoon-illustration-with-sad-face_309278-13667.jpg?w=740"
                alt="loginImage"
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800  md:text-3xl">
              Login to see your Wishlist
            </h1>
            <p className="mt-4 text-gray-500 ">
              We are not psychic who can read your minds...
            </p>
            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto justify-center">
              <Link
                href="/login"
                className="px-5 py-2 text-sm tracking-wide text-white transition-colors rounded-lg shrink-0 sm:w-auto  border border-[#00aa5b] bg-[#00aa5b] hover:bg-[#0c884e] transition:all duration-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return children;
}
