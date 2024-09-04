"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function SweetAlert() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: error.split(",").join("\n"),
      });
    }
  }, [error]);
  router.replace(pathname)

  return null;
}
