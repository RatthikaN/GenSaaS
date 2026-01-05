
import React from 'react';
import { Outlet } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto w-full flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">User Settings</h2>
        <p className="text-text-secondary text-sm mt-1">Configure your laboratory workspace and personal preferences.</p>
      </div>

      <div className="w-full">
        {/* Dynamic Page Content - The sub-navigation is now handled by the main sidebar */}
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
