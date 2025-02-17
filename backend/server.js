const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let currentBalance = 5000;
const recentTransactions = [
  { id: 1, title: "Grocery Store", amount: -500, date: "Today", icon: "🛒" },
  { id: 2, title: "Salary Deposit", amount: 15000, date: "Yesterday", icon: "💰" },
  { id: 3, title: "Electric Bill", amount: -1200, date: "2 days ago", icon: "⚡" }
];
const upcomingBills = [
  { id: 1, title: "Phone Bill", amount: 499, dueDate: "Mar 15", icon: "📱" },
  { id: 2, title: "Rent", amount: 8000, dueDate: "Mar 20", icon: "🏠" },
  { id: 3, title: "Internet", amount: 999, dueDate: "Mar 25", icon: "🌐" }
];
const savingsGoals = [
  { id: 1, title: "Emergency Fund", target: 50000, current: 20000, icon: "🏥" },
  { id: 2, title: "New Phone", target: 15000, current: 5000, icon: "📱" }
];

app.get('/api/balance', (req, res) => {
  res.json({ currentBalance });
});

app.post('/api/add-money', (req, res) => {
  const { amount } = req.body;
  currentBalance += amount;
  res.json({ currentBalance });
});

app.post('/api/send-money', (req, res) => {
  const { amount } = req.body;
  currentBalance -= amount;
  recentTransactions.unshift({ id: recentTransactions.length + 1, title: "Money Sent", amount: -amount, date: "Just now", icon: "💸" });
  res.json({ currentBalance });
});

app.get('/api/recent-transactions', (req, res) => {
  res.json(recentTransactions);
});

app.get('/api/upcoming-bills', (req, res) => {
  res.json(upcomingBills);
});

app.get('/api/savings-goals', (req, res) => {
  res.json(savingsGoals);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});