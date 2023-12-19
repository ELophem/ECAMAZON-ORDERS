const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('./index'); // Importez votre fichier index.js ou ajustez le chemin si nécessaire

chai.use(chaiHttp);


describe('API endpoints', () => {
  it('should store an order', (done) => {
    chai.request(app)
      .post('/api/orders/storeOrder')
      .send({
        orderId: '12345',
        articles: [{ name: 'Product 1', quantity: 2 }],
        amount: 50.00,
        clientName: 'John Doe'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Order stored successfully');
        done();
      });
  });

  it('should delete an order by order_id', (done) => {
    chai.request(app)
      .delete('/api/orders/deleteOrder/12345') // Replace '12345' with an existing order ID for testing
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Order deleted successfully');
        done();
      });
  });

  it('should fetch all orders', (done) => {
    chai.request(app)
      .get('/api/orders/orders')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // Add more assertions based on your expected data structure
        done();
      });
  });
});
