import { Tabs } from 'antd';
import './App.css'; // Import your custom CSS file
import Navbar from './component/navbar';
import Food from './component/food';
import Transaction from './component/transaction';
import Footer from './component/footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <style>
        {`
          .ant-tabs-nav::before {
            display: none !important;
          }
          
          .custom-tabs .ant-tabs-nav-wrap {
            margin-left: 20px;
          }
        `}
      </style>

      <Tabs
        className=""
        defaultActiveKey="1"
        items={[
          {
            label: 'FOOD',
            key: '1',
            children:<Food/>,
          },
          {
            label: 'TRANSACTION',
            key: '2',
            children:<Transaction/>,
          },
        ]}
      />
      <Footer/>
    </div>
  );
}

export default App;