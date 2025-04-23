
import AdminHeader from "@/components/admin/AdminHeader";

interface DashboardLoadingStateProps {
  onLogout: () => void;
}

export const DashboardLoadingState = ({ onLogout }: DashboardLoadingStateProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={onLogout} />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sixty40-purple"></div>
        </div>
      </div>
    </div>
  );
};
