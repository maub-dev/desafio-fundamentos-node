import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('The transaction type is invalid.');
    }
    const transaction = new Transaction({ title, value, type });
    const balance = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error('The outcome value is greater than the balance.');
    }

    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
