import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotificationDemo from "@/components/NotificationDemo";

const NotificationDemoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <NotificationDemo />
      </main>
      <Footer />
    </div>
  );
};

export default NotificationDemoPage;
