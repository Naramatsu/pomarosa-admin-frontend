import { Sidebar } from "../components/Sidebar";
import "../styles/dashboard-layout.css";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <section className="dashboard">
    <Sidebar />
    <main className="dashboard-content">{children}</main>
  </section>
);
