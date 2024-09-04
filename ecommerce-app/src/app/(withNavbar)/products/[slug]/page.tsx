import { rupiahFormat } from "@/helpers/rupiahFormat";
import { ProductType } from "@/db/models/product";
import { ResolvingMetadata } from "next";
import AddWishlistButton from "@/components/button/AddWishlistButton";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
) {
  const data = await getProductBySlug(props.params.slug);

  const parentTitle = (await parent).title?.absolute;
  return {
    title: parentTitle + " - " + data?.slug,
    openGraph: {
      images: [data?.thumbnail],
    },
  };
}

async function getProductBySlug(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/` + slug
    );
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data: ProductType = await response.json();
    // console.log(data, "<<<<< dataDetailProduct");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function ProductDetails(props: Props) {
  const data = await getProductBySlug(props.params.slug);
  return (
    <div className="font-sans tracking-wide p-10 lg:p-14 lg:max-w-full mx-auto">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-2">
        <div className="lg:col-span-3 text-center">
          <div className="lg:h-[450px] p-4 relative">
            <img
              src={data?.thumbnail}
              // src="https://readymadeui.com/images/sunglass1.webp"
              alt="Product"
              className="w-full h-full rounded-xl object-contain object-top"
            />
          </div>
          <div className="flex flex-wrap gap-4 mx-auto mt-4 justify-center">
            {data?.images?.map((image, index) => {
              return (
                <div
                  className="cursor-pointer px-1 py-2 relative bg-black rounded-lg"
                  key={`image ${image}-${index}`}
                >
                  <img
                    src={image}
                    // src="https://readymadeui.com/images/sunglass1.webp"
                    alt={`image-${index}`}
                    className="w-20 h-16 object-contain rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start gap-4 mt-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 uppercase">
                {data?.name}
              </h2>
              <div className="flex space-x-2 mt-2">
                <div>
                  Sold <span className="text-gray-500">30+</span>
                </div>
                <div className="font-extrabold text-gray-600"> . </div>
                <svg
                  className="w-5 fill-[#ffc400]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div>
                  4.5 <span className="text-gray-500">(19 rating)</span>
                </div>
                <div className="font-extrabold text-gray-600"> . </div>
                <div>
                  Discussion <span className="text-gray-500">(3)</span>
                </div>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-4">
              <button
                type="button"
                className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  fill="currentColor"
                  className="mr-1"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  />
                </svg>
                100
              </button>
              <button
                type="button"
                className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                    data-original="#000000"
                  />
                  <path
                    d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                    data-original="#000000"
                  />
                  <path
                    d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                    data-original="#000000"
                  />
                  <path
                    d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                    data-original="#000000"
                  />
                  <path
                    d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                    data-original="#000000"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-gray-800 text-2xl font-bold mt-4">
            {rupiahFormat(data?.price)}
          </p>
          <hr className="mt-8 mb-6" />
          <div>
            <h3 className="text-lg font-bold text-gray-800">Choose a Color:</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="px-3 py-1 text-md font-medium rounded-xl text-[#767d8f] focus:text-[#0aae62] border border-[#bfc9d9] focus:border-[#00aa5b] hover:border-[#00aa5b] focus:bg-[#ecfef4] hover:bg-[#ecfef4] hover:text-[#00aa5b]">
                Black
              </button>
              <button className="px-3 py-1 text-md font-medium rounded-xl text-[#767d8f] focus:text-[#0aae62] border border-[#bfc9d9] focus:border-[#00aa5b] hover:border-[#00aa5b] focus:bg-[#ecfef4] hover:bg-[#ecfef4] hover:text-[#00aa5b]">
                White
              </button>
              <button className="px-3 py-1 text-md font-medium rounded-xl text-[#767d8f] focus:text-[#0aae62] border border-[#bfc9d9] focus:border-[#00aa5b] hover:border-[#00aa5b] focus:bg-[#ecfef4] hover:bg-[#ecfef4] hover:text-[#00aa5b]">
                Red
              </button>
              <button className="px-3 py-1 text-md font-medium rounded-xl text-[#767d8f] focus:text-[#0aae62] border border-[#bfc9d9] focus:border-[#00aa5b] hover:border-[#00aa5b] focus:bg-[#ecfef4] hover:bg-[#ecfef4] hover:text-[#00aa5b]">
                Blue
              </button>
              {/* <button
                  type="button"
                  className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-400 border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
                <button
                  type="button"
                  className="w-10 h-10 bg-[#00aa5b] border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
                <button
                  type="button"
                  className="w-10 h-10 bg-red-400 border-2 border-white hover:border-gray-800 rounded shrink-0"
                /> */}
            </div>
          </div>
          <hr className="my-6" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Quantity:</h3>
            <div className="flex divide-x border w-max mt-4 rounded overflow-hidden">
              <button
                type="button"
                className="bg-gray-100 w-12 h-10 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-current inline"
                  viewBox="0 0 124 124"
                >
                  <path
                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    data-original="#000000"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="bg-transparent w-12 h-10 font-semibold text-gray-800 text-lg"
              >
                1
              </button>
              <button
                type="button"
                className="bg-gray-800 text-white w-12 h-10 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-current inline"
                  viewBox="0 0 42 42"
                >
                  <path
                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                    data-original="#000000"
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex flex-wrap gap-4">
            <button className="min-w-[200px] px-4 py-2 text-md font-bold rounded-xl text-[#00aa5b] border border-[#269e66] hover:bg-[#00aa5b] hover:text-white transition:all duration-200">
              Buy now
            </button>
            <button className="min-w-[200px] px-4 py-2 text-md font-bold rounded-xl text-white border border-[#269e66] bg-[#00aa5b] hover:bg-[#0c884e] transition:all duration-500 flex items-center justify-center gap-x-2">
              <span>
                <svg
                  className="w-[15px] h-[15px] text-white font-bold"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </span>
              Add to cart
            </button>
            {data && <AddWishlistButton key={data.slug} product={data} />}
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-2xl">
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-800">
            Product Description
          </h3>
          <p className="text-sm text-gray-600 mt-4">{data?.description}</p>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-6">Product Tags</h3>
        <ul className="grid sm:grid-cols-2 gap-3 mt-4">
          {data?.tags?.map((el, index) => {
            return (
              <li
                className="flex items-center text-sm text-gray-600"
                key={index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                  className="mr-4 bg-[#00aa5b] fill-white rounded-full p-[3px]"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                    data-original="#000000"
                  />
                </svg>
                {el}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
