import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you've exported db from your Firebase config file

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentCollection = collection(db, 'payments');
      const querySnapshot = await getDocs(paymentCollection);
      const paymentData = [];
      querySnapshot.forEach((doc) => {
        paymentData.push({ id: doc.id, ...doc.data() });
      });
      setPayments(paymentData);
    };

    fetchPayments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await deleteDoc(doc(db, 'payments', id));
      setPayments(payments.filter((payment) => payment.id !== id));
      console.log('Payment with ID', id, 'cancelled successfully.');
    } catch (error) {
      console.error('Error cancelling payment:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Payments Data</h1>
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">First Name</th>
            <th className="border border-gray-400 px-4 py-2">Last Name</th>
            <th className="border border-gray-400 px-4 py-2">Card Number</th>
            <th className="border border-gray-400 px-4 py-2">CVV</th>
            <th className="border border-gray-400 px-4 py-2">Mobile Number</th>
            <th className="border border-gray-400 px-4 py-2">Selected Plan</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{payment.firstName}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.lastName}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.cardNumber}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.cvv}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.mobileNumber}</td>
              <td className="border border-gray-400 px-4 py-2">{payment.selectedPlan}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => handleCancel(payment.id)} className="bg-red-500 text-white py-1 px-3 rounded-lg">Cancel Membership</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
