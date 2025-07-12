# Key-Value Store with Transactions

A TypeScript implementation of an in-memory key-value store that supports ACID transactions. This implementation provides basic CRUD operations along with transaction management capabilities including commit and rollback functionality.

## Features

- **Basic Operations**: Set, get, and delete key-value pairs
- **Transaction Support**: Begin, commit, and rollback transactions
- **ACID Properties**: Ensures atomicity, consistency, isolation, and durability within transactions
- **Type Safety**: Written in TypeScript with proper type definitions
- **In-Memory Storage**: Fast access using JavaScript Map data structure

## API Reference

### Basic Operations

#### `set(key: string, val: string): void`
Sets a key-value pair in the store. If called within a transaction, the operation is staged until commit.

```typescript
kv.set("name", "Alice");
```

#### `get(key: string): string | null`
Retrieves the value for a given key. Returns `null` if the key doesn't exist.

```typescript
const value = kv.get("name"); // Returns "Alice" or null
```

#### `delete(key: string): boolean`
Deletes a key-value pair from the store. Returns `true` if the key existed and was deleted, `false` otherwise.

```typescript
const deleted = kv.delete("name"); // Returns true if key existed
```

### Transaction Operations

#### `begin(): number`
Starts a new transaction and returns the transaction ID. Only one transaction can be active at a time.

```typescript
const txnId = kv.begin();
```

#### `commit(): void`
Commits the current transaction, applying all staged operations to the main store.

```typescript
kv.commit();
```

#### `rollback(): void`
Rolls back the current transaction, discarding all staged operations.

```typescript
kv.rollback();
```

## Usage Examples

### Basic Usage

```typescript
import { KeyValueStore } from './main';

const kv = new KeyValueStore();

// Set and get values
kv.set("name", "Alice");
kv.set("age", "25");

console.log(kv.get("name")); // "Alice"
console.log(kv.get("age"));  // "25"

// Delete a key
kv.delete("age");
console.log(kv.get("age"));  // null
```

### Transaction Usage

```typescript
const kv = new KeyValueStore();

// Set initial data
kv.set("balance", "100");

// Start a transaction
kv.begin();

// Make changes within the transaction
kv.set("balance", "150");
kv.set("status", "active");

// Changes are visible within the transaction
console.log(kv.get("balance")); // "150"
console.log(kv.get("status"));  // "active"

// Commit the transaction
kv.commit();

// Changes are now permanent
console.log(kv.get("balance")); // "150"
console.log(kv.get("status"));  // "active"
```

### Rollback Example

```typescript
const kv = new KeyValueStore();

kv.set("data", "important");

// Start a transaction
kv.begin();

// Make some changes
kv.set("data", "modified");
kv.set("temp", "temporary");

console.log(kv.get("data")); // "modified"
console.log(kv.get("temp")); // "temporary"

// Rollback the transaction
kv.rollback();

// Changes are discarded
console.log(kv.get("data")); // "important"
console.log(kv.get("temp")); // null
```

## Running the Code

### Prerequisites

- Node.js (version 14 or higher)
- TypeScript compiler

### Running the Example

The project includes a test function that demonstrates the key-value store functionality:

```bash
# If you have TypeScript installed globally
tsc main.ts && node main.js

# Or using ts-node
npx ts-node main.ts
```

## Implementation Details

### Data Structures

- **Main Store**: Uses JavaScript `Map<string, string>` for fast key-value operations
- **Transactions**: Each transaction maintains its own `Map<string, string | null>` for staged operations
- **Transaction Management**: Tracks active transactions and ensures only one can be active at a time

### Transaction Isolation

- Operations within a transaction are isolated from the main store until commit
- Read operations check the transaction's staged operations first, then fall back to the main store
- Delete operations are represented as `null` values in the transaction's operation map

### Error Handling

The implementation includes proper error handling for:
- Attempting to start a transaction when one is already active
- Attempting to commit when no transaction is in progress
- Attempting to rollback when no transaction is in progress

## Limitations

- **Single Transaction**: Only one transaction can be active at a time
- **In-Memory Only**: Data is not persisted to disk
- **No Concurrency**: Not designed for multi-threaded environments
- **String Values Only**: Only supports string values (not arbitrary objects)

## License

This project is open source and available under the MIT License.
