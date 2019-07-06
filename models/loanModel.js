class Loan {
  constructor(number, name, description, rate, amount, startTime, tenure, endTime) {
    this.number = number;
    this.name = name;
    this.description = description;
    this.rate = rate;
    this.amount = amount;
    this.startTime = startTime;
    this.tenure = tenure;
    this.endTime = endTime;
  }
}


module.exports = Loan;