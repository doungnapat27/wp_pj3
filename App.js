import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import AccountEdit from "./pages/AccountEdit";
import AccountAdd from "./pages/AccountAdd";
import Account from "./pages/Account";
import AccountView from "./pages/AccountView";
import Address from "./pages/Address";
import AddressAdd from "./pages/AddressAdd";
import AddressEdit from "./pages/AddressEdit";
import AccountEditAdmin from "./pages/AccountEditAdmin";
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import ProductManage from "./pages/ProductManage";
import './App.css';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accountEdit" element={<AccountEdit />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/address" element={<Address />} />
        <Route path="/addressAdd" element={<AddressAdd />} />
        <Route path="/addressEdit/:aid" element={<AddressEdit />} />
        <Route path="/product/:pid" element={<Product />} />
        <Route path="/productAdmin" element={<ProductManage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/accountAdd" element={<AccountAdd />} />
        <Route path="/account/:uid" element={<AccountView />} />
        <Route path="/accountEditAdmin/:uid" element={<AccountEditAdmin />} />
        
      </Routes>
    </BrowserRouter >
    
  );
}

export default App;
