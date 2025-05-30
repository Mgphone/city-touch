export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "10+",
      description: "Years Helping You Move",
    },
    {
      quantity: "1000+",
      description: "Happy Customers",
    },
    {
      quantity: "100%",
      description: "Customer Happiness Rate",
    },
    {
      quantity: "24/7",
      description: "Always Here to Help",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
