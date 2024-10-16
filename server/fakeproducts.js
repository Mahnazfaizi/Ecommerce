const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./models/productModel'); // Adjust the path if necessary

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const seedProducts = async (num) => {
    for (let i = 0; i < num; i++) {
        const product = new Product({
            productName: faker.commerce.productName(),
            productBrand: faker.company.name(),
            category: faker.commerce.department(),
            productImage: [faker.image.url()],
            description: faker.lorem.paragraph(),
            price: faker.commerce.price(),
            sellingPrice: faker.commerce.price()
        });

        try {
            await product.save();
            console.log(`Product ${i + 1} saved`);
        } catch (err) {
            console.error('Error saving product', err);
        }
    }
    mongoose.connection.close();
};

seedProducts(100); // Adjust the number of products to seed