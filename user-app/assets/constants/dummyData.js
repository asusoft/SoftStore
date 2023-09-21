import images from "./images"

const OnboardingData = [
    {
        "key": "3571572",
        "title": "Discover places near you",
        "description": "We make it simple to find the food you crave. Enter your adress and let us do the rest.",
        "image": "data:image/png;base64,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"
    },
    {
        "key": "3571747",
        "title": "Order your favorites",
        "description": "When you order from us, we'll hook you up with exclusive coupons, specials and rewards.",
        "image": "data:image/jpeg;base64,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"
    },
    {
        "key": "3571680",
        "title": "Pick Up or delivery",
        "description": "We make food ordering fast, simple and enjoyable - no matter order online or cash.",
        "image": "data:image/jpeg;base64,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"
    }
]


const Categories = [
    {
        id: 1,
        name: 'Mobile Phones',
        icon: "https://mobieltjesenzo.nl/wp-content/uploads/2022/12/home-smartphone.png"
    },
    {
        id: 2,
        name: "Laptops and Computers",
        icon: "https://shop.unicornstore.in/uploads/images/medium/cc0d1999b8236328aff06729b8bff116.png"
    },
    {
        id: 3,
        name: "Tablets",
        icon: "https://i01.appmifile.com/webfile/globalimg/spainOria/K82-white-2!800x800!85.png"
    },
    {
        id: 4,
        name: "Smart Watches",
        icon: "https://www.samsung.com/global/galaxy/galaxy-watch5-pro/images/galaxy-watch5-ecosystem-galaxy-watch5-mo.png"
    },
    {
        id: 5,
        name: "Headphones",
        icon: "https://help.apple.com/assets/61AFEC45FA5233173908347B/61B0509E1BF38548362237B5/en_US/b9f519195f84950573eea5088a49b964.png"
    },
    {
        id: 6,
        name: "Accessories",
        icon: "https://www.pngall.com/wp-content/uploads/5/Mobile-Phone-Accessories-Transparent.png"
    },
]

const Brands = [
    {
        id: 1,
        name: 'Apple',
        icon: "https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png"
    },
    {
        id: 2,
        name: "Samsung",
        icon: "https://www.freepnglogos.com/uploads/black-samsung-logo-png-21.png"
    },
    {
        id: 3,
        name: "Infinix",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Infinix_logo.svg/2560px-Infinix_logo.svg.png"
    },
    {
        id: 4,
        name: "Tecno",
        icon: "https://ww1.freelogovectors.net/wp-content/uploads/2022/03/tecno_mobile_logo_freelogovectors.net_.png?lossy=1&w=2560&ssl=1"
    },
    {
        id: 5,
        name: "Xiomi",
        icon: "https://assets.stickpng.com/images/60410c7b26ef2b00045692f8.png"
    },
    {
        id: 6,
        name: "Huawei",
        icon: "https://download.logo.wine/logo/Huawei/Huawei-Logo.wine.png"
    },
    {
        id: 7,
        name: "Others",
        icon: "/Users/softsavvy/Desktop/SoftStore/user-app/assets/images/Logo_2.png"
    },
]


const Merchants = [
    {
        "id": 1,
        "name": "El Cabo Coffe Bar Tres De Mayo",
        "deliveryFee": 305,
        "minDeliveryTime": 20,
        "maxDeliveryTime": 30,
        "rating": 4.5,
        "address": "Lenina Avenue 35, No 4, Visotky",
        categories: [3, 2],
        isFavorite: true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg",
    },
    {
        "id": 2,
        "name": "Tony Roma's - C.C. Meridiano",
        "deliveryFee": 110,
        "address": "PO Box 96439",
        "minDeliveryTime": 15,
        "maxDeliveryTime": 35,
        "rating": 4.7,
        categories: [1, 2, 3, 4],
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg",
    },
    {
        "id": 3,
        "name": "Brothers Barbecue",
        "address": "Apt 299",
        "deliveryFee": 160,
        "minDeliveryTime": 20,
        "maxDeliveryTime": 30,
        "rating": 4.3,
        categories: [1, 2],
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
    },
    {
        "id": 4,
        "name": "Hamburguesa Nostra La Salle",
        "address": "19th Floor",
        "deliveryFee": 150,
        "minDeliveryTime": 30,
        "maxDeliveryTime": 40,
        "rating": 4.5,
        categories: [2, 5],
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg",
    }
]

const Stories = [
    {
        "id": 1,
        "merchantID": 1,
        "name": "Apple Phones",
        "description": "Introducing our exciting new menu with delicious dishes!",
        "startDate": "2023-07-10",
        "endDate": "2023-07-15",
        "isActive": true,
        "image": "https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1aaffcd4e02f0829/6319d667e3c321572216ba47/Carousel_iPhone14ProMax_Purple_Placement05-PreOrder.png?imageManager=true&impolicy=resize&width=392"
    },
    {
        "id": 2,
        "merchantID": 4,
        "name": "Discounted products",
        "description": "Try our exclusive Chef's Special dish crafted with care.",
        "startDate": "2023-07-05",
        "endDate": "2023-07-20",
        "isActive": true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg"
    },
    {
        "id": 3,
        "merchantID": 3,
        "name": "Limited-Time Offer",
        "description": "Don't miss out on our limited-time offer with exciting discounts!",
        "startDate": "2023-07-01",
        "endDate": "2023-07-31",
        "isActive": true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg"
    },
    {
        "id": 4,
        "merchantID": 2,
        "name": "Celebration Catering",
        "description": "Let us cater your special celebrations with our delectable dishes.",
        "startDate": "2023-07-08",
        "endDate": "2023-07-15",
        "isActive": true,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant2.jpeg"
    },
    {
        "id": 5,
        "merchantID": 1,
        "name": "Discounted items",
        "description": "Join us during happy hour for exclusive discounts on drinks and snacks.",
        "startDate": "2023-07-12",
        "endDate": "2023-07-18",
        "isActive": true,
        "image": "https://store77.net/upload/w247/imageCache/42a/ede/3be113cdc6f812ac7476477f448a5b63.png"
    }
]

const SmallAdverts = [
    {
        "id": "1",
        "image": "https://images.fonearena.com/blog/wp-content/uploads/2022/06/Nothing-Phone-1-invite-only.jpg",
    },
    {
        "id": "2",
        "image": "https://i.gadgets360cdn.com/large/galaxy_a54_a34_samsung_1678954854541.jpg",
    },
    {
        id: "3",
        "image": "https://ee.co.uk/content/dam/everything-everywhere/images/samsung/galaxy-s23-series-images/build-s23-img_01.jpg",
    },
    {
        id: "4",
        "image": "https://www.reliancedigital.in/medias/Apple-MacBook-Laptop-41?context=bWFzdGVyfGltYWdlc3w4ODg3NnxpbWFnZS9qcGVnfGltYWdlcy9oM2UvaDYwLzk4NTAxMzk0MTA0NjIuanBnfDkzNzFiZmQ3NTAzYTYxMjQ4ODc2YjMyOTFlNjY5M2E5N2ZjZDg1NGZmZWRiYjk0Y2ZkYTJhNTk5YzI4N2Q3ODE"
    },
    {
        id: "5",
        "image": "https://s3b.cashify.in/gpro/uploads/2022/08/19180505/iPhone-14-Pro-Everything-You-Need-To-Know.jpg"
    },
    {
        id: "6",
        "image": "https://www.sunmobile.com.hk/TDWorld/r/cms/apple_airpods_pro2_eng/img/iphone_airPods_pro2_eng.jpg",
    },
    {
        "id": "7",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY7e8GLznLXLtu6jt0sHzK9T7lr9nD-Rjtag&usqp=CAU",
    }
]

const BigAdverts = [
    {
        id: 1,
        "image": "https://static.itechnics.ge/uploads/editor/273a1f7abc3e716e2a8456de6b90eb856c4ef09b540de7cf9dbfb69e4ca88a27.png"
    },
    {
        id: 2,
        "image": "https://www.fono.lk/wp-content/uploads/2022/11/Tab-A8-spec-1.png"
    }
]

const Items = [
    {
        "id": "1",
        "name": "Cheese Tequeños",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 690,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg",
        categories: [1, 2],
        isFavorite: true,
        "rating": 3.5,
    },
    {
        "id": "2",
        "name": "Hamburger La Super Cabo Burger",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 1010,
        categories: [1, 3],
        isFavorite: false,
        "rating": 4.5,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
    },
    {
        id: "3",
        categories: [6],
        isFavorite: false,
        "rating": 4.5,
        "name": "U.S.A. Burger",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 430,
        "image": "https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG.png",
    },
    {
        id: "4",
        categories: [3, 5],
        isFavorite: true,
        "name": "Slices of Llanero Cheese",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 500,
        "rating": 2.5,
    },
    {
        id: "5",
        categories: [2, 3, 6],
        isFavorite: false,
        "name": "Papas Locas El Cabo",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 750,
        "rating": 3.8,
    },
    {
        "id": "6",
        "name": "Cheese Tequeños",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 690,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg",
        categories: [1, 2],
        isFavorite: true,
        "rating": 3.5,
    },
    {
        "id": "7",
        "name": "Hamburger La Super Cabo Burger",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 1010,
        categories: [1, 3],
        isFavorite: false,
        "rating": 4.5,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
    },
    {
        id: "8",
        categories: [6],
        isFavorite: false,
        "rating": 4.5,
        "name": "U.S.A. Burger",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 430,
        "image": "https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG.png",
    },
    {
        id: "9",
        categories: [3, 5],
        isFavorite: true,
        "name": "Slices of Llanero Cheese",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 500,
        "rating": 2.5,
    },
    {
        id: "10",
        categories: [2, 3, 6],
        isFavorite: false,
        "name": "Papas Locas El Cabo",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 750,
        "rating": 3.8,
    },
    {
        "id": "11",
        "name": "Cheese Tequeños",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 690,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg",
        categories: [1, 2],
        isFavorite: true,
        "rating": 3.5,
    },
    {
        "id": "12",
        "name": "Hamburger La Super Cabo Burger",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 1010,
        categories: [1, 3],
        isFavorite: false,
        "rating": 4.5,
        "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg",
    },
    {
        id: "13",
        categories: [6],
        isFavorite: false,
        "rating": 4.5,
        "name": "U.S.A. Burger",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 430,
        "image": "https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG.png",
    },
    {
        id: "14",
        categories: [3, 5],
        isFavorite: true,
        "name": "Slices of Llanero Cheese",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 500,
        "rating": 2.5,
    },
    {
        id: "15",
        categories: [2, 3, 6],
        isFavorite: false,
        "name": "Papas Locas El Cabo",
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        "price": 750,
        "rating": 3.8,
    }
]

const featuredData = [
    {
        id: '1',
        title: 'iPhone 13 Pro',
        description: 'Pro camera. Pro display. Pro performance.',
        image: 'https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1aaffcd4e02f0829/6319d667e3c321572216ba47/Carousel_iPhone14ProMax_Purple_Placement05-PreOrder.png?imageManager=true&impolicy=resize&width=392',
        price: '890,000',
        backgroundColor: 'black'
    },
    {
        id: '2',
        title: 'Apple Watch Series 9',
        description: 'The future of health is on your wrist.',
        image: 'https://imagineonline.store/cdn/shop/files/Apple_Watch_Series_9_Cellular_45mm_2-up_Workout_Screen__USEN_750x_ad6b225a-b417-4408-a85b-97b6abec6370_1500x.webp?v=1694616965',
        price: '150,000',
        backgroundColor: 'white'
    },
    {
        id: '3',
        title: 'iPhone 13 Pro',
        description: 'Pro camera. Pro display. Pro performance.',
        image: 'https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1aaffcd4e02f0829/6319d667e3c321572216ba47/Carousel_iPhone14ProMax_Purple_Placement05-PreOrder.png?imageManager=true&impolicy=resize&width=392',
        price: '890,000',
        backgroundColor: 'white'
    },
    {
        id: '4',
        title: 'Apple Watch Series 9',
        description: 'The future of health is on your wrist.',
        image: 'https://imagineonline.store/cdn/shop/files/Apple_Watch_Series_9_Cellular_45mm_2-up_Workout_Screen__USEN_750x_ad6b225a-b417-4408-a85b-97b6abec6370_1500x.webp?v=1694616965',
        price: '890,000',
        backgroundColor: 'black'
    },
    {
        id: '5',
        title: 'Apple Watch Series 9',
        description: 'The future of health is on your wrist.',
        image: 'https://imagineonline.store/cdn/shop/files/Apple_Watch_Series_9_Cellular_45mm_2-up_Workout_Screen__USEN_750x_ad6b225a-b417-4408-a85b-97b6abec6370_1500x.webp?v=1694616965',
        price: '150,000',
        backgroundColor: 'white'
    },
    {
        id: '6',
        title: 'iPhone 13 Pro',
        description: 'Pro camera. Pro display. Pro performance.',
        image: 'https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt1aaffcd4e02f0829/6319d667e3c321572216ba47/Carousel_iPhone14ProMax_Purple_Placement05-PreOrder.png?imageManager=true&impolicy=resize&width=392',
        price: '890,000',
        backgroundColor: 'white'
    },
    {
        id: '7',
        title: 'Apple Watch Series 9',
        description: 'The future of health is on your wrist.',
        image: 'https://imagineonline.store/cdn/shop/files/Apple_Watch_Series_9_Cellular_45mm_2-up_Workout_Screen__USEN_750x_ad6b225a-b417-4408-a85b-97b6abec6370_1500x.webp?v=1694616965',
        price: '890,000',
        backgroundColor: 'black'
    },
];

const Products = [
    {
        "id": "1",
        "name": "iPhone",
        "image": "https://assets-global.website-files.com/5ca6f1703977261264f0212e/65044ea4e7e2a2495825fdbc_Promotional-Banner-Desktop-iphone15%20(1).webp",
    },
    {
        "id": "2",
        "name": "Mac",
        "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-14-16-mac-nav-202301?wid=400&hei=260&fmt=png-alpha&.v=1670959891635",
    },
    {
        "id": "3",
        "name": "iPad",
        "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-card-40-pro-202210?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1664578794100",
    },
    {
        "id": "4",
        "name": "Apple Watch",
        "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-watch-nav-202309?wid=400&hei=260&fmt=png-alpha&.v=1693703822208",
    },
    {
        "id": "5",
        "name": "AirPods",
        "image": "https://help.apple.com/assets/6305096F029A2032C16D3326/63050972029A2032C16D332F/nl_NL/b9f519195f84950573eea5088a49b964.png",
    },
    {
        "id": "6",
        "name": "Accessories",
        "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-accessories-nav-202309?wid=400&hei=260&fmt=png-alpha&.v=1692803114952",
    },
]


export default {
    OnboardingData,
    Categories,
    Merchants,
    Offers,
    Stories,
    SmallAdverts,
    BigAdverts,
    Items,
    Brands,
    featuredData,
    Products
}