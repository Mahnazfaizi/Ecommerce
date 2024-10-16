import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../screens/Home';
import Login from '../screens/Login';
import ForgotPass from '../screens/ForgotPass';
import Signup from '../screens/Signup';
import AdminPanel from '../screens/AdminPanel';
import AllUsers from '../screens/AllUsers';
import Products from '../screens/Products';
import CategoryProduct from '../screens/CategoryProduct';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import SearchedProduct from '../screens/SearchedProduct';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgotPass',
                element: <ForgotPass />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path:'/specific-category',
                element: <CategoryProduct />
            },
            {
                path: '/productDetail/:id',
                element: <ProductDetail />
            },
            {
                path: '/userCart',
                element: <Cart />
            },
            {
                path: '/search',
                element: <SearchedProduct />
            },
            {
                path: '/admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'allUsers',
                        element: <AllUsers />
                    },
                    {
                        path: 'products',
                        element: <Products />
                    }
                ]
            },
            
        ]
    }
]);

export default router;