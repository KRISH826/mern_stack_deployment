import { ProtectedLayout } from '@/layout/ProtectedLayout';
import { PublicRoute } from '@/layout/PublicLayout';
import AddBill from '@/pages/AddBill';
import Bill from '@/pages/Bill';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import UpdateBill from '@/pages/UpdateBill';
import { Routes, Route } from 'react-router';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes wrapped */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      {/* Protected routes */}
      <Route path='/billS' element={
        <ProtectedLayout>
          <Bill />
        </ProtectedLayout>
      } />
      <Route path='/' element={
        <ProtectedLayout>
          <Dashboard />
        </ProtectedLayout>
      } />
      <Route path='/bills/add-bill' element={
        <ProtectedLayout>
          <AddBill />
        </ProtectedLayout>
      } />
      <Route path='/bills/update-bill/:id' element={
        <ProtectedLayout>
          <UpdateBill />
        </ProtectedLayout>
      } />
    </Routes>

  );
}