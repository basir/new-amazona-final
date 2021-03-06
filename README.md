# Amazona ECommerce Website

![amazona](/template/images/amazona.jpg)

# React & Node Tutorial - Full ECommerce in 9 Hours [2021]

Welcome to my React and Node tutorial to build a fully-functional e-commerce website exactly like amazon. Open your code editor and follow me for the next hours to build an e-commerce website using MERN stack (MongoDB, ExpressJS, React and Node.JS).

## Demo Website

- 👉 Heroku : [https://react-amazona.herokuapp.com](https://react-amazona.herokuapp.com)
- 👉 Heroku Mirror: [https://react-amazona-mirror.herokuapp.com](https://react-amazona-mirror.herokuapp.com)

## You Will Learn

- HTML5 and CSS3: Semantic Elements, CSS Grid, Flexbox
- React: Components, Props, Events, Hooks, Router, Axios
- Context API: Store, Reducers, Actions
- Redux: Store, Reducers, Actions
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: ESLint, Babel, Git, Github,
- Deployment: Heroku
- Watch React & Node Tutorial

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:basir/amazona.git
$ cd amazona
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URI=mongodb://localhost/amazona
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URI=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users/seed
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products/seed
- It creates 6 sample products

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

## Support

- Q/A: https://webacademy.pro/amazona
- Contact Instructor: [Basir](mailto:basir.jafarzadeh@gmail.com)

## Introduction

# Introduction

Here I'm going to have an introduction to this course.
We are going to build a fully-functional ecommerce website using MERN Stack.

This course is for beginners and advanced developers.

## if you are new to web development the first 40 lessons of this course are for you.

by the end of these lessons you will build following features:

- Professional and responsive website layout using react bootstrap
- Display Slideshow of sellers on and list featured product in home screen
- Show product details including image, descriptions and price
- Product Category in sidebar
- Review Products and Show Ratings
- Implement add to cart functionality and dispaly shopping cart
- Manage users by creating sign up and sign in screen
- Checkout wizard to get shipping info, payment method and preview order
- Manage user profile and show order history of users

## By the end of beginner part you are junior developer will learn:

- Reactjs to create a fully functional website using create-react-app
- React Bootstrap to design website based on the best practice in UI/UX design
- React hooks like state hook and reducer hook to manage state in components
- React Context to manage state of application is a predictable way
- Nodejs and express to build a backend api
- MongoDB and Mongoose to save and retrieve data in the database
- JSonWebToken to authenticate users
- Paypal checkout button to make payment for the orders
- Heroku service to deploy website on the cloud

## So, you are junior developer will build a fully functional

ecommerce website like amazona and you can put it on your portfolio website
or present it as a side project for you next job interview and hopefully get
your dream job.

## if you are a senior developer or want to be a senior react and nextjs developer the last 30 lessons satisfy your needs.

- we implement real world features like sales stats and charts on admin dashboard
- Manage products to create, update, delete and paginate products
- Upload images of products and avatar of users on local and cloudinary server
- Manage orders to list, delete and handle orders as delivered or canceled.
- Manage users to list, grant and deny admin permissions to the users and customers
- Email order invoice to the user and Export order invoice as PDF file
- Implement forget and reset password
-

## What you will learn as advanced developers:

- working google map to show user location on the map to get customer address
- advanced mongodb function like aggration to calculate summary data for admin dashboard
- configuring mailgun email service to send emails to customers
- display professional charts using google chart
- upload you files on cloudinary server

## at the end of this course

you will build a professional ecommerce website using MERN stack.

## Lessons

1. Introduction to this course
   1. what you will build
   2. what you will learn
   3. who are audiences
2. Install Tools
   1. Code Editor
   2. Web Browser
   3. VS Code Extension
3. Website Template
   1. Create amazona folder
   2. create template folder
   3. create index.html
   4. add default HTML code
   5. link to style.css
   6. create header, main and footer
   7. style elements
4. Display Products
   1. create products div
   2. add product attributes
   3. add link, image, name and price
5. Create React App
   1. npx create-react-app frontend
   2. npm start
   3. Remove unused files
   4. copy index.html content to App.js
   5. copy style.css content to index.css
   6. replace class with className
6. Share Code On Github
   1. Initialize git repository
   2. Commit changes
   3. Create github account
   4. Create repo on github
   5. connect local repo to github repo
   6. push changes to github
7. Create Rating and Product Component
   1. create components/Rating.js
   2. create div.rating
   3. style div.rating, span and last span
   4. Create Product component
   5. Use Rating component
8. Build Product Screen
   1. Install react-router-dom
   2. Use BrowserRouter and Route for Home Screen
   3. Create HomeScreen.js
   4. Add product list code there
   5. Create ProductScreen.js
   6. Add new Route from product details to App.js
   7. Create 3 columns for product image, info and action
9. Create Node.JS Server
   1. run npm init in root folder
   2. Update package.json set type: module
   3. Add .js to imports
   4. npm install express
   5. create server.js
   6. add start command as node backend/server.js
   7. require express
   8. create route for / return backend is ready.
   9. move products.js from frontend to backend
   10. create route for /api/products
   11. return products
   12. run npm start
10. Load Products From Backend
    1. edit HomeScreen.js
    2. define products, loading and error.
    3. create useEffect
    4. define async fetchData and call it
    5. install axios
    6. get data from /api/products
    7. show them in the list
    8. create Loading Component
    9. create Message Box Component
    10. use them in HomeScreen
11. Install ESlint For Code Linting
    1. install VSCode eslint extension
    2. npm install -D eslint
    3. run ./node_modules/.bin/eslint --init
    4. Create ./frontend/.env
    5. Add SKIP_PREFLIGHT_CHECK=true
12. Add Context API to Home Screen 2. Create store.js 3. initState= {products:[]} 4. reducer = (state, action) => switch LOAD_PRODUCTS: {products: action.payload} 5. export default createStore(reducer, initState) 6. Edit HomeScreen.js 7. get shopName 8. useEffect(()=>dispatch({type: LOAD_PRODUCTS, payload: data}) 9. Add store to index.js
13. Add Conext API to Product Screen
    1. create product details constants, actions and reducers
    2. add reducer to store.js
    3.
14. Handle Add To Cart Button
    1. Handle Add To Cart in ProductScreen.js
    2. create CartScreen.js
15. Implement Add to Cart Action
    1. create addToCart constants, actions and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
    4. render cartItems.length
16. Build Cart Screen
    1. create 2 columns for cart items and cart action
    2. cartItems.length === 0 ? cart is empty
    3. show item image, name, quantity and price
    4. Proceed to Checkout button
    5. Implement remove from cart action
17. Implement Remove From Cart Action
    1. create removeFromCart constants, actions and reducers
    2. add reducer to store.js
    3. use action in CartScreen.js
18. Create Sample Users In MongoDB
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URI
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create userRoute
    9. Seed sample data
19. Create Sample Products In MongoDB
    1. create models/productModel.js
    2. create productSchema and productModel
    3. create productRoute
    4. Seed sample data
20. Create Sign-in Backend
    1. create /signin api
    2. check email and password
    3. generate token
    4. install json web token
    5. install dotenv
    6. return token and data
    7. test it using postman
21. Design SignIn Screen
    1. create SigninScreen
    2. render email and password fields
    3. create signin constants, actions and reducers
    4. Update Header based on user login
22. Implement SignIn Action
    1. create signin constants, actions and reducers
    2. add reducer to store.js
    3. use action in SigninScreen.js
23. Create Signup Screen
    1. create API for /api/users/signup
    2. insert new user to database
    3. return user info and token
    4. create SignupScreen
    5. Add fields
    6. Style fields
    7. Add screen to App.js
    8. create signup action and reducer
    9. check validation and create user
24. Create Shipping Screen
    1. create CheckoutSteps.js component
    2. create shipping fields
    3. implement shipping constant, actions and reducers
25. Create Payment Screen
    1. create payment fields
    2. implement shipping constant, actions and reducers
26. Design Place Order Screen
    1. design order summary fields
    2. design order action
27. Create Place Order API
    1. createOrder api
    2. create orderModel
    3. create orderRouter
    4. create post order route
28. Implement PlaceOrder Action
    1. handle place order button click
    2. create place order constants, action and reducer
29. Create Order Screen
    1. build order api for /api/orders/:id
    2. create OrderScreen.js
    3. dispatch order details action in useEffect
    4. load data with reducer
    5. show data like place order screen
    6. create order details constant, action and reducer
30. Add PayPal Button
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
31. Implement Order Payment
    1. update order after payment
    2. create payOrder in api.js
    3. create route for /:id/pay in orderRouter.js
    4. rerender after pay order
32. Display Orders History
    1. create customer orders api
    2. create api for getMyOrders
    3. show orders in profile screen
    4. style orders
33. Display User Profile
    1. create user details api
    2. show user information
34. Update User Profile
    1. create user update api
    2. update user info
35. Create Admin View
    1. Create Admin Menu
    2. Create Admin Middleware in Backend
    3. Create Admin Route in Frontend
36. List Products
    1. Create Product List Screen
    2. Add reducer to store
    3. show products on the screen
37. Create Product
    1. build create product api
    2. build Create Product button
    3. define product create constant, action and reducer
    4. use action in Product List Screen
38. Build Product Edit Screen
    1. create edit screen
    2. define state
    3. create fields
    4. load product details
    5. add to routes
39. Update Product
    1. define update api
    2. define product update constant, action and reducer
    3. use action in Product Edit Screen
40. Upload Product Image
    1. npm install multer
    2. define upload router
    3. create uploads folder
    4. Handle frontend
41. Delete Product
    1. create delete api in backend
    2. create delete constants, action and reducer
    3. use it in product list screen
42. List Orders
    1. create order list api
    2. create Order List Screen
    3. Add reducer to store
    4. show products on the screen
43. Delete Order 2. create delete order action and reducer 3. add order delete action to order list
44. Deliver Order
    1. create constant, actions and reducers for deliver order
    2. add order deliver action to order details screen
45. Publish To Heroku
    1. Create git repository
    2. Create heroku account
    3. install Heroku CLI
    4. heroku login
    5. heroku apps:create <yourname>amazona
    6. Edit package.json for build script
    7. Create Procfile
    8. Create mongodb atlas database
    9. Set database connection in heroku env variables
    10. Commit and push
46. List Users
    1. build api for list users
    2. Create UserList Screen
    3. create order details constant, action and reducer
47. Delete Users
    1. build api for delete users
    2. create order details constant, action and reducer
    3. Use action in UserListScreen
48. Edit User
    1. build api for update users
    2. create edit screen UI
49. Implement Seller View
    1. add seller menu
    2. create seller route
    3. list products for seller
    4. list orders for seller
    5. add Seller to Product List and Details Screen
50. Create Seller Page
    1. create seller page
    2. update product component and product screen
    3. update product routes
51. Add Top Seller Carousel
    1. install react carousel
    2. implement actions and reducers for top sellers
    3. use react carousel with data in Home Screen
52. Force Order Items From One Seller
    1. update addToCart action to buy from one seller at an order
53. Create Search Box and Search Screen
    1. create search bar in Header.js
    2. add style
    3. handle submit form
    4. edit parse url to get query string
    5. update product list api for search by name
54. Add Advanced Search Filter
55. filter by category
56. filter by price range
57. filter by average rating
58. Complete Advanced Search
59. filter by price
60. filter by rating
61. sort by price, rating, ...
62. Rate and Review Products
63. rate products
64. create actions and reducers
65. Choose Address On Google Map
66. create google map credentials
67. update .env file with Google Api Key
68. create api to send google api to frontend
69. create map screen
70. fetch google api
71. getUserLocation
72. install @react-google-maps/api
73. use it in shipping screen
74. apply map to the checkout screen
75. BugFix: Running Locally Without Issue
    1. add seller info to data.js
    2. seed product data with admin info as seller
    3. fix isSeller and isAdmin on update user
    4. remove auth from user details
76. Implement Pagination
    1. add pagination to product router in backend
    2. apply page number to actions and reducers in frontend
    3. show page numbers in search screen
77. Email order receipt by mailgun
78. create mailgun account
79. add and verify your domain to mailgun
80. install mailgun-js
81. set api key in env file
82. change pay order in orderRouter
83. send email the
84. Create Dashboard Screen
    1. Create chart data in backend
    2. Build Chart screen
85. Implement Live Chat With Customers
    1. use socket io to create backend
    2. create chat box component
    3. create support screen
86. Upgrade To React 17, Router 6, Mongoose 6

    1. Backend
    2. Uninstall and install all packages
    3. remove options in mongoose connect
    4. wrap mailgun in try catch in orderRouter
    5. Frontend
    6. Uninstall and install all packages
    7. remove <Route> in search box
    8. wrap all <Route> in <Routes>
    9. replace <Route component={Screen}> with <Route element={<Screen/>}>
    10. replace <PrivateRoute> with <Route element={<PrivateRoute><Screen /> </PrivateRoute>}/>
    11. replace <AdminRoute> and <SellerRoute> too
    12. Update PrivateRoute, AdminRoute and SellerRoute
    13. replace push() with navigate() from useNavigate
    14. replace props.match.params.id with const params = useParams();
    15. replace props.location.search with const { search } = useLocation(); and URLSearchParams
    16. replace props.match.path with const {pathname} = useLocation();
    17. put userInfo in useEffect in ChatBox, SupportScreen

87. Create Signin Backend API
    1. create userRouter.js
    2. use it in server.js
    3. seed sample users
