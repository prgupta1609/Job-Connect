import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginRegistration from './pages/login-registration';
import JobSearchBrowse from './pages/job-search-browse';
import StudentDashboard from './pages/student-dashboard';
import ApplicationTracking from './pages/application-tracking';
import StudentProfileManagement from './pages/student-profile-management';
import JobApplicationDetailsApply from './pages/job-application-details-apply';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ApplicationTracking />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/job-search-browse" element={<JobSearchBrowse />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/application-tracking" element={<ApplicationTracking />} />
        <Route path="/student-profile-management" element={<StudentProfileManagement />} />
        <Route path="/job-application-details-apply" element={<JobApplicationDetailsApply />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
