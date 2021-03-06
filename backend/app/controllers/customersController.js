import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
} from '../helpers/validations';
  
import {
    errorMessage, successMessage, status,
} from '../helpers/status';

/**
   * Create A Customer
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object (of Customer)
   */
  const createCustomer = async (req, res) => {
    const {
      email, first_name, last_name, password,
    } = req.body;

    console.log('body: ', req.body)
    console.log('email: ', email)
    console.log('first_name: ', first_name)
    console.log('last_name: ', last_name)
    console.log('password: ', password)


    // const created_on = moment(new Date());
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
      errorMessage.error = 'Email, password, first name and last name fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!validatePassword(password)) {
      errorMessage.error = 'Password must be more than five(5) characters';
      return res.status(status.bad).send(errorMessage.error);
    }
    // const hashedPassword = hashPassword(password);
    const createCustomerQuery = `INSERT INTO
        Customer(email, first_name, last_name, password)
        VALUES($1, $2, $3, $4)
        returning *`;
    // const values = [
    //   email,
    //   first_name,
    //   last_name,
    //   hashedPassword,
    //   // created_on,
    // ];

    const values = [
      email,
      first_name,
      last_name,
      password,
      // created_on,
    ];
  
    try {
      const { rows } = await dbQuery.query(createCustomerQuery, values);
      const dbResponse = rows[0];
      // delete dbResponse.password;
    //   const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      successMessage.data = dbResponse;
    //   successMessage.data.token = token;
      return res.status(status.created).send(successMessage.data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Customer with that EMAIL already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };
  
  /**
     * Signin
     * @param {object} req
     * @param {object} res
     * @returns {object} customer object
     */
  const signinCustomer = async (req, res) => {
    const { email, password, firstname, lastname, creditcard } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
      errorMessage.error = 'Email or Password detail is missing';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email or Password';
      return res.status(status.bad).send(errorMessage.error);
    }
    const signinCustomerQuery = 'SELECT * FROM Customer WHERE email = $1';
    try {
      const { rows } = await dbQuery.query(signinCustomerQuery, [email]);
      const dbResponse = rows[0];
      if (!dbResponse) {
        errorMessage.error = 'Customer with this email does not exist';
        console.log(errorMessage.error);
        return res.status(status.notfound).send(errorMessage.error);
      }
      if (!comparePassword(dbResponse.password, password)) {
        errorMessage.error = 'The password you provided is incorrect';
        return res.status(status.bad).send(errorMessage.error);
      }
      // const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      // delete dbResponse.password;
      successMessage.data = dbResponse;
    //   successMessage.data.token = token;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
 * @params {Object} req
 * @params {Object} res
 * @returns return firstname and Lastname
 */ 

 const searchCustomerFirstnameOrLastname = async (req, res) => {
    const { first_name, last_name } = req.query;
    const searchQuery = 'SELECT * from Customer WHERE first_name =$1 OR last_name =$2 ORDER BY id DESC';
    try {
      const { rows } = await dbQuery.query(searchQuery, [first_name, last_name]);
      const dbResponse = rows;
      if (!dbResponse[0]) {
        errorMessage.error = 'No user with such names';
        return res.status(status.notfound).send(errorMessage.error);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    }
    catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);

    }
  };

  /**
   * Edit A Customer
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object (of Customer)
   */
  const editCustomer = async (req, res) => {
    const {
      email, first_name, last_name, password, id
    } = req.body;

    console.log('body: ', req.body)
    console.log('email: ', email)
    console.log('first_name: ', first_name)
    console.log('last_name: ', last_name)
    console.log('password: ', password)
    console.log('id: ', id)


    // const created_on = moment(new Date());
    // if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
    //   errorMessage.error = 'Email, password, first name and last name fields cannot be empty';
    //   return res.status(status.bad).send(errorMessage.error);
    // }
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
      errorMessage.error = 'Email, password, first name and last name fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!validatePassword(password)) {
      errorMessage.error = 'Password must be more than five(5) characters';
      return res.status(status.bad).send(errorMessage.error);
    }
    // const hashedPassword = hashPassword(password);
    const editCustomerQuery = `UPDATE Customer set
        email = $1,
        first_name = $2,
        last_name = $3,
        password = $4
        where id = $5
        returning *`;
    const values = [
      email,
      first_name,
      last_name,
      password,
      id
      // creditcard
      // created_on,
    ];
  
    try {
      const { rows } = await dbQuery.query(editCustomerQuery, values);
      const dbResponse = rows[0];
      // delete dbResponse.password;
    //   const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      successMessage.data = dbResponse;
    //   successMessage.data.token = token;
      return res.status(status.created).send(successMessage.data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Customer with that EMAIL already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * delete a customer
   */
  const deleteCustomer = async (req, res) => {
    const { id } = req.body;
    const deleteCustomerQuery = 'delete from customer where id = $1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteCustomerQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * get no. of customer's orders
   */
  const ordersByCustomer = async (req, res) => {
    const { id } = req.body;
    console.log('id: ', id);
    const ordersByCustomerQuery = 'select count(id) from orders where id = $1';
    try {
      const { rows } = await dbQuery.query(ordersByCustomerQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get promotion that applies to customer's orders
   */
  const applicablePromotions = async (req, res) => {
    const { id, total } = req.body;
    console.log('id: ', id);
    const applicablePromotionsQuery = 'select * from promotion where (enddate > now()) and (promotionid = any(select promotionid from fdspromotion) or promotionid = any(select promotionid from restaurantpromotion where resid = $1)) and (minspending < $2)';
    
    const values = [
      id,
      total
    ];

    try {
      const { rows } = await dbQuery.query(applicablePromotionsQuery, values);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get promotion details
   */
  const promotionDetails = async (req, res) => {
    const { id } = req.body;
    console.log('id: ', id);
    const applicablePromotionsQuery = 'select * from promotion where promotionid = $1';

    try {
      const { rows } = await dbQuery.query(applicablePromotionsQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * new order from customer
   */
  const createOrder = async (req, res) => {
    const { id, ccpayment, items } = req.body;
    console.log('id: ', id);
    const createOrderQuery = 'insert into orders(id, ccpayment) valuse($1,$2) returning *';
    const values = [
      id,
      ccpayment
    ];

    try {
      const { rows } = await dbQuery.query(createOrderQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get all orders by customer
   */
  const customerOrders = async (req, res) => {
    const { id } = req.body;
    console.log('id: ', id);
    const ordersByCustomerQuery = 'select * from orders where id = $1';
    try {
      const { rows } = await dbQuery.query(ordersByCustomerQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get customer order receipt
   */
  const orderReceipt = async (req, res) => {
    const { id } = req.body;
    console.log('id: ', id);
    const ordersByCustomerQuery = 'select * from receipt where orderid = $1';
    try {
      const { rows } = await dbQuery.query(ordersByCustomerQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get customer order information
   */
  const orderInformation = async (req, res) => {
    const { id } = req.body;
    console.log('id: ', id);
    const ordersByCustomerQuery = 'select * from orders where orderid = $1';
    try {
      const { rows } = await dbQuery.query(ordersByCustomerQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get customer food
   */
  const orderFood = async (req, res) => {
    const { id } = req.body;
    console.log('id: ', id);
    const ordersByCustomerQuery = 'select * from contains where orderid = $1';
    try {
      const { rows } = await dbQuery.query(ordersByCustomerQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get order restaurant
   */
  const orderRestaurant = async (req, res) => {
    const { id } = req.body;
    console.log('order restaurant id: ', id);
    const ordersByCustomerQuery = 'select resname from restaurant where resid = (select distinct resid from listings where itemid = any(select itemid from contains where orderid = $1))';
    try {
      const { rows } = await dbQuery.query(ordersByCustomerQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('res: ', dbResponse);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }
  
  export {
    createCustomer,
    signinCustomer,
    searchCustomerFirstnameOrLastname,
    editCustomer,
    deleteCustomer,
    ordersByCustomer,
    applicablePromotions,
    promotionDetails,
    customerOrders,
    orderReceipt,
    orderInformation,
    orderFood,
    orderRestaurant
  };
