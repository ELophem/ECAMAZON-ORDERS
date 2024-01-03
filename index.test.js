const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('./index');

chai.use(chaiHttp);

describe('API endpoints', () => {
  let server;

  before((done) => {

    server = app.listen(0, () => {
      console.log('Server started');
      done();
    });
  });

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
      .delete('/api/orders/deleteOrder/12345') 
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
  
        done();
      });
  });

  after((done) => {

    if (server) {
      server.close(() => {
        console.log('Server closed');
        done();
      });
    } else {
      console.log('Server was not started or already closed');
      done();
    }
    process.exit(0); 
  });
});
