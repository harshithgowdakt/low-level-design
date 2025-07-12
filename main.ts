interface Transaction {
  id: number;
  operations: Map<string, string | null>;
  isActive: boolean;
}

class KeyValueStore {
  private store: Map<string, string>;
  private transactions: Map<number, Transaction>;
  private activeTransaction: number | null;
  private transactionId = 0;

  constructor() {
    this.store = new Map();
    this.transactions = new Map();
    this.activeTransaction = null;
  }

  set(key: string, val: string) {
    if (this.activeTransaction) {
      let t = this.transactions.get(this.activeTransaction)!;
      t.operations.set(key, val);
    } else {
      this.store.set(key, val);
    }
  }

  get(key: string): string | null {
    if (this.activeTransaction) {
      let t = this.transactions.get(this.activeTransaction)!;
      if (t.operations.has(key)) {
        return t.operations.get(key) || null;
      }
    }

    return this.store.get(key) || null;
  }

  delete(key: string): boolean {
    if (this.activeTransaction) {
      let t = this.transactions.get(this.activeTransaction)!;
      if (this.get(key) !== null) {
        t.operations.set(key, null);
        return true;
      }
      return false;
    } else {
      return this.store.delete(key);
    }
  }

  begin(): number {
    if (this.activeTransaction) {
      throw new Error("transaction already in progress");
    }

    let transaction: Transaction = {
      id: this.getTransactionId(),
      operations: new Map(),
      isActive: true,
    };

    this.transactions.set(transaction.id, transaction);
    this.activeTransaction = transaction.id;
    return transaction.id;
  }

  commit(): void {
    if (!this.activeTransaction) {
      throw new Error("transaction is not in progress");
    }

    let t = this.transactions.get(this.activeTransaction)!;

    for (let [key, val] of t.operations) {
      if (val == null) {
        this.store.delete(key);
      } else {
        this.store.set(key, val);
      }
    }

    this.transactions.delete(this.activeTransaction);
    this.activeTransaction = null;
  }

  rollback(): void {
    if (!this.activeTransaction) {
      throw new Error("no transaction in progress");
    }

    this.transactions.delete(this.activeTransaction);
    this.activeTransaction = null;
  }

  private getTransactionId(): number {
    this.transactionId += 1;
    return this.transactionId;
  }
}

// Test the implementation
function testKeyValueStore() {
  const kv = new KeyValueStore();

  console.log("=== Testing Fixed Implementation ===");

  // Basic operations
  kv.set("name", "Alice");
  console.log("name:", kv.get("name")); // Alice

  // Transaction test
  const txnId = kv.begin();
  kv.set("name", "Bob");
  kv.set("age", "30");
  kv.delete("name");

  console.log("During transaction - name:", kv.get("name")); // null (deleted)
  console.log("During transaction - age:", kv.get("age")); // 30

  kv.commit();
  console.log("After commit - name:", kv.get("name")); // null
  console.log("After commit - age:", kv.get("age")); // 30

  // Rollback test
  kv.begin();
  kv.set("temp", "temporary");
  console.log("Before rollback - temp:", kv.get("temp")); // temporary

  kv.rollback();
  console.log("After rollback - temp:", kv.get("temp")); // null
}

testKeyValueStore();

export { KeyValueStore };
