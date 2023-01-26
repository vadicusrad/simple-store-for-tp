import styles from './App.module.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductList from './components/mainPage/productList/ProductList';
import ProductPage from './components/productPage/ProductPage';
import PageNotFound from './components/pageNotFound/PageNotFound';
import MainPage from './components/mainPage/MainPage';

function App() {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <MainPage />
                    </Route>
                    <Route path='/product-page/:id'>
                        <ProductPage />
                    </Route>
                    <Route path='*'>
                        <PageNotFound />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
