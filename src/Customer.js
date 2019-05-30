class Customer {
  constructor(name, id, custData) {
    this.data = custData || null;
    this.name = name;
    this.id = id || custData.length + 1;
  }

}

export default Customer;