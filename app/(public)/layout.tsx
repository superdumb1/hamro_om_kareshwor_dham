import Header from "@/components/organisms/main/header/Header";
import Footer from "@/components/organisms/main/footer/Footer";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>

    );
}
