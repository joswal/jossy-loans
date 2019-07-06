const {
  User,
  validate
} = require('../../../models/userModel');

describe('user.authenticateUser', () => {
  it('should change value of user.isLoggedIn to true', () => {
    const user = new User("wale", "joswal", "princejoswal@gmail.com", "123456", "123456", "08062467783", "false");
    user.authenticateUser();
    expect(user.isLoggedIn).toBe(true);
  });
});

describe('validate User', () => {
  it('it should validate the user details and return no error if all details are correct ', () => {
    const user = new User("wale", "joswal", "princejoswal@gmail.com", "123456", "123456", "08062467783");
    const {
      error
    } = validate(user);
    expect(error).toBe(false);
  });

  it('it should set status as 400 and return appropriate message if any of the details is correct ', () => {
    const user = new User("wale", "joswal", "princejoswal@gmail.com", "123456", "123456", "08062467783");
    const {
      error
    } = validate(user);
    expect(user.isLoggedIn).toBe(true);
  });
});