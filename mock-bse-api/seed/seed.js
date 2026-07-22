const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Client = require("../model/client.model");
const Trade = require("../model/trade.model");
const Employee = require("../model/employess.model");
const Mapping = require("../model/mapping.model");

mongoose
  .connect("mongodb://127.0.0.1:27017/mock_bse")
  .then(async () => {
    console.log("MongoDB Connected");

    await Client.deleteMany();
    await Trade.deleteMany();
    await Employee.deleteMany();
    await Mapping.deleteMany();

    console.log("Old data deleted");

    // -----------------------------
    // Clients
    // -----------------------------

    const clients = [];

    for (let i = 1; i <= 500; i++) {
      clients.push({
        clientId: `C${1000 + i}`,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.string.numeric(10),
        pan:
          faker.string.alpha({ length: 5 }).toUpperCase() +
          faker.string.numeric(4) +
          faker.string.alpha({ length: 1 }).toUpperCase(),
      });
    }

    await Client.insertMany(clients);

    console.log("500 Clients Inserted");

    // -----------------------------
    // Employees
    // -----------------------------

    const employees = [];

    for (let i = 1; i <= 20; i++) {
      employees.push({
        employeeId: `EMP${i}`,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.string.numeric(10),
        designation: "Relationship Manager",
        role: i === 1 ? "Manager" : "Employee",
      });
    }

    await Employee.insertMany(employees);

    console.log("20 Employees Inserted");

    // -----------------------------
    // Mappings
    // -----------------------------

    const mappings = [];

    clients.forEach((client) => {
      const employee =
        employees[Math.floor(Math.random() * employees.length)];

      mappings.push({
        employeeId: employee.employeeId,
        clientId: client.clientId,
      });
    });

    await Mapping.insertMany(mappings);

    console.log("500 Mappings Inserted");

    // -----------------------------
    // Trades
    // -----------------------------

    const symbols = [
      "RELIANCE",
      "TCS",
      "INFY",
      "HDFCBANK",
      "SBIN",
      "ITC",
      "ICICIBANK",
      "LT",
      "WIPRO",
      "HCLTECH",
    ];

    const trades = [];

    for (let i = 1; i <= 5000; i++) {
      const client =
        clients[Math.floor(Math.random() * clients.length)];

      trades.push({
        tradeId: `T${100000 + i}`,
        clientId: client.clientId,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        quantity: faker.number.int({
          min: 1,
          max: 500,
        }),
        price: faker.number.int({
          min: 100,
          max: 5000,
        }),
        brokerage: faker.number.int({
          min: 10,
          max: 500,
        }),
        tradeDate: faker.date.recent({
          days: 180,
        }),
      });
    }

    await Trade.insertMany(trades);

    console.log("5000 Trades Inserted");

    console.log("Database Seeded Successfully");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });