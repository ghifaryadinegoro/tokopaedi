import ProtectedRoute from "@/components/ProtectedRoute"

export default function WithAuthLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </div>
    )
}