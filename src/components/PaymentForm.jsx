import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const PaymentForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    selectedPlan: "",
    cardNumber: "",
    cvv: "",
    mobileNumber: "",
    emailAddress: "",
    actualAddress: ""
  });

  const [amount, setAmount] = useState(0); // State for amount

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input fields according to the requirements
    if (name === "mobileNumber") {
      if (value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "cvv") {
      if (value.length <= 3) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "cardNumber") {
      if (value.length <= 16) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "selectedPlan") {
      // Update amount based on the selected plan
      switch (value) {
        case "first":
          setAmount(1000);
          break;
        case "second":
          setAmount(3000);
          break;
        case "third":
          setAmount(5000);
          break;
        default:
          setAmount(0);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save form data to Firestore
      const docRef = await addDoc(collection(db, "payments"), formData);
      alert("Congrats You are a gym member now");
      console.log("Form data saved to Firestore with ID:", docRef.id);

      // Reset form fields after submission
      setFormData({
        firstName: "",
        lastName: "",
        selectedPlan: "",
        cardNumber: "",
        cvv: "",
        mobileNumber: "",
        emailAddress: "",
        actualAddress: ""
      });

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-black p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-white">Payment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="bg-black"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-black"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="bg-black"
              name="selectedPlan"
              value={formData.selectedPlan}
              onChange={handleChange}
              required
            >
              <option value="">Select a Plan</option>
              <option value="first">3 months Plan</option>
              <option value="second">6 months Plan</option>
              <option value="third">9 months Plan</option>
            </select>
          </div>
          {/* Display amount based on the selected plan */}
          {amount > 0 && (
            <div className="mb-4 text-white">Amount: {amount} Rs</div>
          )}
          <div className="mb-4">
            <input
              className="bg-black"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              maxLength="16"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-black"
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              maxLength="3"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-black"
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              maxLength="10"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-black"
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-black"
              type="text"
              name="actualAddress"
              value={formData.actualAddress}
              onChange={handleChange}
              placeholder="Actual Address"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">Submit</button>
            <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded-lg">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
