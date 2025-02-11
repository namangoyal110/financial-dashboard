import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Camera, Wallet, Target, BookOpen, TrendingUp, AlertCircle, Send, Clock, Receipt, CreditCard, PiggyBank, Plus } from 'lucide-react';
import axios from 'axios';
import './App.css';

const FinancialDashboard = () => {
  const [currentBalance, setCurrentBalance] = useState(5000);
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('home');
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);

  const translations = {
    en: {
      balance: "Wallet Balance",
      scan: "Scan Receipt",
      send: "Send Money",
      goals: "Savings Goals",
      learn: "Learn & Earn",
      alert: "Offline Mode Active",
      alertDesc: "Changes will sync when connection is restored",
      recent: "Recent Transactions",
      upcoming: "Upcoming Bills",
      addMoney: "Add Money",
      savings: "Savings Goals",
      newGoal: "New Goal"
    },
    hi: {
      balance: "वॉलेट बैलेंस",
      scan: "रसीद स्कैन करें",
      send: "पैसे भेजें",
      goals: "बचत लक्ष्य",
      learn: "सीखें और कमाएं",
      alert: "ऑफ़लाइन मोड सक्रिय",
      alertDesc: "कनेक्शन बहाल होने पर परिवर्तन सिंक होंगे",
      recent: "हाल के लेनदेन",
      upcoming: "आगामी बिल",
      addMoney: "पैसे जोड़ें",
      savings: "बचत लक्ष्य",
      newGoal: "नया लक्ष्य"
    }
  };

  const t = translations[language];

  useEffect(() => {
    const fetchData = async () => {
      const balanceResponse = await axios.get('https://financial-dashboard-backend.onrender.com/api/balance');
      setCurrentBalance(balanceResponse.data.currentBalance);

      const recentTransactionsResponse = await axios.get('https://financial-dashboard-backend.onrender.com/api/recent-transactions');
      setRecentTransactions(recentTransactionsResponse.data);

      const upcomingBillsResponse = await axios.get('https://financial-dashboard-backend.onrender.com/api/upcoming-bills');
      setUpcomingBills(upcomingBillsResponse.data);

      const savingsGoalsResponse = await axios.get('https://financial-dashboard-backend.onrender.com/api/savings-goals');
      setSavingsGoals(savingsGoalsResponse.data);
    };

    fetchData();
  }, []);

  const handleAddMoney = async () => {
    const amount = parseInt(prompt('Enter amount to add:'), 10);
    if (isNaN(amount) || amount <= 0) return;

    const response = await axios.post('https://financial-dashboard-backend.onrender.com/api/add-money', { amount });
    setCurrentBalance(response.data.currentBalance);
  };

  const handleSendMoney = async () => {
    const amount = parseInt(prompt('Enter amount to send:'), 10);
    if (isNaN(amount) || amount <= 0) return;

    const response = await axios.post('https://financial-dashboard-backend.onrender.com/api/send-money', { amount });
    setCurrentBalance(response.data.currentBalance);

    const recentTransactionsResponse = await axios.get('https://financial-dashboard-backend.onrender.com/api/recent-transactions');
    setRecentTransactions(recentTransactionsResponse.data);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Offline Alert */}
      <Alert className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t.alert}</AlertTitle>
        {t.alertDesc}
      </Alert>

      {/* Wallet Section */}
      <div className="bg-white m-4 p-6 rounded-xl shadow-md">
        <p className="text-gray-600 text-sm">{t.balance}</p>
        <h2 className="text-3xl font-bold">₹{currentBalance.toLocaleString()}</h2>
        <div className="flex justify-between mt-4">
          <button onClick={handleSendMoney} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
            <Send className="h-4 w-4 mr-2" />
            {t.send}
          </button>
          <button onClick={handleAddMoney} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg">
            <Plus className="h-4 w-4 mr-2" />
            {t.addMoney}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2 px-4">
        <button className="flex flex-col items-center justify-center p-2">
          <Camera className="h-6 w-6 text-blue-600 mb-1" />
          <span className="text-xs">{t.scan}</span>
        </button>
        <button className="flex flex-col items-center justify-center p-2">
          <Send className="h-6 w-6 text-green-600 mb-1" />
          <span className="text-xs">{t.send}</span>
        </button>
        <button className="flex flex-col items-center justify-center p-2">
          <PiggyBank className="h-6 w-6 text-purple-600 mb-1" />
          <span className="text-xs">{t.savings}</span>
        </button>
        <button className="flex flex-col items-center justify-center p-2">
          <BookOpen className="h-6 w-6 text-orange-600 mb-1" />
          <span className="text-xs">{t.learn}</span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white m-4 p-4 rounded-xl">
        <h3 className="font-semibold mb-3">{t.recent}</h3>
        <div className="space-y-3">
          {recentTransactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{tx.icon}</span>
                <div>
                  <p className="font-medium">{tx.title}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <span className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="bg-white m-4 p-4 rounded-xl">
        <h3 className="font-semibold mb-3">{t.upcoming}</h3>
        <div className="space-y-3">
          {upcomingBills.map(bill => (
            <div key={bill.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{bill.icon}</span>
                <div>
                  <p className="font-medium">{bill.title}</p>
                  <p className="text-sm text-gray-500">Due {bill.dueDate}</p>
                </div>
              </div>
              <span className="font-medium">₹{bill.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Goals */}
      <div className="bg-white m-4 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">{t.savings}</h3>
          <button className="text-blue-500 flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            {t.newGoal}
          </button>
        </div>
        <div className="space-y-4">
          {savingsGoals.map(goal => (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{goal.icon}</span>
                  <p className="font-medium">{goal.title}</p>
                </div>
                <p className="text-sm text-gray-600">
                  ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                </p>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Toggle */}
      <button 
        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded-full text-sm"
      >
        {language === 'en' ? 'हिंदी' : 'English'}
      </button>
    </div>
  );
};

export default FinancialDashboard;