import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const getTransactionValue = (type: string): number[] => {
      return this.transactions.map(x => (x.type === type ? x.value : 0));
    };
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const incomeTransactions = getTransactionValue('income');
    if (incomeTransactions.length > 0)
      balance.income = incomeTransactions.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );

    const outcomeTransactions = getTransactionValue('outcome');
    if (outcomeTransactions.length > 0)
      balance.outcome = outcomeTransactions.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
