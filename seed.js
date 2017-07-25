const models = require('./server/db/models');

const { Order, Animal, Enhancement, User } = models;

const db = require('./server/db/db')

db.sync({ force: true })
  .then(() => {

    const animal1 = Animal.create({
      name: 'Cat',
      description: 'Its a cat!',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 1.00,
    });
    const animal2 = Animal.create({
      name: 'Dog',
      description: 'Its a dog!',
      imageUrl: 'https://www.what-dog.net/Images/faces2/scroll0015.jpg',
      price: 2.50,
    });
    const animal3 = Animal.create({
      name: 'Bird',
      description: 'Its a bird!',
      imageUrl: 'https://lafeber.com/pet-birds/wp-content/uploads/Parakeet-Category-Image-300x300.jpg',
      price: 9.00,
    });
    const animal4 = Animal.create({
      name: 'Tiger',
      description: 'Its a tiger!',
      imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/d9/07/ec/d907ec461fbfa0f172a1098a0d9e9324--wild-tiger-the-tiger.jpg',
      price: 13.00,
    });
    const animal5 = Animal.create({
      name: 'Shark',
      description: "I'm a SHARK!",
      imageUrl: 'https://i.ytimg.com/vi/0BQzsNatQOY/maxresdefault.jpg',
      price: 0.50,
    });

    const user1 = User.create({
      name: 'bob',
      email: 'bob@bob.com',
      password: 'bob',
      adminStatus: false,
    });

    const user2 = User.create({
      name: 'tim',
      email: 'tim@tim.com',
      password: 'tim',
      adminStatus: false,
    });

    const user3 = User.create({
      name: 'jim',
      email: 'jim@jim.com',
      password: 'jim',
      adminStatus: true,
    });

    const enhancement1 = Enhancement.create({
      name: 'Laser',
      description: 'PEW PEW PEW!',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 2.00,
    });

    const enhancement2 = Enhancement.create({
      name: 'Wings',
      description: 'I want to fly away.',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 3.00,
    });

    const enhancement3 = Enhancement.create({
      name: 'Bread',
      description: 'Yum',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 1.00,
    });

    const enhancement4 = Enhancement.create({
      name: 'Fire Breath',
      description: 'Burninate your foes!',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 9.00,
    });

    const enhancement5 = Enhancement.create({
      name: 'Taco',
      description: 'For Tuesdays!',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 5.00,
    });

    const enhancement6 = Enhancement.create({
      name: 'Vacuum Cleaner',
      description: 'Its a cat!',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 3.00,
    });

    return Promise.all([animal1, animal2, animal3, animal4, animal5, user1, user2, user3, enhancement1, enhancement2, enhancement3, enhancement4, enhancement5, enhancement6]);
  })
  .then(() => {
    return Promise.all([
      Order.create({ quantity: 3, price: 1.00, animalId: 1, enhancementId: 4, userId: 1 }),
      Order.create({ quantity: 1, price: 2.00, animalId: 2, enhancementId: 1, userId: 2 }),
      Order.create({ quantity: 4, price: 3.00, animalId: 3, enhancementId: 2, userId: 3 }),
      Order.create({ quantity: 9, price: 4.00, animalId: 4, enhancementId: 3, userId: 1 }),
      Order.create({ quantity: 6, price: 5.00, animalId: 5, enhancementId: 5, userId: 1 }),
      Order.create({ quantity: 4, price: 5.00, animalId: 2, enhancementId: 6, userId: 3 }),
      Order.create({ quantity: 1, price: 5.00, animalId: 3, enhancementId: 5, userId: 2 }),
    ]);
  })
  .then(() => {
    console.log('finished seeding')
  })
  .catch();

