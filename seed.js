const models = require('./server/db/models');

const { CartItem, Animal, Enhancement, User, Cart, PastOrder, PastOrderItem, Address, AnimalTag, EnhancementTag, Review } = models;

const db = require('./server/db/db');

db.sync({ force: true })
  .then(() => {
    const cat = Animal.create({
      name: 'Cat',
      description: 'Its a cat!',
      imageUrl: 'http://massgenomics.org/wp-content/uploads/2014/11/domestic-cat-renekyllingstad.jpg',
      price: 1.00,
    });
    const dog = Animal.create({
      name: 'Dog',
      description: 'Its a dog!',
      imageUrl: 'https://www.what-dog.net/Images/faces2/scroll0015.jpg',
      price: 2.50,
    });
    const bird = Animal.create({
      name: 'Bird',
      description: 'Its a bird!',
      imageUrl: 'https://lafeber.com/pet-birds/wp-content/uploads/Parakeet-Category-Image-300x300.jpg',
      price: 9.00,
    });
    const tiger = Animal.create({
      name: 'Tiger',
      description: 'Its a tiger!',
      imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/d9/07/ec/d907ec461fbfa0f172a1098a0d9e9324--wild-tiger-the-tiger.jpg',
      price: 13.00,
    });
    const shark = Animal.create({
      name: 'Shark',
      description: "I'm a SHARK!",
      imageUrl: 'https://i.ytimg.com/vi/0BQzsNatQOY/maxresdefault.jpg',
      price: 50.00,
    });
    const cheetah = Animal.create({
      name: 'Cheetah',
      description: 'What is the fastest mammal!',
      imageUrl: 'http://www.safariwest.com/wp-content/uploads/2014/03/cheetah-sitting1.jpg',
      price: 25.50,
    });
    const hamster = Animal.create({
      name: 'Hamster',
      description: 'I love tiny burritos!',
      imageUrl: 'http://www.petakids.com/wp-content/uploads/2016/10/Brown-Hamster.jpg',
      price: 0.50,
    });
    const guineaPig = Animal.create({
      name: 'Guinea Pig',
      description: 'I poop everywhere',
      imageUrl: 'http://www.petmd.com/sites/default/files/diarrhea-guinea-pigs.jpg',
      price: 1.50,
    });
    const goat = Animal.create({
      name: 'Goat',
      description: 'I will eat everything',
      imageUrl: 'https://media.mnn.com/assets/images/2016/07/goats-wattles.jpg.838x0_q80.jpg',
      price: 0.50,
    });

    const user1 = User.create({
      firstName: 'Bob',
      lastName: 'One',
      email: 'bob@bob.com',
      password: 'bob',
      adminStatus: false,
    });

    const user2 = User.create({
      firstName: 'Tim',
      lastName: 'One',
      email: 'tim@tim.com',
      password: 'tim',
      adminStatus: false,
    });

    const user3 = User.create({
      firstName: 'Jim',
      lastName: 'One',
      email: 'jim@jim.com',
      password: 'jim',
      adminStatus: true,
    });
    const address1 = Address.create({
      streetAddress: '202 hellmuffin lane',
      city: 'Chicato',
      state: 'IL',
      zipCode: 53403,
    });
    const address2 = Address.create({
      streetAddress: '123 crosscountry road',
      city: 'Chocolate',
      state: 'TX',
      zipCode: 76825,
    });
    const address3 = Address.create({
      streetAddress: '1871 runner road',
      city: 'Tellehase',
      state: 'WI',
      zipCode: 52825,
    });
    const address4 = Address.create({
      streetAddress: '1256 flight lane',
      city: 'Los Angelos',
      state: 'OH',
      zipCode: 58207,
    });
    return Promise.all([cat, dog, bird, tiger, shark, cheetah, hamster, guineaPig, goat, user1, user2, user3, address1, address2, address3, address4]);
  })
  .then(([cat, dog, bird, tiger, shark, cheetah, hamster, guineaPig, goat]) => {
    return Promise.all([
      AnimalTag.create({ tagName: 'Domestic' }),
      AnimalTag.create({ tagName: 'Exotic' }),
      AnimalTag.create({ tagName: 'Feline' }),
      AnimalTag.create({ tagName: 'Canine' }),
      AnimalTag.create({ tagName: 'Bird' }),
      AnimalTag.create({ tagName: 'Aquatic' }),
      AnimalTag.create({ tagName: 'Small' }),
      AnimalTag.create({ tagName: 'Dangerous' }),
      cat,
      dog,
      bird,
      tiger,
      shark,
      cheetah,
      hamster,
      guineaPig,
      goat,
    ]);
  })
  .then(([domestic, exotic, feline, canine, birdTag, acquatic, small, dangerous, cat, dog, bird, tiger, shark, cheetah, hamster, guineaPig, goat]) => {
    cat.addTags([domestic, feline]);
    dog.addTags([domestic, canine]);
    bird.addTags([birdTag]);
    tiger.addTags([exotic, dangerous]);
    shark.addTags([acquatic, dangerous]);
    cheetah.addTags([exotic, feline]);
    hamster.addTags([small]);
    guineaPig.addTags([small]);
    goat.addTags([domestic]);
  })
  .then(() => {
    const laser = Enhancement.create({
      name: 'Laser',
      description: 'PEW PEW PEW!',
      imageUrl: 'http://thumbs2.ebaystatic.com/d/l225/m/mBtRkSBvFpj15u36aqkhIog.jpg',
      price: 2.00,
    });

    const wings = Enhancement.create({
      name: 'Wings',
      description: 'I want to fly away.',
      imageUrl: 'http://theamazingbat.com/wp-content/uploads/2016/02/bat-wing-no-text.jpg',
      price: 3.00,
    });

    const bread = Enhancement.create({
      name: 'Bread',
      description: 'Yum',
      imageUrl: 'https://c1.staticflickr.com/3/2355/2104039823_b47da37172_b.jpg',
      price: 1.00,
    });

    const fire = Enhancement.create({
      name: 'Fire Breath',
      description: 'Burninate your foes!',
      imageUrl: 'https://vignette4.wikia.nocookie.net/deadliestfiction/images/7/72/Fire_breath.jpg/revision/latest?cb=20110517193340',
      price: 9.00,
    });

    const taco = Enhancement.create({
      name: 'Taco',
      description: 'For Tuesdays!',
      imageUrl: 'http://www.krbe.com/wp-content/uploads/sites/115/2017/02/bftlarge.png',
      price: 5.00,
    });

    const vacuum = Enhancement.create({
      name: 'Vacuum Cleaner',
      description: 'Its a cat!',
      imageUrl: 'http://ghk.h-cdn.co/assets/cm/15/12/5508ec76dc341-fullerbrush-tidymaid2-xln.jpg',
      price: 3.00,
    });

    return Promise.all([laser, wings, bread, fire, taco, vacuum]);
  })
  .then(([laser, wings, bread, fire, taco, vacuum]) => {
    return Promise.all([
      EnhancementTag.create({ tagName: 'Appendages' }),
      EnhancementTag.create({ tagName: 'Food' }),
      EnhancementTag.create({ tagName: 'Electronics' }),
      EnhancementTag.create({ tagName: 'Weapons' }),
      laser,
      wings,
      bread,
      fire,
      taco,
      vacuum,
    ]);
  })
  .then(([appendages, food, electronics, weapon, laser, wings, bread, fire, taco, vacuum]) => {
    laser.addTags([electronics, weapon]);
    wings.addTags([appendages]);
    bread.addTags([food]);
    fire.addTags([weapon]);
    taco.addTags([food]);
    vacuum.addTags([electronics]);
  })
  .then(() => {
    return Promise.all([
      Cart.create({ userId: 1 }),
      Cart.create({ userId: 2 }),
      Cart.create({ userId: 3, promoCode: 'pleaaaase' }),
    ]);
  })
  .then(() => {
    return Promise.all([
      Review.create({ rating: 9, inspiredEmotion: 'existential angst', fullDescription: 'I never thought something so cute could challenge the fate of our species just by sneezing', animalId: 7, enhancementId: 1, user: 1 }),
      Review.create({ rating: 11, inspiredEmotion: 'qtness overload', fullDescription: 'death by cuteness is all i ever wanted', animalId: 4, enhancementId: 3, user: 2 }),
      Review.create({ rating: 6, inspiredEmotion: 'sorrow', fullDescription: 'I am at a loss for words... Product worked better than I ever imagined... I can no longer go back to my home country', animalId: 5, enhancementId: 2, user: 3 }),
    ]);
  })
  .then(() => {
    return Promise.all([
      CartItem.create({ quantity: 3, price: 1.00, animalId: 1, enhancementId: 4, cartId: 1 }),
      CartItem.create({ quantity: 1, price: 2.00, animalId: 2, enhancementId: 1, cartId: 1 }),
      CartItem.create({ quantity: 5, price: 3.00, animalId: 3, enhancementId: 2, cartId: 2 }),
      CartItem.create({ quantity: 9, price: 4.00, animalId: 4, enhancementId: 3, cartId: 2 }),
      CartItem.create({ quantity: 5, price: 5.00, animalId: 5, enhancementId: 5, cartId: 3 }),
      CartItem.create({ quantity: 3, price: 5.00, animalId: 2, enhancementId: 6, cartId: 3 }),
      CartItem.create({ quantity: 1, price: 5.00, animalId: 3, enhancementId: 5, cartId: 3 }),
    ]);
  })
  .then(() => {
    return Promise.all([
      PastOrder.create({ userId: 1, shippingAddress: 1, billingAddress: 1, creditNumber: '4484226236031147', creditExpiration: '08/18', creditCSV: '123', status: 'completed' }),
      PastOrder.create({ userId: 2, shippingAddress: 2, billingAddress: 2, creditNumber: '4484226236031147', creditExpiration: '07/17', creditCSV: '123', status: 'shipped' }),
      PastOrder.create({ userId: 3, shippingAddress: 3, billingAddress: 3, creditNumber: '4484226236031147', creditExpiration: '06/16', creditCSV: '123', status: 'processing' }),
      PastOrder.create({ userId: 3, shippingAddress: 3, billingAddress: 3, creditNumber: '4484226236031147', creditExpiration: '66/66', creditCSV: '123', status: 'processing' }),
    ]);
  })
  .then(() => {
    return Promise.all([
      PastOrderItem.create({ quantity: 2, price: 1.00, animalId: 1, enhancementId: 4, pastOrderId: 1 }),
      PastOrderItem.create({ quantity: 1, price: 2.00, animalId: 2, enhancementId: 3, pastOrderId: 1 }),
      PastOrderItem.create({ quantity: 4, price: 3.00, animalId: 3, enhancementId: 2, pastOrderId: 2 }),
      PastOrderItem.create({ quantity: 8, price: 4.00, animalId: 4, enhancementId: 1, pastOrderId: 2 }),
      PastOrderItem.create({ quantity: 6, price: 5.00, animalId: 5, enhancementId: 4, pastOrderId: 2 }),
      PastOrderItem.create({ quantity: 4, price: 6.00, animalId: 6, enhancementId: 3, pastOrderId: 3 }),
      PastOrderItem.create({ quantity: 1, price: 1.00, animalId: 7, enhancementId: 2, pastOrderId: 3 }),
      PastOrderItem.create({ quantity: 6, price: 2.00, animalId: 1, enhancementId: 1, pastOrderId: 3 }),
      PastOrderItem.create({ quantity: 4, price: 3.00, animalId: 2, enhancementId: 4, pastOrderId: 3 }),
      PastOrderItem.create({ quantity: 1, price: 4.00, animalId: 3, enhancementId: 3, pastOrderId: 3 }),
      PastOrderItem.create({ quantity: 6, price: 5.00, animalId: 4, enhancementId: 2, pastOrderId: 4 }),
      PastOrderItem.create({ quantity: 4, price: 6.00, animalId: 5, enhancementId: 1, pastOrderId: 4 }),
      PastOrderItem.create({ quantity: 1, price: 7.00, animalId: 6, enhancementId: 5, pastOrderId: 4 }),
    ]);
  })
  .then(() => {
    console.log('finished seeding');
    db.close();
  })
  .catch();

