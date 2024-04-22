import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastProvider } from "@/context/toast";

export default function Layout({ children }: { children: React.ReactNode; }) {

    return <ToastProvider>
        <Header />

        {children}

        <Footer />
    </ToastProvider>;
}