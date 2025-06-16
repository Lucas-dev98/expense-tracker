import React from "react";
import Reports from "../reports/Reports";

interface DashboardRightProps {
  userId: string;
  refresh: number;
}

const DashboardRight: React.FC<DashboardRightProps> = ({ userId, refresh }) => (
  <div className="dashboard-right">
    <Reports userId={userId} refresh={refresh} />
  </div>
);

export default DashboardRight;