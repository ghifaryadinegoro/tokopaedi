import Link from "next/link";

export default function HomeBanner () {
    return (
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pbs.twimg.com/ext_tw_video_thumb/1287970624065826818/pu/img/x9y90UqCgLI81Zu1.jpg:large"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <div className="font-fugaz_one">
            <h1 className="text-[75px] font-bold leading-[5px] -skew-y-3">
              SELALU
            </h1>
            <h1 className="text-[100px] font-bold skew-x-6 skew-y-3">ADA</h1>
            <h1 className="text-[75px] font-bold leading-[15px] skew-y-3">
              SELALU
            </h1>
            <h1 className="text-[100px] font-bold -skew-y-6">BISA</h1>
          </div>
          <p className="text-lg text-gray-300 mb-8 w-[500px]">
            Discover endless possibilities with Tokopaedi! Always available,
            always reliable. Shop now and experience the convenience of
            &quot;Selalu Ada, Selalu Bisa&quot;!
          </p>

          <Link
            href="/products"
            className="bg-white text-black hover:bg-yellow-300 py-2 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center gap-x-2 shadow-lg"
          >
            Start Shopping
            <img
              src="https://www.svgrepo.com/show/477206/basket.svg"
              alt="basket"
              className="w-5 h-5"
            />
          </Link>
        </div>
      </div>
    );
}