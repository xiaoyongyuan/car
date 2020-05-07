import React,{Component} from "react";
import { Layout,Menu} from 'antd';
import "./headerLayout.css";
import { PoweroffOutlined } from '@ant-design/icons';
import {Switch,Link,Route,Redirect} from "react-router-dom";
import UpLoadFiled from "../upLoadFiled/UpLoadFiled";
import History from "../history/History";
const { Header,Content} = Layout;
class HeaderLayOut extends Component{
    render() {
        return(
            <div className="uploadFiles">
                <Header className="header">
                    <div className="title">车辆智能检测分析平台</div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['/index/upload']}
                        selectedKeys={[this.props.history.location.pathname]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="/index/upload"><Link to="/index/upload">上传图片</Link></Menu.Item>
                        <Menu.Item key="/index/history"><Link to="/index/history">历史记录</Link></Menu.Item>
                        <PoweroffOutlined onClick={()=>{this.props.history.push('/')}} style={{color:"#fff",fontSize:"18px",marginLeft:"30px"}} />
                    </Menu>
                </Header>
                <Content>
                    <Switch>
                        <Route path="/index/upload" component={UpLoadFiled} />
                        <Route path="/index/history" component={History} />
                        <Redirect to="/index/upload" />
                    </Switch>
                </Content>

            </div>
        )
    }
}
export default HeaderLayOut;