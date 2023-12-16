document.addEventListener('DOMContentLoaded', () => {
  displayTransactions();
});

function addTransaction() {
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || category.trim() === '') {
    alert('Please enter valid category and amount.');
    return;
  }

  const transaction = {
    type,
    category,
    amount,
    timestamp: new Date().toISOString(),
  };

  saveTransaction(transaction);
  displayTransactions();
}

function saveTransaction(transaction) {
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function displayTransactions() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const transactionsTable = document.getElementById('transactions');
  transactionsTable.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const row = transactionsTable.insertRow();
    
    const typeCell = row.insertCell(0);
    typeCell.textContent = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);

    const categoryCell = row.insertCell(1);
    categoryCell.textContent = transaction.category;

    const amountCell = row.insertCell(2);
    amountCell.textContent = transaction.amount;

    const dateCell = row.insertCell(3);
    dateCell.textContent = new Date(transaction.timestamp).toLocaleString();

    const actionCell = row.insertCell(4);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTransaction(index);
      displayTransactions();
    });
    actionCell.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
      updateTransaction(index);
    });
    actionCell.appendChild(updateButton);
  });
}

function deleteTransaction(index) {
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateTransaction(index) {
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const updatedAmount = prompt('Enter the updated amount:');

  if (updatedAmount === null || isNaN(parseFloat(updatedAmount))) {
    alert('Please enter a valid amount.');
    return;
  }

  transactions[index].amount = parseFloat(updatedAmount);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  displayTransactions();
}

document.addEventListener("DOMContentLoaded", function () {
  // ... (your existing code)

  // Add an event listener to the logout link
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the link

      // Display logout alert
      alert("You are logged out.");

      // Redirect to the welcome page
      window.location.href = "welcome.html";
    });
  }
});
