import React,{Component} from "react";
import "./home.css";
import { ArrowLeftOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
class Home extends Component{
    render() {
        return(
            <div className="home">
                <Link to="/index" className="entrance"><ArrowLeftOutlined />进入系统</Link>
            </div>
        )
    }
}
export default Home;