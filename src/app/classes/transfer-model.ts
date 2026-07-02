export class TransferModel {
  recipientAccountNo: string;
  amount: number;
  description: string;

  constructor(recipientAccountNo: string, amount: number, description: string) {
    this.recipientAccountNo = recipientAccountNo;
    this.amount = amount;
    this.description = description;
  }

}
