const db = require('./dbDesign.js');

// THIS HAS ALREADY BEEN RUN
// HARD RESETS THE DB, DO NOT RUN UNLESS YOU WANT TO CLEAR LITERALLY EVERYTHING-- caathy

db.sequelize
.sync({ force: true })
  .then(() => {
    //eslint-disable-next-line
    console.log('It worked!');
  }, (err) => {
    //eslint-disable-next-line
    console.log('An error occurred while creating the table:', err);
  }).then(() => {
    db.Images.create({
      UserId: 0,
      image: 'http://cdn.litlepups.net/2016/04/10/small_crow-flying-png-bird-flying-silhouette.png',
    });
    db.User.create({
      password: 'jjj3k12kksksls',
      username: 'samChute123',
      address: '4411 TomTom Street',
      city: 'San Francisco',
      state: 'California',
      zipcode: '94539',
      email: 'samChute1@gmail.com',
      phone: '555-444-1122',
      about: 'All about me!',
      verification: 1234,
      verified: true,
      firstName: 'Sam',
      lastName: 'Chute',
      stripeToken: null,
    }).then((user) => {
      db.Images.create({
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Arthur_Read.svg/648px-Arthur_Read.svg.png',
        UserId: user.dataValues.id,
      });
    });
    db.User.create({
      password: 'jalsjo3kkqfo',
      username: 'Justin',
      address: '66611 S Street',
      city: 'San Francisco',
      state: 'California',
      zipcode: '94539',
      email: 'Justin@gmail.com',
      phone: '555-567-0099',
      about: 'Everything about me!',
      verification: 1234,
      verified: true,
      firstName: 'Seeelle',
      lastName: 'Lion',
      stripeToken: null,
    }).then((user) => {
      db.Images.create({
        image: 'http://img2.timeinc.net/people/i/2006/celebdatabase/justintimberlake/j_timberlake1_300_400.jpg',
        UserId: user.dataValues.id,
      });
    });
    db.User.create({
      password: 'kp409fjw48hgj5',
      username: 'Cathy',
      address: '9494 Tell Ave',
      city: 'San Francisco',
      state: 'California',
      zipcode: '94539',
      email: 'Cathy@gmail.com',
      phone: '555-001-8585',
      about: 'All about us!',
      verification: 1234,
      verified: true,
      firstName: 'Tello',
      lastName: 'Bean',
      stripeToken: null,
    }).then((user) => {
      db.Images.create({
        image: 'http://cathyhsianglee.com/images/cathyleecircle.png',
        UserId: user.dataValues.id,
      });
    });
    db.User.create({
      password: 'k94993010kkf',
      username: 'Ben',
      address: '009 Tails Road',
      city: 'San Francisco',
      state: 'California',
      zipcode: '94539',
      email: 'Ben1@gmail.com',
      phone: '555-667-0862',
      about: 'All me!',
      verification: 1234,
      verified: true,
      firstName: 'Sam',
      lastName: 'Tranpppse',
      stripeToken: null,
    }).then((user) => {
      db.Images.create({
        image: 'http://a2.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzODE1Nzk1MjEy.jpg',
        UserId: user.dataValues.id,
      });
    });
    db.Listings.create({
      name: 'George Foreman Grill',
      ownerId: 3,
      maxFee: 50,
      rentalFee: 5,
      category: 12,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://target.scene7.com/is/image/Target/15124780?wid=450&hei=450&fmt=pjpeg',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 12 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'S-Works Bicycle',
      ownerId: 1,
      maxFee: 10000,
      rentalFee: 550,
      category: 7,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://triathlonrumor.com/wp-content/uploads/2011/10/2012-Specialized-Shiv-S-Works-Di2-triathlon-aero-bike.jpg',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 6 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Epson Projector',
      ownerId: 4,
      maxFee: 500,
      rentalFee: 20,
      category: 8,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://www.projectorreviews.com/resize/622x335/r/wp-content/uploads/2015/04/G6550WU_front-beauty.jpg',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 8 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Game of Thrones Synopsis',
      ownerId: 3,
      maxFee: 35,
      rentalFee: 5,
      category: 0,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://vignette1.wikia.nocookie.net/iceandfire/images/b/b6/Game_of_thrones.jpeg/revision/latest?cb=20130302001049',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 1 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Nikon D3300',
      ownerId: 2,
      maxFee: 850,
      rentalFee: 210,
      category: 2,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://cdn-4.nikon-cdn.com/e/Q5NM96RZZo-YRYNeYvAi9beHK4x3L-8iSKFuXbTDiVzOj5_9D03cEdJ1gEjX7rK74bi3TemBsjwqkN1duzuOiA==/Views/1529_D3300_left.png',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 2 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Valentino Formal Dress',
      ownerId: 2,
      maxFee: 7910,
      rentalFee: 1000,
      category: 9,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://www.becauseiamfabulous.com/wp-content/uploads/2012/09/Olga-Kurylenko-in-Valentino-Dress-at-the-To-The-Wonder-Premiere-The-69th-Venice-Film-Festival.jpg',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 1 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Mac Pro 2016 32gb RAM, i7, 1TB SSD',
      ownerId: 2,
      maxFee: 4000,
      rentalFee: 200,
      category: 3,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://store.storeimages.cdn-apple.com/4973/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/mac/pro/mac-pro-gallery3-2013?wid=930&hei=629&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=zW0lr1',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 3 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Legit Batman LAMBO',
      ownerId: 2,
      maxFee: 800000,
      rentalFee: 10000,
      category: 10,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'https://i.kinja-img.com/gawker-media/image/upload/s--PkNm59rP--/c_fill,fl_progressive,g_center,h_180,q_80,w_320/17hmosyunvkzojpg.jpg',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 9 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Toxic - Britney Spears',
      ownerId: 2,
      maxFee: 15,
      rentalFee: 1,
      category: 4,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'https://upload.wikimedia.org/wikipedia/en/2/21/Britney_Spears_Toxic.png',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 5 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Listings.create({
      name: 'Shack in SF, great view and price',
      ownerId: 2,
      maxFee: 150000,
      rentalFee: 200,
      category: 5,
      rented: false,
    }).then((item) => {
      db.Images.create({
        image: 'http://i.dailymail.co.uk/i/pix/2015/09/18/00/2C6FCFDA00000578-3239257-image-a-21_1442533435701.jpg',
        ListingId: item.dataValues.id,
      });
      db.Category.findOne({ where: { id: 4 } })
        .then(category => {
          item.addCategory(category);
        });
    });
    db.Category.create({
      categoryName: 'Books',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Cameras',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Computers',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Music',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Real Estate',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Sporting Goods',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Video Games',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Consumer Electronics',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Clothing',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Motors',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Pet Supplies',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Home & Garden',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Health & Beauty',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Other',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Nonfiction',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Textbooks',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Cookbooks',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Accessories',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Other Books',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Film Photography',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Camcorders',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Digital Cameras',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Binoculars & Telescopes',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Camera Drones',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Other Cameras',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Software',
      CategoryId: 3,
    });
    db.Category.create({
      categoryName: 'Laptops',
      CategoryId: 3,
    });
    db.Category.create({
      categoryName: 'Desktop',
      CategoryId: 3,
    });
    db.Category.create({
      categoryName: 'Printers & Scanners',
      CategoryId: 3,
    });
    db.Category.create({
      categoryName: 'Monitors',
      CategoryId: 3,
    });
    db.Category.create({
      categoryName: 'Peripherals',
      CategoryId: 3,
    });
    db.Category.create({
      categoryName: 'Collections',
      CategoryId: 4,
    });
    db.Category.create({
      categoryName: 'CDs',
      CategoryId: 4,
    });
    db.Category.create({
      categoryName: 'Records',
      CategoryId: 4,
    });
    db.Category.create({
      categoryName: 'Land',
      CategoryId: 5,
    });
    db.Category.create({
      categoryName: 'Timeshares',
      CategoryId: 5,
    });
    db.Category.create({
      categoryName: 'Residential',
      CategoryId: 5,
    });
    db.Category.create({
      categoryName: 'Outdoor Sports',
      CategoryId: 6,
    });
    db.Category.create({
      categoryName: 'Indoor Games',
      CategoryId: 6,
    });
    db.Category.create({
      categoryName: 'Winter Sports',
      CategoryId: 6,
    });
    db.Category.create({
      categoryName: 'Water Sports',
      CategoryId: 6,
    });
    db.Category.create({
      categoryName: 'Other Sporting Goods',
      CategoryId: 6,
    });
    db.Category.create({
      categoryName: 'Video Game Consoles',
      CategoryId: 7,
    });
    db.Category.create({
      categoryName: 'Video Game Merchandise',
      CategoryId: 7,
    });
    db.Category.create({
      categoryName: 'Video Game Accessories',
      CategoryId: 7,
    });
    db.Category.create({
      categoryName: 'TVs, Video & Home Audio',
      CategoryId: 8,
    });
    db.Category.create({
      categoryName: 'Vintage Electronics',
      CategoryId: 8,
    });
    db.Category.create({
      categoryName: 'Radio Communication',
      CategoryId: 8,
    });
    db.Category.create({
      categoryName: 'Home Surveillance',
      CategoryId: 8,
    });
    db.Category.create({
      categoryName: "Men's Clothing",
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: 'Baby & Toddler Clothing',
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: 'Costumes, Theater',
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: "Women's Accessories",
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: "Men's Shoes",
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: 'Vintage',
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: "Women's Shoes",
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: "Women's Handbags",
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: "Women's Clothing",
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: 'Wedding & Formal',
      CategoryId: 9,
    });
    db.Category.create({
      categoryName: 'Bird Supplies',
      CategoryId: 10,
    });
    db.Category.create({
      categoryName: 'Cat Supplies',
      CategoryId: 10,
    });
    db.Category.create({
      categoryName: 'Dog Supplies',
      CategoryId: 10,
    });
    db.Category.create({
      categoryName: 'Small Animal Supplies',
      CategoryId: 10,
    });
    db.Category.create({
      categoryName: 'Fish & Aquariums',
      CategoryId: 10,
    });
    db.Category.create({
      categoryName: 'Other Pet Supplies',
      CategoryId: 10,
    });
    db.Category.create({
      categoryName: 'Cars & Trucks',
      CategoryId: 11,
    });
    db.Category.create({
      categoryName: 'Motorcycles',
      CategoryId: 11,
    });
    db.Category.create({
      categoryName: 'Boats',
      CategoryId: 11,
    });
    db.Category.create({
      categoryName: 'Other Vehicles',
      CategoryId: 11,
    });
    db.Category.create({
      categoryName: 'Furniture',
      CategoryId: 12,
    });
    db.Category.create({
      categoryName: 'Holiday & Seasonal Decor',
      CategoryId: 12,
    });
    db.Category.create({
      categoryName: 'Tools',
      CategoryId: 12,
    });
    db.Category.create({
      categoryName: 'Lamps, Lighting',
      CategoryId: 12,
    });
    db.Category.create({
      categoryName: 'Home Improvement',
      CategoryId: 12,
    });
    db.Category.create({
      categoryName: 'Yard and Garden',
      CategoryId: 12,
    });
    db.Category.create({
      categoryName: 'Other Home & Garden',
      CategoryId: 12,
    });
  });
