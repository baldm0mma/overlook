class Customer {
  constructor(name, id, custData) {
    this.data = custData || null;
    this.name = name;
    this.id = id || custData.length + 1;
  }

  searchForSpecificUser(searchTerm) {
    let strNum;
    parseInt(searchTerm) ? strNum = parseInt(searchTerm) : strNum = searchTerm;
    if (typeof strNum === 'string') {
      let string = this.data.find(cust => cust.name.toLowerCase().includes(strNum.toLowerCase()));
      return string ? string : null;
    } else if (typeof strNum === 'number') {
      let number = this.data.find(cust => cust.id === strNum);
      return number ? number : null;
    } else {
      return null;
    }
  }

}

export default Customer;