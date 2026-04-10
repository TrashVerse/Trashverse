import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import RecoverAccount from './pages/RecoverAccount'
import Forgotten from './pages/Forgotten'
import NotFound from './pages/NotFound'
import WasteEntry from './pages/WasteEntry'
import Transactions from './pages/Transactions'
import Pickups from './pages/Pickups'
import Rewards from './pages/Rewards'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Stations from './pages/Stations'
import Leaderboard from './pages/Leaderboard'
import Analytics from './pages/Analytics'
import Admin from './pages/Admin'
import AdminUsers from './pages/admin/AdminUsers'
import AdminPickups from './pages/admin/AdminPickups'
import AdminWaste from './pages/admin/AdminWaste'
import AdminTransactions from './pages/admin/AdminTransactions'
import AdminStations from './pages/admin/AdminStations'
import AdminRewards from './pages/admin/AdminRewards'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminSettings from './pages/admin/AdminSettings'
import Withdraw from './pages/Withdraw'
import DesignTest from './pages/DesignTest'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recover-account" element={<RecoverAccount />} />
        <Route path="/forgotten" element={<Forgotten />} />
        <Route path="/design-test" element={<DesignTest />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/waste-entry" element={
          <ProtectedRoute>
            <WasteEntry />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
        <Route path="/pickups" element={
          <ProtectedRoute>
            <Pickups />
          </ProtectedRoute>
        } />
        <Route path="/rewards" element={
          <ProtectedRoute>
            <Rewards />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/stations" element={
          <ProtectedRoute>
            <Stations />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/pickups" element={
          <ProtectedRoute>
            <AdminPickups />
          </ProtectedRoute>
        } />
        <Route path="/admin/waste" element={
          <ProtectedRoute>
            <AdminWaste />
          </ProtectedRoute>
        } />
        <Route path="/admin/transactions" element={
          <ProtectedRoute>
            <AdminTransactions />
          </ProtectedRoute>
        } />
        <Route path="/admin/stations" element={
          <ProtectedRoute>
            <AdminStations />
          </ProtectedRoute>
        } />
        <Route path="/admin/rewards" element={
          <ProtectedRoute>
            <AdminRewards />
          </ProtectedRoute>
        } />
        <Route path="/admin/notifications" element={
          <ProtectedRoute>
            <AdminNotifications />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        } />
        <Route path="/withdraw" element={
          <ProtectedRoute>
            <Withdraw />
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
