let transactions = [{ text: "Initial Income", amount: 200, type: "income" },
  { text: "Initial Expense", amount: 100, type: "expense" }];

document.getElementById("addBtn").onclick = function () {
  let text = document.getElementById("Details").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let type = document.getElementById("type").value;

  if (text === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details");
    return;
  }

  transactions.push({ text: text, amount: amount, type: type });
  document.getElementById("Details").value = "";
  document.getElementById("amount").value = "";
};

function showList() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  for (let i = 0; i < transactions.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `${transactions[i].text} <span class="${transactions[i].type}">$${transactions[i].amount}</span>`;
    list.appendChild(li);
  }
}


function showTotals() {
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      income += transactions[i].amount;
    } else {
      expense += transactions[i].amount;
    }
  }

  document.getElementById("income").textContent = "$" + income;
  document.getElementById("expense").textContent = "$" + expense;
  document.getElementById("balance").textContent = `$${income - expense}`;
  drawChart(income, expense);
}

function drawChart(income, expense) {
  let canvas = document.getElementById("chart");
  let ctx = canvas.getContext("2d");
  let total = income + expense;
  if (total === 0) total = 1;

  let incomePart = (income / total) * 2 * Math.PI;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 60, 0, incomePart);
  ctx.lineTo(100, 100);
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 60, incomePart, 2 * Math.PI);
  ctx.lineTo(100, 100);
  ctx.fillStyle = "red";
  ctx.fill();
}

showList();
showTotals();