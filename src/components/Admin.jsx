import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you've exported db from your Firebase config file

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editPayment, setEditPayment] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    selectedPlan: '',
    emailAddress: '',
    actualAddress: ''
  });

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentCollection = collection(db, 'payments');
      const querySnapshot = await getDocs(paymentCollection);
      const paymentData = [];
      querySnapshot.forEach((doc) => {
        paymentData.push({ id: doc.id, ...doc.data() });
      });
      setPayments(paymentData);
      setFilteredPayments(paymentData);
    };

    fetchPayments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await deleteDoc(doc(db, 'payments', id));
      const updatedPayments = payments.filter((payment) => payment.id !== id);
      setPayments(updatedPayments);
      setFilteredPayments(updatedPayments);
      console.log('Payment with ID', id, 'cancelled successfully.');
    } catch (error) {
      console.error('Error cancelling payment:', error);
    }
  };

  const handleEdit = (payment) => {
    setEditPayment(payment);
    setFormData(payment);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'payments', editPayment.id), formData);
      const updatedPayments = payments.map((payment) => {
        if (payment.id === editPayment.id) {
          return { ...formData, id: editPayment.id }; // Ensure the ID remains
        }
        return payment;
      });
      setPayments(updatedPayments);
      setFilteredPayments(updatedPayments);
      setEditPayment(null);
      setFormData({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        selectedPlan: '',
        emailAddress: '',
        actualAddress: ''
      });
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const getPlanAmount = (plan) => {
    switch (plan) {
      case 'first':
        return '1000 Rs';
      case 'second':
        return '3000 Rs';
      case 'third':
        return '5000 Rs';
      default:
        return '0 Rs';
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = payments.filter(payment =>
      payment.firstName.toLowerCase().includes(value) ||
      payment.lastName.toLowerCase().includes(value)
    );
    setFilteredPayments(filtered);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Payments Data</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-black mb-4 p-2 border border-gray-400 rounded"
      />
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">First Name</th>
            <th className="border border-gray-400 px-4 py-2">Last Name</th>
            <th className="border border-gray-400 px-4 py-2">Mobile Number</th>
            <th className="border border-gray-400 px-4 py-2">Selected Plan</th>
            <th className="border border-gray-400 px-4 py-2">Amount</th>
            <th className="border border-gray-400 px-4 py-2">Email Address</th>
            <th className="border border-gray-400 px-4 py-2">Actual Address</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{payment.firstName}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.lastName}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.mobileNumber}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.selectedPlan}</td>
              <td className="border border-gray-400 px-4 py-2">{getPlanAmount(payment.selectedPlan)}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.emailAddress}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.actualAddress}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => handleCancel(payment.id)} className="bg-red-500 text-white py-1 px-3 rounded-lg mr-2">Cancel Membership</button>
                <button onClick={() => handleEdit(payment)} className="bg-blue-500 text-white py-1 px-3 rounded-lg">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editPayment && (
        <div className="mt-4 bg-black p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Edit Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-white">First Name</label>
              <input type="text" className="bg-black text-white" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-white">Last Name</label>
              <input type="text" className="bg-black text-white" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-white">Mobile Number</label>
              <input type="text" className="bg-black text-white" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-white">Selected Plan</label>
              <input type="text" className="bg-black text-white" name="selectedPlan" value={formData.selectedPlan} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-white">Email Address</label>
              <input type="email" className="bg-black text-white" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-white">Actual Address</label>
              <input type="text" className="bg-black text-white" name="actualAddress" value={formData.actualAddress} onChange={handleChange} />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded-lg">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
