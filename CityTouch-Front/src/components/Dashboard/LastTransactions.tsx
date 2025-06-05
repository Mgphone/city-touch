import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Transaction = {
  id: string;
  description: string;
  date: string;
  amount: number;
};

type Props = {
  transactions: Transaction[];
};

const LastTransactions: React.FC<Props> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 8 Transactions</CardTitle>
        <CardDescription>Recent user activity</CardDescription>
      </CardHeader>

      <CardContent>
        {transactions && transactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {transactions.slice(0, 8).map((tx) => (
              <li
                key={tx.id}
                className="py-3 flex justify-between items-center"
              >
                <span className="font-medium text-gray-900">
                  {tx.description}
                </span>
                <span className="text-gray-600">{tx.date}</span>
                <span
                  className={`font-semibold ${
                    tx.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.amount > 0
                    ? `+£${tx.amount}`
                    : `-£${Math.abs(tx.amount)}`}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No recent transactions found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default LastTransactions;
